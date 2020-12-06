import { Client } from 'boardgame.io/client';
import { TicTacToe } from './Game';

class TicTacToeClient {
      constructor(rootElement) {
              this.client = Client({ game: TicTacToe,
numPlayers: 4 });
              this.client.start();
              this.rootElement = rootElement;
              this.createBoard();
              this.attachListeners();
              this.client.subscribe(state => this.update(state));
                    }


      createBoard() {
          // Create cells in rows for the Tic-Tac-Toe board.
          const hand = [];
          for (let i = 0; i < 4; i++) {
            const cards = [];
            for (let j = 0; j < 5; j++) {
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
            board.push(`<td class="bid" data-playerid="${playerid}"></td>`)
          }

      // Add the HTML to our app <div>.
      // We’ll use the empty <p> to display the game winner later.
      this.rootElement.innerHTML = `
<form> 
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
        <table>${hand.join('')}</table>
        <table>${board.join('')}</table>
        <p class="currentplayer"></p>
        <p class="score"></p>
      `;
      }

      attachListeners() {
      // This event handler will read the cell id from a cell’s
      // `data-id` attribute and make the `clickCell` move.
      const handleCellClick = event => {
        const id = event.target.textContent;
        console.log(id)
        this.client.moves.playCard(id);
      };
      // Attach the event listener to each of the board cells.
      const cards = this.rootElement.querySelectorAll('.card');
      cards.forEach(card => {
        card.onclick = handleCellClick;
      });
      
      var form = this.rootElement.querySelector("form");
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
        const id = event.target.textContent;
        console.log(bidamount)
        if (bidamount === "20" || bidamount === "25" || bidamount === "30") {
          bidamount = parseInt(bidamount)
        }
        this.client.moves.Bid(bidamount);
      };
      
      form.addEventListener("submit", function(event) {
  var data = new FormData(form);
  var output = "";
  var bidamount = ""
  for (const entry of data) {
    output = output + entry[0] + "=" + entry[1][1] + "\r";
    bidamount = entry[1]
  };
//  log.innerText = output;
  console.log(output)
  handleSubmitClick(bidamount)
  event.preventDefault();
}, false);
      
      }
      
      

      update(state) {
      // Get all the board cells.
      const cards = this.rootElement.querySelectorAll('.card');
      // Update cells to display the values in game state.
      cards.forEach(card => {
        const cellId = parseInt(card.dataset.cardid);
        const playerId = parseInt(card.dataset.playerid);
      let cellValue = ""
        if (cellId <= state.G.players[playerId].cards.length -1){
          cellValue = state.G.players[playerId].cards[cellId].id;
        }
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
      
      const messageCurrentPlayer = this.rootElement.querySelector('.currentplayer');
      // Update the element to show a winner if any.
      messageCurrentPlayer.textContent = "The current player is player " + state.ctx.currentPlayer
      
      const messagecurrentscore = this.rootElement.querySelector('.score');
      messagecurrentscore.textContent = "The score is " + state.G.score[0] + " to " + state.G.score[1]
    }
}

const appElement = document.getElementById('app');
const app = new TicTacToeClient(appElement);
