import { Client } from 'boardgame.io/client';
import { SocketIO } from 'boardgame.io/multiplayer'
import { TicTacToe } from './Game';

const { protocol, hostname, port } = window.location;
const server = `${protocol}//${hostname}:${port}`;

function SplashScreen(rootElement) {
  return new Promise(resolve => {
    const createButton = playerID => {
      const button = document.createElement('button');
      button.textContent = 'Player ' + playerID;
      button.onclick = () => resolve(playerID);
      rootElement.append(button);
    };
    rootElement.innerHTML = ` <p>Play as</p>`;
    const playerIDs = ['0', '1', '2', '3'];
    playerIDs.forEach(createButton);
  });
}

class TicTacToeClient {
      constructor(rootElement, { playerID } = {}) {
              this.client = Client({ 
                game: TicTacToe,
                multiplayer: SocketIO({ server }),
                playerID,
                numPlayers: 4 });
              this.client.start();
              this.rootElement = rootElement;
              this.createBoard();
              this.globaldiscards = [];
              this.attachListeners();
              this.client.subscribe(state => this.update(state));
                    }


      createBoard() {
          // Create cells in rows for the Tic-Tac-Toe board.
          const hand = [];
          for (let i = 0; i < 4; i++) {
            const cards = [];
            for (let j = 0; j < 8; j++) {
              const cardid = j;
              const playerid = i
              cards.push(`<td class="card" data-cardid="${cardid}" data-playerid="${playerid}"></td>`);
            }
            hand.push(`<tr>${cards.join('')}</tr>`);
          }
          const board = []
          for (let i=0; i < 4; i++) {
            const playerid = i
            board.push(`<td class="board" data-cardid="" data-playerid="${playerid}"></td>`)
          }
          
          const bids = []
          for (let i=0; i < 4; i++) {
            const playerid = i
            bids.push(`<td class="bid" data-playerid="${playerid}"></td>`)
          }
          
          const kitty = []
          for (let i=0; i < 3; i++) {
            const kittycardid = i
            kitty.push(`<td class="kittycard" data-kittycardid="${kittycardid}"></td>`)
          }
          
         // var discards =[]
          

      // Add the HTML to our app <div>.
      // We’ll use the empty <p> to display the game winner later.
      this.rootElement.innerHTML = `
        <h3>Player ${this.client.playerID}</h3>
        <p class="dealer"></p>
        <p class="currentphase"></p>
        <p class="currentplayer"></p>
        
<form id="biddingform"> 
  <p>Please select your bid:</p>
  <div>
    <input type="radio" id="bidChoice1"
           name="bid" value="pass">
    <label for="bidChoice1">Pass</label>
    <input type="radio" id="bidChoice2"
           name="bid" value="20">
    <label for="bidChoice2">20</label>
    <input type="radio" id="bidChoice3"
           name="bid" value="25">
    <label for="bidChoice3">25</label>
    <input type="radio" id="bidChoice4"
           name="bid" value="30">
    <label for="bidChoice4">30</label>
        <input type="radio" id="bidChoice5"
           name="bid" value="hold">
    <label for="bidChoice5">Hold</label>
  </div>
  <div>
    <button type="submit">Submit</button>
  </div>
</form>
        <table>${bids.join('')}</table>
        <br>
        
                <form id="declarationform"> 
  <p>Please select the trump suit:</p>
  <div>
    <input type="radio" id="suitChoice1"
           name="suit" value="Diamonds">
    <label for="bidChoice1">Diamonds</label>
    <input type="radio" id="suitChoice2"
           name="suit" value="Hearts">
    <label for="suitChoice2">Hearts</label>
    <input type="radio" id="suitChoice3"
           name="suit" value="Spades">
    <label for="bidChoice3">Spades</label>
    <input type="radio" id="suitChoice4"
           name="suit" value="Clubs">
    <label for="bidChoice4">Clubs</label>
  </div>
  <div>
    <button type="submit">Submit</button>
  </div>
</form>
        
        <table>${kitty.join('')}</table>
        <table>${hand.join('')}</table>
        <br>
        <p class="discards"></p>
        <button type="button" id="ResetDiscardBtn">Reset Discard List</button>
        <button type="button" id="DiscardBtn">Discard</button>
        <button type="button" id="ScoreTrick">Score Trick</button>
        <button type="button" id="ScoreHand">Score Hand</button>
        <table>${board.join('')}</table>

        <p class="score"></p>
      `;
      var messagediscards = this.rootElement.querySelector('.discards');
      messagediscards.textContent = "Cards to discard:"
      }

      attachListeners() {
      // This event handler will read the cell id from a cell’s
      // `data-id` attribute and make the `clickCell` move.
      
      var handleDiscardClick = event => {
    //    const id = event.target.textContent;
        var discardlist = this.globaldiscards
        console.log(discardlist)
        this.globaldiscards = []
        const messagediscards = this.rootElement.querySelector('.discards');
        messagediscards.textContent = "Cards to discard:" + this.globaldiscards
        this.client.moves.discard(discardlist);
      };
      
      var handleResetDiscardClick = event => {
    //    const id = event.target.textContent;
        this.globaldiscards = []
        const messagediscards = this.rootElement.querySelector('.discards');
        messagediscards.textContent = "Cards to discard:" + this.globaldiscards
      };
      
      this.rootElement.querySelector("#DiscardBtn").addEventListener("click", function() {
        console.log("discard now")
        handleDiscardClick()
      });
      
      this.rootElement.querySelector("#ResetDiscardBtn").addEventListener("click", function() {
        console.log("reset discard now")
        handleResetDiscardClick()
      });
      
      
      var handleScoreTrickClick = event => {
        this.client.moves.scoreTrick()
      };
      
      this.rootElement.querySelector("#ScoreTrick").addEventListener("click", function() {
        handleScoreTrickClick()
      });
      
      var handleScoreHandClick = event => {
        this.client.moves.scoreHand()
      };
      
      this.rootElement.querySelector("#ScoreHand").addEventListener("click", function() {
        handleScoreHandClick()
      });
      
      const handleCellClick = event => {
        const id = event.target.textContent;
        
        const state = this.client.getState()
        if (state.ctx.phase === "draw") {
          console.log(id)
          this.globaldiscards.push(id)
          const messagediscards = this.rootElement.querySelector('.discards');
          messagediscards.textContent = "Cards to discard:" + this.globaldiscards
        }
        if (state.ctx.phase === "play"){
        this.client.moves.playCard(id);
        }
      };
      
      // Attach the event listener to each of the board cells.
      const cards = this.rootElement.querySelectorAll('.card');
      cards.forEach(card => {
        card.onclick = handleCellClick;
      });
      
      var biddingform = this.rootElement.querySelector('#biddingform');
      var declarationform = this.rootElement.querySelector("#declarationform");

    //  var log = document.querySelector("#log");
      
      function logSubmit(event) {
        console.log("I was triggered")
        var data = new FormData(form);
        var output = "";
  //      console.log(data)
        for (const entry of data) {
          output = output + entry[0] + "=" + entry[1] + "\r";
          output = entry[1]
          
        };
        console.log(output)
  //      this.client.moves.Bid(20)
      }
 
 //    form.addEventListener('submit', logSubmit);
  //    event.preventDefault();
      const handleSubmitClick = bidamount => {
    //    const id = event.target.textContent;
        console.log(bidamount)
        if (bidamount === "20" || bidamount === "25" || bidamount === "30") {
          bidamount = parseInt(bidamount)
        }
        this.client.moves.Bid(bidamount);
      };
      
      const handleDeclareSubmitClick = suitchoice => {
        this.client.moves.declareSuit(suitchoice);
      }; 
      
      biddingform.addEventListener("submit", function(event) {
        var data = new FormData(biddingform);
        var output = "";
        var bidamount = ""
        for (const entry of data) {
          output = output + entry[0] + "=" + entry[1][1] + "\r";
          bidamount = entry[1]
        };
      //  log.innerText = output;
      //  console.log(output)
        handleSubmitClick(bidamount)
        event.preventDefault();
      }, false);

      declarationform.addEventListener("submit", function(event) {
        var data = new FormData(declarationform);
        var output = "";
      //  var bidamount = ""
        var suitchoice = ""
        for (const entry of data) {
          output = output + entry[0] + "=" + entry[1][1] + "\r";
          suitchoice = entry[1]
        };
//  log.innerText = output;
//  console.log(suitchoice)
  handleDeclareSubmitClick(suitchoice)
  event.preventDefault();
}, false); 
      
      }
      
      

      update(state) {
        if (state === null) return;
      // Get all the board cells.
      const cards = this.rootElement.querySelectorAll('.card');
      // Update cells to display the values in game state.
      cards.forEach(card => {
        const cellId = parseInt(card.dataset.cardid);
        const playerId = parseInt(card.dataset.playerid);
      let cellValue = ""
      if (parseInt(this.client.playerID) === playerId) {
        if (cellId <= state.G.players[playerId].cards.length -1){
          cellValue = state.G.players[playerId].cards[cellId].id;
        }}
        card.textContent = cellValue !== null ? cellValue : '';
      });
      // Get the gameover message element.
      //const messageEl = this.rootElement.querySelector('.winner');
      // Update the element to show a winner if any.
      //if (state.ctx.gameover) {
      //  messageEl.textContent =
      //    state.ctx.gameover.winner !== undefined
      //      ? 'Winner: ' + state.ctx.gameover.winner
      //      : 'Draw!';
      //} else {
      //  messageEl.textContent = '';
      //}
      const boards = this.rootElement.querySelectorAll('.board');
      // Update cells to display the values in game state.
      boards.forEach(board => {
        const playerId = parseInt(board.dataset.playerid);
        const cellValue = state.G.table[playerId].id;
   //     board.textContent = playerId !== null ? playerId : '';
        
        board.textContent = cellValue !== null ? cellValue : '';
      });
      
      const bids = this.rootElement.querySelectorAll('.bid');
      // Update cells to display the values in game state.
      bids.forEach(bid => {
        const playerId = parseInt(bid.dataset.playerid);
        const cellValue = state.G.hand.bidding[playerId];
   //     board.textContent = playerId !== null ? playerId : '';
        
        bid.textContent = cellValue !== null ? cellValue : '';
      });
      
      const kittycards = this.rootElement.querySelectorAll('.kittycard');
      // Update cells to display the values in game state.
      kittycards.forEach(kittycard => {
        const kittycardid = parseInt(kittycard.dataset.kittycardid);
        var cellValue = ""
   /*     if (state.G.secret.kitty.length === 3){
          cellValue = state.G.secret.kitty[kittycardid].id;
        }*/
   //     board.textContent = playerId !== null ? playerId : '';
        
        kittycard.textContent = cellValue !== null ? cellValue : '';
      });
      
      const messageCurrentPlayer = this.rootElement.querySelector('.currentplayer');
      // Update the element to show a winner if any.
      messageCurrentPlayer.textContent = "The current player is player " + state.ctx.currentPlayer
      
      const messagecurrentscore = this.rootElement.querySelector('.score');
      messagecurrentscore.textContent = "The score is " + state.G.score[0] + " to " + state.G.score[1]
      
      const messagecurrentphase = this.rootElement.querySelector('.currentphase');
      messagecurrentphase.textContent = "The phase is " + state.ctx.phase
      
      const messagedealer = this.rootElement.querySelector('.dealer');
      messagedealer.textContent = "The dealer is player " + state.G.dealer
    }
}

//const appElement = document.getElementById('app');
//const app = new TicTacToeClient(appElement);


/*const appElement = document.getElementById('app');
const playerIDs = ['0', '1','2','3'];
const clients = playerIDs.map(playerID => {
  const rootElement = document.createElement('div');
  appElement.append(rootElement);
  return new TicTacToeClient(rootElement, { playerID });
}); */

class App {
  constructor(rootElement) {
    SplashScreen(rootElement).then(playerID => {
      this.client = new TicTacToeClient(rootElement, { playerID });
    });
  }
}

const appElement = document.getElementById('app');
const app = new App(appElement);
