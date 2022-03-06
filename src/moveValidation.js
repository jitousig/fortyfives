import {
  RESOURCES,
  MAX_HAND_SIZE,
  MIN_RARE_TRADE,
  RARE_RESOURCES,
} from "../constants";

//import {istrump} from "./Game";

export const checkPlayerHand = (hand) => {
  const goods = hand.filter((card) => card.type !== RESOURCES.camel);
  if (goods.length > MAX_HAND_SIZE) {
    return false;
  } else {
    return true;
  }
};
const result = (valid, message) => {
  if (!valid) {
    console.log("Invalid move : ", message);
  }
  return { valid: valid, message: message };
};

/**
 *  MoveValidate is an object
 *  containing a set of independent, stateless functions
 *  for validating moves.
 *  This validation aims to separate a large chunk of validation
 *  that is required to be done at both the server side and the client side
 *
 *  IDEALLY, these validation functions should not contain any secrets, so
 *  they should be written to be able to function on the Stripped PlayerView
 */
export const MoveValidate = {
  playCard: (G, ctx, id) => {
    const p = ctx.currentPlayer;
    let cards = G.players[p].cards.slice();
    let filteredhand = cards.filter((card) => card.id === id)
    if (cards.filter((card) => card.id === id).length != 1) {
      return result(false, "That isn't a card in your hand!");}

    const istrump = (card) => {
  if (card.suit === G.hand.trumpsuit || card.id === "A\u2665") {
    return true
  } else {return false}
}

    let cardToPlay = cards.filter((card) => card.id === id)[0];

    if (G.trick.cards_played > 0) {
      if (G.trick.trumpled && !istrump(cardToPlay)) {
        if (cards.filter((card) => istrump(card) && (card.ranktrump > G.trick.ranktrumpled || card.ranktrump > 3)).length >0) {
        return result(false, "Trump was lead. You need to play trump.")
      }
    }
      if (!G.trick.trumpled && !istrump(cardToPlay) && cardToPlay.suit != G.trick.suitled) {
        if (cards.filter((card) => card.suit === G.trick.suitled).length > 0)
        {return result(false, "You need to follow suit or play trump.")}
      }    }
    return result(true, "ok"); /*

    if (typeof id !== "number") {
      return result(false, "Select 1 and only 1 card for takeOne");
    }
    const p = ctx.currentPlayer;
    //Using slice to return new arrays rather than references
    let board = G.board.slice();

    let cardToTake = board.filter((card) => card.id === id)[0];
    if (!cardToTake) {
      return result(false, "Card with that ID does not exist!");
    }
    if (cardToTake.type === RESOURCES.camel) {
      return result(false, "You can't take a camel!");
    }
    let newPlayerCards = G.players[p].cards.slice();
    newPlayerCards.push(cardToTake);
    if (checkPlayerHand(newPlayerCards)) {
      return result(true, "ok");
    } else {
      return result(false, "Too many cards in your hand for doing that move!");
    }*/
  },
  Bid: (G, ctx, amount) => {
  const p = ctx.currentPlayer;
  if (![20,25,30,"pass","hold"].includes(amount)) {
    return result(false, "That is not a valid bid");
  }
  if (amount === "hold" && p != G.dealer ) {
    return result(false, "Only the dealer can hold")
  }
  if (amount != "hold" && amount <= G.hand.highest_bid_yet) {
    return result(false, "You have to bid more than the previous player")}
    return result(true, "ok")
  },

  discard: (G, ctx, cardsToDiscard) => {
  const p = ctx.currentPlayer;
  const l = cardsToDiscard.length;
  const uniq = [...new Set(cardsToDiscard)];
  let cards = G.players[p].cards.slice();

  //check cardsToDiscard only contains cards in your hand
  for (let i = 0; i < l; i++) {
    if (cards.filter((card) => card.id === cardsToDiscard[i]).length != 1) {
      return result(false, "You can only discard cards in your hand")
    }
  }

  //check cardsToDiscard doesn't have any duplicate cards
  if (uniq.length !== l) {
    return result(false, "You can only discard each card once")
  }

  //check you're discarding enough cards
  if (cards.length - l > 5) {
    return result(false, "You must discard down to five cards in hand")
  }

  return result(true, "ok")
  },

  declareSuit: (G, ctx, suit) => {
  if (['pike','pickerel','large mouth bass','small mouth bass','largemouth bass','smallmouth bass'].includes(suit)) {
    return result(false, "No fishy business, bud.")
  }
  else if (!['Hearts', 'Diamonds', 'Spades', 'Clubs'].includes(suit)) {
    return result(false, "That's not a valid suit")
  }
  else {
    return result(true, "ok")
  }
  }
  // takeOne: (G, ctx, id) => {
  //   if (typeof id !== "number") {
  //     return result(false, "Select 1 and only 1 card for takeOne");
  //   }
  //   const p = ctx.currentPlayer;
  //   //Using slice to return new arrays rather than references
  //   let board = G.board.slice();
  //
  //   let cardToTake = board.filter((card) => card.id === id)[0];
  //   if (!cardToTake) {
  //     return result(false, "Card with that ID does not exist!");
  //   }
  //   if (cardToTake.type === RESOURCES.camel) {
  //     return result(false, "You can't take a camel!");
  //   }
  //   let newPlayerCards = G.players[p].cards.slice();
  //   newPlayerCards.push(cardToTake);
  //   if (checkPlayerHand(newPlayerCards)) {
  //     return result(true, "ok");
  //   } else {
  //     return result(false, "Too many cards in your hand for doing that move!");
  //   }
  // },
  // takeMany: (G, ctx, takeIDs, replaceIDs) => {
  //   const p = ctx.currentPlayer;
  //   if (takeIDs.length !== replaceIDs.length) {
  //     return result(false, "You have to replace as many as you take!");
  //   }
  //   if (takeIDs.length <= 1) {
  //     return result(false, "You have to take atleast 2 cards with replacement");
  //   }
  //   // Cards to remove from the deck
  //   const cardsToRemove = G.board.filter(
  //     (card) => takeIDs.includes(card.id) && card.type !== RESOURCES.camel //Cannot remove camels from the deck
  //   );
  //
  //   if (cardsToRemove.length !== takeIDs.length) {
  //     return result(
  //       false,
  //       "Length mismatch(Perhaps camels were attempted to be removed from the board!)"
  //     );
  //   }
  //
  //   let newPlayerCards = G.players[p].cards.filter(
  //     (card) => !replaceIDs.includes(card.id)
  //   );
  //   newPlayerCards.push(...cardsToRemove);
  //   if (checkPlayerHand(newPlayerCards)) {
  //     return result(true, "ok");
  //   } else {
  //     return result(false, "Too many cards in your hand for doing that move!");
  //   }
  // },
  // trade: (G, ctx, tradeIDs) => {
  //   const p = ctx.currentPlayer;
  //   const cardsToTrade = G.players[p].cards.filter((card) =>
  //     tradeIDs.includes(card.id)
  //   );
  //   if (cardsToTrade.length === 0) {
  //     return result(false, "Select atleast one card to trade");
  //   }
  //   const cardType = cardsToTrade[0].type;
  //   if (!cardsToTrade.every((card) => card.type === cardType)) {
  //     return result(
  //       false,
  //       "You can only trade cards of a one resource in a turn"
  //     );
  //   }
  //   if (cardType === RESOURCES.camel) {
  //     return result(false, "You cannot trade camels!");
  //   }
  //   if (cardsToTrade.length !== tradeIDs.length) {
  //     return result(false, "All cards traded have to be of the same resource!");
  //   }
  //   if (
  //     RARE_RESOURCES.includes(cardType) &&
  //     cardsToTrade.length < MIN_RARE_TRADE
  //   ) {
  //     return result(
  //       false,
  //       "Cannot trade less than {0} cards for a rare resource!".replace(
  //         "{0}",
  //         MIN_RARE_TRADE
  //       )
  //     );
  //   }
  //   if (G.tokens[cardType].length < cardsToTrade.length) {
  //     return result(
  //       false,
  //       "Not enough tokens in the market to trade that resource!"
  //     );
  //   }
  //   return result(true, "OK");
  // },
  // takeCamels: (G, ctx) => {
  //   let camels = G.board.filter((card) => card.type === RESOURCES.camel);
  //   const numCamels = camels.length;
  //   if (numCamels === 0) {
  //     return result(false, "No camels on the board! Can't make that move");
  //   }
  //   return result(true, "OK");
  // },
};
