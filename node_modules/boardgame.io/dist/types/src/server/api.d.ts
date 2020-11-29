import Koa from 'koa';
import Router from 'koa-router';
import * as StorageAPI from './db/base';
import { Server, Game } from '../types';
/**
 * Creates a new match.
 *
 * @param {object} db - The storage API.
 * @param {object} game - The game config object.
 * @param {number} numPlayers - The number of players.
 * @param {object} setupData - User-defined object that's available
 *                             during game setup.
 * @param {object } lobbyConfig - Configuration options for the lobby.
 * @param {boolean} unlisted - Whether the match should be excluded from public listing.
 */
export declare const CreateMatch: ({ db, game, numPlayers, setupData, uuid, unlisted, }: {
    db: StorageAPI.Sync | StorageAPI.Async;
    game: Game<any, import("../types").Ctx, any>;
    numPlayers: number;
    setupData: any;
    uuid: () => string;
    unlisted: boolean;
}) => Promise<string>;
export declare const createRouter: ({ db, games, uuid, generateCredentials, }: {
    games: Game<any, import("../types").Ctx, any>[];
    uuid?: () => string;
    generateCredentials?: Server.GenerateCredentials;
    db: StorageAPI.Sync | StorageAPI.Async;
}) => Router<any, {}>;
export declare const configureApp: (app: Koa<Koa.DefaultState, Koa.DefaultContext>, router: Router<any, {}>) => void;
