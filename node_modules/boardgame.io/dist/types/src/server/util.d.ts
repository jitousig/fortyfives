import { Server, Game } from '../types';
/**
 * Creates a new match metadata object.
 */
export declare const createMetadata: ({ game, unlisted, setupData, numPlayers, }: {
    game: Game<any, import("../types").Ctx, any>;
    numPlayers: number;
    setupData?: any;
    unlisted?: boolean;
}) => Server.MatchData;
