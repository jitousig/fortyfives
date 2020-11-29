import { Client } from 'boardgame.io/client';
import { TicTacToe } from './Game';

class TicTacToeClient {
      constructor() {
              this.client = Client({ game: TicTacToe,
numPlayers: 4 });
                  this.client.start();
                    }
}

const app = new TicTacToeClient();
