import { Game } from '../types';
import { State, Ctx } from '../types';
/**
 * Creates the initial game state.
 */
export declare function InitializeGame({ game, numPlayers, setupData, }: {
    game: Game;
    numPlayers?: number;
    setupData?: any;
}): State<any, Ctx>;
