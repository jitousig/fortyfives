import {
  ACTIONS,
  NUM_RESOURCES_END,
  RESOURCES,
  LARGEST_HERD_BONUS,
} from "../constants";
import { TurnOrder } from 'boardgame.io/core';
import { GAME_NAME } from "../config.js";
import { MoveValidate } from "./moveValidation";

//Defining some Game constants here
let DECK_CONTENTS = {};
DECK_CONTENTS[RESOURCES.diamond] = 6;
DECK_CONTENTS[RESOURCES.gold] = 6;
DECK_CONTENTS[RESOURCES.silver] = 6;
DECK_CONTENTS[RESOURCES.silk] = 8;
DECK_CONTENTS[RESOURCES.spices] = 8;
DECK_CONTENTS[RESOURCES.leather] = 10;
DECK_CONTENTS[RESOURCES.camel] = 11;
DECK_CONTENTS = Object.freeze(DECK_CONTENTS);

const Error = (str) => {
  console.log("ERROR: " + str);
};

const isPass = (bid) => {
  if (bid === "pass") {
    return 1
  } else {
    return 0
  }
}

const shuffleDeck = (deck) => {
  for (var i = deck.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  return deck;
};
const getWinner = (G) => {
  let p0Score = G.players[0].trade_tokens.reduce((total, token) => {
    return total + token.value;
  }, 0);
  let p1Score = G.players[1].trade_tokens.reduce((total, token) => {
    return total + token.value;
  }, 0);
  let p0Camels = G.players[0].cards.filter(
    (card) => card.type === RESOURCES.camel
  ).length;
  let p1Camels = G.players[1].cards.filter(
    (card) => card.type === RESOURCES.camel
  ).length;

  // Give out token for most camels
  if (p0Camels > p1Camels) {
    p0Score += LARGEST_HERD_BONUS;
  } else if (p1Camels > p0Camels) {
    p1Score += LARGEST_HERD_BONUS;
  } else {
    //TODO: Deal with a tie
  }
  p0Score += G.players[0].T3 * 4;
  p0Score += G.players[0].T4 * 6;
  p0Score += G.players[0].T5 * 8;

  p1Score += G.players[1].T3 * 4;
  p1Score += G.players[1].T4 * 6;
  p1Score += G.players[1].T5 * 8;
  let winner = 0;
  if (p0Score >= p1Score) {
    winner = 0;
  } else {
    winner = 1;
  }
  return { winner: winner, scores: { 0: p0Score, 1: p1Score } };
};

function Bid(G, ctx,amount) {
  const validBid = MoveValidate.Bid(G, ctx, amount)
  if (!(validBid.valid)) {return Error(validBid.message)}
  G.hand.bidding[ctx.currentPlayer] = amount;
  if (amount != "pass") {
    G.hand.highest_bid_yet = amount;
    if (amount != "hold") {
   G.hand.highest_bid_value_yet = amount
  }
  G.hand.highest_bidder_yet = ctx.currentPlayer;}
  ctx.events.endTurn()
}

function scoreTrick(G, ctx) {
    //identify winning partnership
    if (G.trick.bestplayerthistrick === '0' || G.trick.bestplayerthistrick === '2') {
      G.trick.winningpartnership = 0;
    } else {
      G.trick.winningpartnership = 1;
    }

    G.hand.score[G.trick.winningpartnership] += 5;

    //Check if this was the last trick of the hand
    if (G.hand.score[0] + G.hand.score[1] === 25) {
      ctx.events.setPhase("handscoring")
    }

    //clear the table for next trick
    G.table = {
      0: [],
      1: [],
      2: [],
      3: []
    };

    // set nexttolead before clearing trick state
    let nexttolead = G.trick.bestplayerthistrick

    G.trick = {
      cards_played: 0,
      bestcardthistrick: [],
      bestplayerthistrick: [],
      winningpartnership: [],
      suitled: [],
      trumpled: [],
      ranktrumpled: []
    };

    //go to next trick
    G.hand.nexttoplay = nexttolead
    ctx.events.endPhase();
}

function scoreHand(G, ctx) {
     //5 points for highest trump
      if (G.hand.highest_trump_yet_player === '0' || G.hand.highest_trump_yet_player === '2') {
        G.hand.score[0] += 5
      } else {
        G.hand.score[1] += 5;
      }

      //update the game score
      //check if someone went 25 without the 5

      //score declaring partnership
      //check if the declaring partnership didn't make their bid
      if (G.hand.score[G.hand.declaringpartnership] < G.hand.highest_bid_value_yet) {
        G.score[G.hand.declaringpartnership] -= G.hand.highest_bid_value_yet
      } else {
        if (G.hand.highest_bid_value_yet === 30) {
        G.score[G.hand.declaringpartnership] += 60
        } else {
          G.score[G.hand.declaringpartnership] += G.hand.score[G.hand.declaringpartnership]
        }
      }

      //score defending partnership
      if (G.score[G.hand.defendingpartnership] < 100) {
        G.score[G.hand.defendingpartnership] += G.hand.score[G.hand.defendingpartnership]
      }
      //deal a new hand
      G.dealer = (G.dealer + 1) % ctx.numPlayers
      G.under_the_gun = (G.under_the + 1) % ctx.numPlayers
      ctx.events.endPhase()
}

function playCard(G, ctx, id) {
  const istrump = (card) => {
    if (card.suit === G.hand.trumpsuit || card.id === "AH") {
      return true
    } else {return false}
  }

  const nextCardBetter = (card1, card2) => {
    if (istrump(card1) && !(istrump(card2))) {
      return false
    } else if (!istrump(card1) && istrump(card2)) {
      return true
    } else if (istrump(card1) && istrump(card2)) {
      if (card1.ranktrump < card2.ranktrump) {
        return false
      } else { return true}
    } else if (!istrump(card1) && !istrump(card2)){
      if (card1.suit === G.trick.suitled && card2.suit != G.trick.suitled) {
        return false
      } else if (card1.suit != G.trick.suitled && card2.suit === G.trick.suitled) {
        return true
      } else if (card1.suit === G.trick.suitled && card2.suit === G.trick.suitled) {
        if (card1.ranknontrump < card2.ranknontrump) {
          return false
        } else { return true}
      }
      else if (card1.suit != G.trick.suitled && card2.suit != G.trick.suitled) {
        return "incomparable"
      }
    }
  }
  //put the card into play area
  //remove the card from your hand
  const validMove = MoveValidate.playCard(G, ctx, id);
  //  console.log(validMove.valid)
  if (!(validMove.valid)) {return Error(validMove.message)}
  /*      //return Error(validMove.message) */

  const p = ctx.currentPlayer;
  let cards = G.players[p].cards.slice();
  let cardToPlay = cards.filter((card) => card.id === id)[0];
  cards = cards.filter((card) => card.id !== cardToPlay.id);
  G.players[p].cards = cards;
  G.table[p] = cardToPlay;

  //keep track of highest trump yet
  if(istrump(cardToPlay)) {
    if(G.hand.highest_trump_yet.length === 0) {
      G.hand.highest_trump_yet = cardToPlay.ranktrump
      G.hand.highest_trump_yet_player = p
    } else {
      if (cardToPlay.ranktrump < G.hand.highest_trump_yet) {
        G.hand.highest_trump_yet = cardToPlay.ranktrump
      G.hand.highest_trump_yet_player = p
      }
    }
  }

  //keep track of suit led and rank if trump (for reneging)
  if (G.trick.cards_played === 0 ) {
    G.trick.suitled = cardToPlay.suit
    G.trick.trumpled = istrump(cardToPlay)
    if (G.trick.trumpled) {G.trick.ranktrumpled = cardToPlay.ranktrump}
  }

  G.trick.cards_played++;

  //track best card played
  if (G.trick.cards_played === 1) {
    G.trick.bestcardthistrick = cardToPlay;
    G.trick.bestplayerthistrick = p;
  } else {
  //  if ( cardToPlay.id > G.trick.bestcardthistrick.id ) {
  if (nextCardBetter(G.trick.bestcardthistrick, cardToPlay)) {
      G.trick.bestcardthistrick = cardToPlay;
    G.trick.bestplayerthistrick = p;
    }
  };

  if (G.trick.cards_played === 4) {
    ctx.events.endPhase();
  }

  //score the trick
/*  if (G.trick.cards_played === 4 ) {
    //identify winning partnership
    if (G.trick.bestplayerthistrick === '0' || G.trick.bestplayerthistrick === '2') {
      G.trick.winningpartnership = 0;
    } else {
      G.trick.winningpartnership = 1;
    }

    G.hand.score[G.trick.winningpartnership] += 5;

    //Check if this was the last trick of the hand
    if (G.hand.score[0] + G.hand.score[1] === 25) {
      //5 points for highest trump
      if (G.hand.highest_trump_yet_player === '0' || G.hand.highest_trump_yet_player === '2') {
        G.hand.score[0] += 5
      } else {
        G.hand.score[1] += 5;
      }

      //update the game score
      //check if someone went 25 without the 5

      //score declaring partnership
      //check if the declaring partnership didn't make their bid
      if (G.hand.score[G.hand.declaringpartnership] < G.hand.highest_bid_value_yet) {
        G.score[G.hand.declaringpartnership] -= G.hand.highest_bid_value_yet
      } else {
        if (G.hand.highest_bid_value_yet === 30) {
        G.score[G.hand.declaringpartnership] += 60
        } else {
          G.score[G.hand.declaringpartnership] += G.hand.score[G.hand.declaringpartnership]
        }
      }

      //score defending partnership
      if (G.score[G.hand.defendingpartnership] < 100) {
        G.score[G.hand.defendingpartnership] += G.hand.score[G.hand.defendingpartnership]
      }
      //deal a new hand
      G.dealer = (G.dealer + 1) % ctx.numPlayers
      G.under_the_gun = (G.under_the + 1) % ctx.numPlayers
      ctx.events.endPhase()
    }

    //clear the table for next trick
    G.table = {
      0: [],
      1: [],
      2: [],
      3: []
    };

    // set nexttolead before clearing trick state
    let nexttolead = G.trick.bestplayerthistrick

    G.trick = {
      cards_played: 0,
      bestcardthistrick: [],
      bestplayerthistrick: [],
      winningpartnership: [],
      suitled: [],
      trumpled: [],
      ranktrumpled: []
    };

    //go to next trick
    ctx.events.endTurn({ next: nexttolead });
  }; */

  ctx.events.endTurn();
}

function declareSuit(G, ctx, suit) {
  G.hand.trumpsuit = suit
  ctx.events.endPhase()
}

function discard(G, ctx, cardsToDiscard){
  const validDiscard = MoveValidate.discard(G, ctx, cardsToDiscard)
  if (!(validDiscard.valid)) {return Error(validDiscard.message)}
  const p = ctx.currentPlayer
  const l = cardsToDiscard.length
  let cards = G.players[p].cards.slice();
  let cardsToKeep = cards.filter((card) => !cardsToDiscard.includes(card.id));
  G.players[p].cards = cardsToKeep;
  for (let i = 0; i < l; i++) {
      G.players[p].cards.push(G.deck.pop());
    }
    ctx.events.endTurn()
}



/*const scoreTrick = () => {
G.trick.northsouthscore = 5;
// add 5 points to the winning team score
// identify winning player
// identify highest trump if played
}; */

const std_45s_deck = [
  { id: 'AH', ranktrump: 3, suit: "Hearts"},
  { id: 'KH', ranktrump: 4, ranknontrump: 1, suit: "Hearts"},
  { id: 'QH', ranktrump: 5, ranknontrump: 2, suit: "Hearts"},
  { id: 'JH', ranktrump: 2, ranknontrump: 3, suit: "Hearts"},
  { id: 'TH', ranktrump: 6, ranknontrump: 4, suit: "Hearts"},
  { id: '9H', ranktrump: 7, ranknontrump: 5, suit: "Hearts"},
  { id: '8H', ranktrump: 8, ranknontrump: 6, suit: "Hearts"},
  { id: '7H', ranktrump: 9, ranknontrump: 7, suit: "Hearts"},
  { id: '6H', ranktrump: 10, ranknontrump: 8, suit: "Hearts"},
  { id: '5H', ranktrump: 1, ranknontrump: 9, suit: "Hearts"},
  { id: '4H', ranktrump: 11, ranknontrump: 10, suit: "Hearts"},
  { id: '3H', ranktrump: 12, ranknontrump: 11, suit: "Hearts"},
  { id: '2H', ranktrump: 13, ranknontrump: 12, suit: "Hearts"},
  { id: 'AD', ranktrump: 4, ranknontrump: 13, suit: "Diamonds"},
  { id: 'KD', ranktrump: 5, ranknontrump: 1, suit: "Diamonds"},
  { id: 'QD', ranktrump: 6, ranknontrump: 2, suit: "Diamonds"},
  { id: 'JD', ranktrump: 2, ranknontrump: 3, suit: "Diamonds"},
  { id: 'TD', ranktrump: 7, ranknontrump: 4, suit: "Diamonds"},
  { id: '9D', ranktrump: 8, ranknontrump: 5, suit: "Diamonds"},
  { id: '8D', ranktrump: 9, ranknontrump: 6, suit: "Diamonds"},
  { id: '7D', ranktrump: 10, ranknontrump: 7, suit: "Diamonds"},
  { id: '6D', ranktrump: 11, ranknontrump: 8, suit: "Diamonds"},
  { id: '5D', ranktrump: 1, ranknontrump: 9, suit: "Diamonds"},
  { id: '4D', ranktrump: 12, ranknontrump: 10, suit: "Diamonds"},
  { id: '3D', ranktrump: 13, ranknontrump: 11, suit: "Diamonds"},
  { id: '2D', ranktrump: 14, ranknontrump: 12, suit: "Diamonds"},
  { id: 'AS', ranktrump: 4, ranknontrump: 4, suit: "Spades"},
  { id: 'KS', ranktrump: 5, ranknontrump: 1, suit: "Spades"},
  { id: 'QS', ranktrump: 6, ranknontrump: 2, suit: "Spades"},
  { id: 'JS', ranktrump: 2, ranknontrump: 3, suit: "Spades"},
  { id: 'TS', ranktrump: 14, ranknontrump: 13, suit: "Spades"},
  { id: '9S', ranktrump: 13, ranknontrump: 12, suit: "Spades"},
  { id: '8S', ranktrump: 12, ranknontrump: 11, suit: "Spades"},
  { id: '7S', ranktrump: 11, ranknontrump: 10, suit: "Spades"},
  { id: '6S', ranktrump: 10, ranknontrump: 9, suit: "Spades"},
  { id: '5S', ranktrump: 1, ranknontrump: 8, suit: "Spades"},
  { id: '4S', ranktrump: 9, ranknontrump: 7, suit: "Spades"},
  { id: '3S', ranktrump: 8, ranknontrump: 6, suit: "Spades"},
  { id: '2S', ranktrump: 7, ranknontrump: 5, suit: "Spades"},
  { id: 'AC', ranktrump: 4, ranknontrump: 4, suit: "Clubs"},
  { id: 'KC', ranktrump: 5, ranknontrump: 1, suit: "Clubs"},
  { id: 'QC', ranktrump: 6, ranknontrump: 2, suit: "Clubs"},
  { id: 'JC', ranktrump: 2, ranknontrump: 3, suit: "Clubs"},
  { id: 'TC', ranktrump: 14, ranknontrump: 13, suit: "Clubs"},
  { id: '9C', ranktrump: 13, ranknontrump: 12, suit: "Clubs"},
  { id: '8C', ranktrump: 12, ranknontrump: 11, suit: "Clubs"},
  { id: '7C', ranktrump: 11, ranknontrump: 10, suit: "Clubs"},
  { id: '6C', ranktrump: 10, ranknontrump: 9, suit: "Clubs"},
  { id: '5C', ranktrump: 1, ranknontrump: 8, suit: "Clubs"},
  { id: '4C', ranktrump: 9, ranknontrump: 7, suit: "Clubs"},
  { id: '3C', ranktrump: 8, ranknontrump: 6, suit: "Clubs"},
  { id: '2C', ranktrump: 7, ranknontrump: 5, suit: "Clubs"}]

/*
const compare = (card1, card2) => {
  if (istrump(card1) && !(istrump(card2))) {
    return card1
  } else if (!istrump(card1) && istrump(card2)) {
    return card2
  } else if (istrump(card1) && istrump(card2)) {
    if (card1.ranktrump < card2.ranktrump) {
      return card1
    } else { return card2}
  } else if (!istrump(card1) && !istrump(card2)){
    if (card1.suit === suitled && card2.suit != suitled) {
      return card1
    } else if (card1.suit != suitled && card2.suit === suitled) {
      return card2
    } else if (card1.suit === suitled && card2.suit === suitled) {
      if (card1.ranknontrump < card2.ranknontrump) {
        return card1
      } else { return card2}

    }
    else if (card1.suit != suitled && card2.suit != suitled) {
      return "incomparable"
    }
  }
} */

const nextCardBetter = (card1, card2) => {
  if (istrump(card1) && !(istrump(card2))) {
    return false
  } else if (!istrump(card1) && istrump(card2)) {
    return true
  } else if (istrump(card1) && istrump(card2)) {
    if (card1.ranktrump < card2.ranktrump) {
      return false
    } else { return true}
  } else if (!istrump(card1) && !istrump(card2)){
    if (card1.suit === G.trick.suitled && card2.suit != G.trick.suitled) {
      return false
    } else if (card1.suit != G.trick.suitled && card2.suit === G.trick.suitled) {
      return true
    } else if (card1.suit === G.trick.suitled && card2.suit === G.trick.suitled) {
      if (card1.ranknontrump < card2.ranknontrump) {
        return false
      } else { return true}

    }
    else if (card1.suit != G.trick.suitled && card2.suit != G.trick.suitled) {
      return "incomparable"
    }
  }}


export const TicTacToe = {
  name: GAME_NAME,
  setup: () => {
    const deck = std_45s_deck;
    var start = {
      score: {
            0: 0, //players 0 and 2
            1: 0 //players 1 and 3
          },
      dealer: 0,
      under_the_gun: 1, //player to the left of the dealer
      board: [],
      chat: [],
      tokens: {},
      players: {
        0: { cards: [] },
        1: { cards: [] },
        2: { cards: [] },
        3: { cards: [] }
      },
      deck: deck,
      table: {
          0: [],
          1: [],
          2: [],
          3: []
      },
      trick: {
          cards_played: 0,
          bestcardthistrick: [],
          bestplayerthistrick: [],
          winningpartnership: [],
          suitled: [],
          trumpled: [],
          ranktrumpled: []
          },
      hand: {
        nexttoplay: 0,
        kitty: [],
        bidding: {
        0: [],
        1: [],
        2: [],
        3: []
      },
        declarer: "0",
        declaringpartnership: [],
        defendingpartnership: [],
        score: {
            0: 0, //northsouth
            1: 0 //eastwest
          },
          highest_bid_yet: [],
          highest_bid_value_yet: [],
          highest_bidder_yet: [],
          trumpsuit: [],
          highest_trump_yet: [],
          highest_trump_yet_player: []
      }

    };

    start.deck = shuffleDeck(std_45s_deck)
    // Deal 5 cards in alternating order to each player
    for (let i = 0; i < 5; i++) {
      start.players[0].cards.push(start.deck.pop());
      start.players[1].cards.push(start.deck.pop());
      start.players[2].cards.push(start.deck.pop());
      start.players[3].cards.push(start.deck.pop());
    }
    for (let i = 0; i < 3; i++) {
      start.hand.kitty.push(start.deck.pop());
    }
    // Adding deckSize so that the Deck can be stripped in the future
    // deckSize will get updated after turn onEnd
  //  start.deckSize = start.deck.length;
    return start;
  },
  //playerView: PlayerView.STRIP_SECRETS,
  phases: {
    bid: {
      moves: { Bid },
      endIf: G => (
        isPass(G.hand.bidding[0]) +
        isPass(G.hand.bidding[1]) +
        isPass(G.hand.bidding[2]) +
        isPass(G.hand.bidding[3]) === 3),
      start: true,
      next: 'declare',
      turn: {
        order: {
          // Get the initial value of playOrderPos.
          // This is called at the beginning of the phase.
          first: (G, ctx) => G.under_the_gun,

          // Get the next value of playOrderPos.
          // This is called at the end of each turn.
          // The phase ends if this returns undefined.
          next: (G, ctx) => {
            for (var i = 1; i < 4 ; i++) {
              let p = (ctx.playOrderPos + i) % ctx.numPlayers
              if (G.hand.bidding[p] != "pass") {
                return (ctx.playOrderPos + i) % ctx.numPlayers
              }
            }
          }
        }
      },
      onEnd: (G, ctx) => {
        G.hand.declarer = G.hand.highest_bidder_yet
        G.hand.nexttoplay = (parseInt(G.hand.declarer) + 1) % ctx.numPlayers
        //determine declaring partnership
        if (G.hand.declarer === '0' || G.hand.declarer == '2') {
          G.hand.declaringpartnership = 0
          G.hand.defendingpartnership = 1
        } else{
          G.hand.declaringpartnership = 1
          G.hand.defendingpartnership = 0
        }
      }
    },
    declare:{
   //   onBegin: (G, ctx) =>{ctx.playOrderPos = G.under_the_gun},
      moves: { declareSuit },
      next: 'draw',
      turn: {
        order: {
          // Get the initial value of playOrderPos.
          // This is called at the beginning of the phase.
          first: (G, ctx) => parseInt(G.hand.declarer),
          // Get the next value of playOrderPos.
          // This is called at the end of each turn.
          // The phase ends if this returns undefined.
         // next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers,
        }
      },
      onEnd: (G, ctx) => {
        for (let i = 0; i < 3; i++) {
          G.players[G.hand.declarer].cards.push(G.hand.kitty.pop())
        }
      }
    },
    draw: {
      // onBegin: (G, ctx) =>{ctx.playOrderPos = G.under_the_gun},
      moves: { discard },
      next: 'play',
       /* turn: {
          order: {
      // Get the initial value of playOrderPos.
      // This is called at the beginning of the phase.
      first: (G, ctx) => G.under_the_gun,

      // Get the next value of playOrderPos.
      // This is called at the end of each turn.
      // The phase ends if this returns undefined.
      next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers

      }
        } */
      turn: {
        order: {
        first: (G, ctx) => G.under_the_gun,
        next: (G, ctx) => {
          if ((ctx.playOrderPos + 1) % ctx.numPlayers != G.under_the_gun)
          {return (ctx.playOrderPos + 1) % ctx.numPlayers} else {
            ctx.events.endPhase()
          }}
        }
      }
    },
    play: {
      //start: true,
      moves: { playCard },
      next: 'trickscoring',
      turn: {
        order: {
        // Get the initial value of playOrderPos.
        // This is called at the beginning of the phase.
   //     first: (G, ctx) => (parseInt(G.hand.declarer) + 1) % ctx.numPlayers,
        first: (G, ctx) => parseInt(G.hand.nexttoplay),

        // Get the next value of playOrderPos.
        // This is called at the end of each turn.
        // The phase ends if this returns undefined.
        next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers,
        // OPTIONAL:
        // Override the initial value of playOrder.
        // This is called at the beginning of the game / phase.
        // playOrder: (G, ctx) => [...],
        }
      }
    },
    trickscoring: {
      // onBegin: (G, ctx) =>{ctx.playOrderPos = G.under_the_gun},
      moves: { scoreTrick },
      next: 'play',
       /* turn: {
          order: {
      // Get the initial value of playOrderPos.
      // This is called at the beginning of the phase.
      first: (G, ctx) => G.under_the_gun,

      // Get the next value of playOrderPos.
      // This is called at the end of each turn.
      // The phase ends if this returns undefined.
      next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers

      }
        } */
      turn: {
        order: {
        first: (G, ctx) => parseInt(G.trick.bestplayerthistrick),
        next: (G, ctx) => {
          if ((ctx.playOrderPos + 1) % ctx.numPlayers != G.under_the_gun)
          {return (ctx.playOrderPos + 1) % ctx.numPlayers} else {
            ctx.events.endPhase()
          }}
        }
      }
    },
    handscoring: {
      // onBegin: (G, ctx) =>{ctx.playOrderPos = G.under_the_gun},
      moves: { scoreHand },
      next: 'bid',
       /* turn: {
          order: {
      // Get the initial value of playOrderPos.
      // This is called at the beginning of the phase.
      first: (G, ctx) => G.under_the_gun,

      // Get the next value of playOrderPos.
      // This is called at the end of each turn.
      // The phase ends if this returns undefined.
      next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers

      }
        } */
      turn: {
        order: {
        first: (G, ctx) => parseInt(G.dealer),
        next: (G, ctx) => {
          if ((ctx.playOrderPos + 1) % ctx.numPlayers != G.under_the_gun)
          {return (ctx.playOrderPos + 1) % ctx.numPlayers} else {
            ctx.events.endPhase()
          }}
        }
      }
    },
  },
/*  turn: {
    onEnd: (G, ctx) => {
      //Update states here like deck size
  //    G.deckSize = G.deck.length;
    },
  },*/
  endIf: (G, ctx) => {
    if (G.score[0] > 120 || G.score[1] > 120){
      if (G.score[0] > G.score[1]) {
        return 0
      } else {
        return 1
      }
    }
    // Victory Condition here
/*    if (G.deck.length <= 0) {
      console.log("Ending game since we are out of cards!");
      return getWinner(G);
    } */
    /*
    const numResourcesLeft = Object.values(G.tokens).filter((res) => {
      return res.length > 0;
    }).length;
    console.log(numResourcesLeft, " resources left");
    if (numResourcesLeft <= NUM_RESOURCES_END) {
      console.log(
        "Ending game since we have reached the minimum number of trading token stacks!"
      );
      return getWinner(G);
    } */
  },
  onEnd: (G, ctx) => G,
};
