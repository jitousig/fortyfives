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

      // Add the HTML to our app <div>.
      // We’ll use the empty <p> to display the game winner later.
      this.rootElement.innerHTML = `
        <table>${hand.join('')}</table>
        <table>${board.join('')}</table}
        <p class="winner"> hello </p>
      `;
      }

      attachListeners() {
      // This event handler will read the cell id from a cell’s
      // `data-id` attribute and make the `clickCell` move.
      const handleCellClick = event => {
        const id = parseInt(event.target.dataset.id);
        this.client.moves.clickCell(id);
      };
      // Attach the event listener to each of the board cells.
      const cards = this.rootElement.querySelectorAll('.card');
      cards.forEach(card => {
        card.onclick = handleCellClick;
      });
      }

      update(state) {
      // Get all the board cells.
      const cards = this.rootElement.querySelectorAll('.card');
      // Update cells to display the values in game state.
      cards.forEach(card => {
        const cellId = parseInt(card.dataset.cardid);
        const playerId = parseInt(card.dataset.playerid);
        console.log(state.G.players[playerId].cards.length)
      //  console.log(cellId)
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
        console.log(playerId)
        const cellValue = state.G.table[playerId].id;
        console.log(cellValue)
   //     board.textContent = playerId !== null ? playerId : '';
        
        board.textContent = cellValue !== null ? cellValue : '';
      });
    }
}

const appElement = document.getElementById('app');
const app = new TicTacToeClient(appElement);
