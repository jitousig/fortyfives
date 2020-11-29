'use strict';

var redux = require('redux');
var turnOrder = require('./turn-order-56716693.js');
var reducer = require('./reducer-45a421df.js');
var initialize = require('./initialize-a2759194.js');
var base = require('./base-4e44970d.js');

/**
 * Creates a new match metadata object.
 */
const createMetadata = ({ game, unlisted, setupData, numPlayers, }) => {
    const metadata = {
        gameName: game.name,
        unlisted: !!unlisted,
        players: {},
        createdAt: Date.now(),
        updatedAt: Date.now(),
    };
    if (setupData !== undefined)
        metadata.setupData = setupData;
    for (let playerIndex = 0; playerIndex < numPlayers; playerIndex++) {
        metadata.players[playerIndex] = { id: playerIndex };
    }
    return metadata;
};

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
const getPlayerMetadata = (matchData, playerID) => {
    if (matchData && matchData.players) {
        return matchData.players[playerID];
    }
};
/**
 * Filter match data to get a player metadata object with credentials stripped.
 */
const filterMatchData = (matchData) => Object.values(matchData.players).map(player => {
    const { credentials, ...filteredData } = player;
    return filteredData;
});
function IsSynchronous(storageAPI) {
    return storageAPI.type() === base.Type.SYNC;
}
/**
 * Redact the log.
 *
 * @param {Array} log - The game log (or deltalog).
 * @param {String} playerID - The playerID that this log is
 *                            to be sent to.
 */
function redactLog(log, playerID) {
    if (log === undefined) {
        return log;
    }
    return log.map(logEvent => {
        // filter for all other players and spectators.
        if (playerID !== null && +playerID === +logEvent.action.payload.playerID) {
            return logEvent;
        }
        if (logEvent.redact !== true) {
            return logEvent;
        }
        const payload = {
            ...logEvent.action.payload,
            args: null,
        };
        const filteredEvent = {
            ...logEvent,
            action: { ...logEvent.action, payload },
        };
        /* eslint-disable-next-line no-unused-vars */
        const { redact, ...remaining } = filteredEvent;
        return remaining;
    });
}
/**
 * Verifies that the match has metadata and is using credentials.
 */
const doesMatchRequireAuthentication = (matchData) => {
    if (!matchData)
        return false;
    const { players } = matchData;
    const hasCredentials = Object.keys(players).some(key => {
        return !!(players[key] && players[key].credentials);
    });
    return hasCredentials;
};
/**
 * Verifies that the move came from a player with the correct credentials.
 */
const isActionFromAuthenticPlayer = (actionCredentials, playerMetadata) => {
    if (!actionCredentials)
        return false;
    if (!playerMetadata)
        return false;
    return actionCredentials === playerMetadata.credentials;
};
/**
 * Remove player credentials from action payload
 */
const stripCredentialsFromAction = (action) => {
    // eslint-disable-next-line no-unused-vars
    const { credentials, ...payload } = action.payload;
    return { ...action, payload };
};
/**
 * Master
 *
 * Class that runs the game and maintains the authoritative state.
 * It uses the transportAPI to communicate with clients and the
 * storageAPI to communicate with the database.
 */
class Master {
    constructor(game, storageAPI, transportAPI, auth) {
        this.game = reducer.ProcessGameConfig(game);
        this.storageAPI = storageAPI;
        this.transportAPI = transportAPI;
        this.auth = null;
        this.subscribeCallback = () => { };
        this.shouldAuth = () => false;
        if (auth === true) {
            this.auth = isActionFromAuthenticPlayer;
            this.shouldAuth = doesMatchRequireAuthentication;
        }
        else if (typeof auth === 'function') {
            this.auth = auth;
            this.shouldAuth = () => true;
        }
    }
    subscribe(fn) {
        this.subscribeCallback = fn;
    }
    /**
     * Called on each move / event made by the client.
     * Computes the new value of the game state and returns it
     * along with a deltalog.
     */
    async onUpdate(credAction, stateID, matchID, playerID) {
        let isActionAuthentic;
        let metadata;
        const credentials = credAction.payload.credentials;
        if (IsSynchronous(this.storageAPI)) {
            ({ metadata } = this.storageAPI.fetch(matchID, { metadata: true }));
            const playerMetadata = getPlayerMetadata(metadata, playerID);
            isActionAuthentic = this.shouldAuth(metadata)
                ? this.auth(credentials, playerMetadata)
                : true;
        }
        else {
            ({ metadata } = await this.storageAPI.fetch(matchID, {
                metadata: true,
            }));
            const playerMetadata = getPlayerMetadata(metadata, playerID);
            isActionAuthentic = this.shouldAuth(metadata)
                ? await this.auth(credentials, playerMetadata)
                : true;
        }
        if (!isActionAuthentic) {
            return { error: 'unauthorized action' };
        }
        let action = stripCredentialsFromAction(credAction);
        const key = matchID;
        let state;
        if (IsSynchronous(this.storageAPI)) {
            ({ state } = this.storageAPI.fetch(key, { state: true }));
        }
        else {
            ({ state } = await this.storageAPI.fetch(key, { state: true }));
        }
        if (state === undefined) {
            turnOrder.error(`game not found, matchID=[${key}]`);
            return { error: 'game not found' };
        }
        if (state.ctx.gameover !== undefined) {
            turnOrder.error(`game over - matchID=[${key}]`);
            return;
        }
        const reducer$1 = reducer.CreateGameReducer({
            game: this.game,
        });
        const store = redux.createStore(reducer$1, state);
        // Only allow UNDO / REDO if there is exactly one player
        // that can make moves right now and the person doing the
        // action is that player.
        if (action.type == turnOrder.UNDO || action.type == turnOrder.REDO) {
            const hasActivePlayers = state.ctx.activePlayers !== null;
            const isCurrentPlayer = state.ctx.currentPlayer === playerID;
            if (
            // If activePlayers is empty, non-current players can’t undo.
            (!hasActivePlayers && !isCurrentPlayer) ||
                // If player is not active or multiple players are active, can’t undo.
                (hasActivePlayers &&
                    (state.ctx.activePlayers[playerID] === undefined ||
                        Object.keys(state.ctx.activePlayers).length > 1))) {
                turnOrder.error(`playerID=[${playerID}] cannot undo / redo right now`);
                return;
            }
        }
        // Check whether the player is active.
        if (!this.game.flow.isPlayerActive(state.G, state.ctx, playerID)) {
            turnOrder.error(`player not active - playerID=[${playerID}]`);
            return;
        }
        // Check whether the player is allowed to make the move.
        if (action.type == turnOrder.MAKE_MOVE &&
            !this.game.flow.getMove(state.ctx, action.payload.type, playerID)) {
            turnOrder.error(`move not processed - canPlayerMakeMove=false, playerID=[${playerID}]`);
            return;
        }
        if (state._stateID !== stateID) {
            turnOrder.error(`invalid stateID, was=[${stateID}], expected=[${state._stateID}]`);
            return;
        }
        // Update server's version of the store.
        store.dispatch(action);
        state = store.getState();
        this.subscribeCallback({
            state,
            action,
            matchID,
        });
        this.transportAPI.sendAll((playerID) => {
            const filteredState = {
                ...state,
                G: this.game.playerView(state.G, state.ctx, playerID),
                deltalog: undefined,
                _undo: [],
                _redo: [],
            };
            const log = redactLog(state.deltalog, playerID);
            return {
                type: 'update',
                args: [matchID, filteredState, log],
            };
        });
        const { deltalog, ...stateWithoutDeltalog } = state;
        let newMetadata;
        if (metadata && !('gameover' in metadata)) {
            newMetadata = {
                ...metadata,
                updatedAt: Date.now(),
            };
            if (state.ctx.gameover !== undefined) {
                newMetadata.gameover = state.ctx.gameover;
            }
        }
        if (IsSynchronous(this.storageAPI)) {
            this.storageAPI.setState(key, stateWithoutDeltalog, deltalog);
            if (newMetadata)
                this.storageAPI.setMetadata(key, newMetadata);
        }
        else {
            const writes = [
                this.storageAPI.setState(key, stateWithoutDeltalog, deltalog),
            ];
            if (newMetadata) {
                writes.push(this.storageAPI.setMetadata(key, newMetadata));
            }
            await Promise.all(writes);
        }
    }
    /**
     * Called when the client connects / reconnects.
     * Returns the latest game state and the entire log.
     */
    async onSync(matchID, playerID, numPlayers = 2) {
        const key = matchID;
        const fetchOpts = {
            state: true,
            metadata: true,
            log: true,
            initialState: true,
        };
        let fetchResult;
        if (IsSynchronous(this.storageAPI)) {
            fetchResult = this.storageAPI.fetch(key, fetchOpts);
        }
        else {
            fetchResult = await this.storageAPI.fetch(key, fetchOpts);
        }
        let { state, initialState, log, metadata } = fetchResult;
        // If the game doesn't exist, then create one on demand.
        // TODO: Move this out of the sync call.
        if (state === undefined) {
            initialState = state = initialize.InitializeGame({ game: this.game, numPlayers });
            metadata = createMetadata({
                game: this.game,
                unlisted: true,
                numPlayers,
            });
            this.subscribeCallback({ state, matchID });
            if (IsSynchronous(this.storageAPI)) {
                this.storageAPI.createMatch(key, { initialState, metadata });
            }
            else {
                await this.storageAPI.createMatch(key, { initialState, metadata });
            }
        }
        const filteredMetadata = metadata ? filterMatchData(metadata) : undefined;
        const filteredState = {
            ...state,
            G: this.game.playerView(state.G, state.ctx, playerID),
            deltalog: undefined,
            _undo: [],
            _redo: [],
        };
        log = redactLog(log, playerID);
        const syncInfo = {
            state: filteredState,
            log,
            filteredMetadata,
            initialState,
        };
        this.transportAPI.send({
            playerID,
            type: 'sync',
            args: [matchID, syncInfo],
        });
        return;
    }
    /**
     * Called when a client connects or disconnects.
     * Updates and sends out metadata to reflect the player’s connection status.
     */
    async onConnectionChange(matchID, playerID, connected) {
        const key = matchID;
        let metadata;
        if (IsSynchronous(this.storageAPI)) {
            ({ metadata } = this.storageAPI.fetch(matchID, { metadata: true }));
        }
        else {
            ({ metadata } = await this.storageAPI.fetch(matchID, {
                metadata: true,
            }));
        }
        if (metadata === undefined) {
            turnOrder.error(`metadata not found for matchID=[${key}]`);
            return { error: 'metadata not found' };
        }
        if (metadata.players[playerID] === undefined) {
            turnOrder.error(`Player not in the match, matchID=[${key}] playerID=[${playerID}]`);
            return { error: 'player not in the match' };
        }
        metadata.players[playerID].isConnected = connected;
        const filteredMetadata = filterMatchData(metadata);
        this.transportAPI.sendAll(() => ({
            type: 'matchData',
            args: [matchID, filteredMetadata],
        }));
        if (IsSynchronous(this.storageAPI)) {
            this.storageAPI.setMetadata(key, metadata);
        }
        else {
            await this.storageAPI.setMetadata(key, metadata);
        }
    }
}

exports.Master = Master;
