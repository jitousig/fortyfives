import { s as sync, w as update, r as reset } from './turn-order-7578f7f3.js';
import { S as Sync } from './base-fbb991d8.js';
import { M as Master } from './master-7515c743.js';
import ioNamespace__default from 'socket.io-client';

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * InMemory data storage.
 */
class InMemory extends Sync {
    /**
     * Creates a new InMemory storage.
     */
    constructor() {
        super();
        this.state = new Map();
        this.initial = new Map();
        this.metadata = new Map();
        this.log = new Map();
    }
    /**
     * Create a new match.
     *
     * @override
     */
    createMatch(matchID, opts) {
        this.initial.set(matchID, opts.initialState);
        this.setState(matchID, opts.initialState);
        this.setMetadata(matchID, opts.metadata);
    }
    /**
     * Write the match metadata to the in-memory object.
     */
    setMetadata(matchID, metadata) {
        this.metadata.set(matchID, metadata);
    }
    /**
     * Write the match state to the in-memory object.
     */
    setState(matchID, state, deltalog) {
        if (deltalog && deltalog.length > 0) {
            const log = this.log.get(matchID) || [];
            this.log.set(matchID, log.concat(deltalog));
        }
        this.state.set(matchID, state);
    }
    /**
     * Fetches state for a particular matchID.
     */
    fetch(matchID, opts) {
        let result = {};
        if (opts.state) {
            result.state = this.state.get(matchID);
        }
        if (opts.metadata) {
            result.metadata = this.metadata.get(matchID);
        }
        if (opts.log) {
            result.log = this.log.get(matchID) || [];
        }
        if (opts.initialState) {
            result.initialState = this.initial.get(matchID);
        }
        return result;
    }
    /**
     * Remove the match state from the in-memory object.
     */
    wipe(matchID) {
        this.state.delete(matchID);
        this.metadata.delete(matchID);
    }
    /**
     * Return all keys.
     *
     * @override
     */
    listMatches(opts) {
        return [...this.metadata.entries()]
            .filter(([key, metadata]) => {
            if (!opts) {
                return true;
            }
            if (opts.gameName !== undefined &&
                metadata.gameName !== opts.gameName) {
                return false;
            }
            if (opts.where !== undefined) {
                if (opts.where.isGameover !== undefined) {
                    const isGameover = metadata.gameover !== undefined;
                    if (isGameover !== opts.where.isGameover) {
                        return false;
                    }
                }
                if (opts.where.updatedBefore !== undefined &&
                    metadata.updatedAt >= opts.where.updatedBefore) {
                    return false;
                }
                if (opts.where.updatedAfter !== undefined &&
                    metadata.updatedAt <= opts.where.updatedAfter) {
                    return false;
                }
            }
            return true;
        })
            .map(([key]) => key);
    }
}

class WithLocalStorageMap extends Map {
    constructor(key) {
        super();
        this.key = key;
        const cache = JSON.parse(localStorage.getItem(this.key)) || [];
        cache.forEach((entry) => this.set(...entry));
    }
    sync() {
        const entries = [...this.entries()];
        localStorage.setItem(this.key, JSON.stringify(entries));
    }
    set(key, value) {
        super.set(key, value);
        this.sync();
        return this;
    }
    delete(key) {
        const result = super.delete(key);
        this.sync();
        return result;
    }
}
/**
 * locaStorage data storage.
 */
class LocalStorage extends InMemory {
    constructor(storagePrefix = 'bgio') {
        super();
        const StorageMap = (stateKey) => new WithLocalStorageMap(`${storagePrefix}_${stateKey}`);
        this.state = StorageMap('state');
        this.initial = StorageMap('initial');
        this.metadata = StorageMap('metadata');
        this.log = StorageMap('log');
    }
}

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
class Transport {
    constructor({ store, gameName, playerID, matchID, numPlayers, }) {
        this.store = store;
        this.gameName = gameName || 'default';
        this.playerID = playerID || null;
        this.matchID = matchID || 'default';
        this.numPlayers = numPlayers || 2;
    }
}

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Returns null if it is not a bot's turn.
 * Otherwise, returns a playerID of a bot that may play now.
 */
function GetBotPlayer(state, bots) {
    if (state.ctx.gameover !== undefined) {
        return null;
    }
    if (state.ctx.activePlayers) {
        for (const key of Object.keys(bots)) {
            if (key in state.ctx.activePlayers) {
                return key;
            }
        }
    }
    else if (state.ctx.currentPlayer in bots) {
        return state.ctx.currentPlayer;
    }
    return null;
}
/**
 * Creates a local version of the master that the client
 * can interact with.
 */
class LocalMaster extends Master {
    constructor({ game, bots, storageKey, persist }) {
        const clientCallbacks = {};
        const initializedBots = {};
        if (game && game.ai && bots) {
            for (const playerID in bots) {
                const bot = bots[playerID];
                initializedBots[playerID] = new bot({
                    game,
                    enumerate: game.ai.enumerate,
                    seed: game.seed,
                });
            }
        }
        const send = ({ playerID, type, args }) => {
            const callback = clientCallbacks[playerID];
            if (callback !== undefined) {
                callback.apply(null, [type, ...args]);
            }
        };
        const transportAPI = {
            send,
            sendAll: makePlayerData => {
                for (const playerID in clientCallbacks) {
                    const data = makePlayerData(playerID);
                    send({ playerID, ...data });
                }
            },
        };
        const storage = persist ? new LocalStorage(storageKey) : new InMemory();
        super(game, storage, transportAPI, false);
        this.connect = (matchID, playerID, callback) => {
            clientCallbacks[playerID] = callback;
        };
        this.subscribe(({ state, matchID }) => {
            if (!bots) {
                return;
            }
            const botPlayer = GetBotPlayer(state, initializedBots);
            if (botPlayer !== null) {
                setTimeout(async () => {
                    const botAction = await initializedBots[botPlayer].play(state, botPlayer);
                    await this.onUpdate(botAction.action, state._stateID, matchID, botAction.action.payload.playerID);
                }, 100);
            }
        });
    }
}
/**
 * Local
 *
 * Transport interface that embeds a GameMaster within it
 * that you can connect multiple clients to.
 */
class LocalTransport extends Transport {
    /**
     * Creates a new Mutiplayer instance.
     * @param {string} matchID - The game ID to connect to.
     * @param {string} playerID - The player ID associated with this client.
     * @param {string} gameName - The game type (the `name` field in `Game`).
     * @param {string} numPlayers - The number of players.
     */
    constructor({ master, store, matchID, playerID, gameName, numPlayers, }) {
        super({ store, gameName, playerID, matchID, numPlayers });
        this.master = master;
        this.isConnected = true;
    }
    /**
     * Called when another player makes a move and the
     * master broadcasts the update to other clients (including
     * this one).
     */
    async onUpdate(matchID, state, deltalog) {
        const currentState = this.store.getState();
        if (matchID == this.matchID && state._stateID >= currentState._stateID) {
            const action = update(state, deltalog);
            this.store.dispatch(action);
        }
    }
    /**
     * Called when the client first connects to the master
     * and requests the current game state.
     */
    onSync(matchID, syncInfo) {
        if (matchID == this.matchID) {
            const action = sync(syncInfo);
            this.store.dispatch(action);
        }
    }
    /**
     * Called when an action that has to be relayed to the
     * game master is made.
     */
    onAction(state, action) {
        this.master.onUpdate(action, state._stateID, this.matchID, this.playerID);
    }
    /**
     * Connect to the master.
     */
    connect() {
        this.master.connect(this.matchID, this.playerID, (type, ...args) => {
            if (type == 'sync') {
                this.onSync.apply(this, args);
            }
            if (type == 'update') {
                this.onUpdate.apply(this, args);
            }
        });
        this.master.onSync(this.matchID, this.playerID, this.numPlayers);
    }
    /**
     * Disconnect from the master.
     */
    disconnect() { }
    /**
     * Subscribe to connection state changes.
     */
    subscribe() { }
    subscribeMatchData() { }
    /**
     * Updates the game id.
     * @param {string} id - The new game id.
     */
    updateMatchID(id) {
        this.matchID = id;
        const action = reset(null);
        this.store.dispatch(action);
        this.connect();
    }
    /**
     * Updates the player associated with this client.
     * @param {string} id - The new player id.
     */
    updatePlayerID(id) {
        this.playerID = id;
        const action = reset(null);
        this.store.dispatch(action);
        this.connect();
    }
}
/**
 * Global map storing local master instances.
 */
const localMasters = new Map();
/**
 * Create a local transport.
 */
function Local({ bots, persist, storageKey } = {}) {
    return (transportOpts) => {
        const { gameKey, game } = transportOpts;
        let master;
        const instance = localMasters.get(gameKey);
        if (instance &&
            instance.bots === bots &&
            instance.storageKey === storageKey &&
            instance.persist === persist) {
            master = instance.master;
        }
        if (!master) {
            master = new LocalMaster({ game, bots, persist, storageKey });
            localMasters.set(gameKey, { master, bots, persist, storageKey });
        }
        return new LocalTransport({ master, ...transportOpts });
    };
}

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
const io = ioNamespace__default;
/**
 * SocketIO
 *
 * Transport interface that interacts with the Master via socket.io.
 */
class SocketIOTransport extends Transport {
    /**
     * Creates a new Mutiplayer instance.
     * @param {object} socket - Override for unit tests.
     * @param {object} socketOpts - Options to pass to socket.io.
     * @param {string} matchID - The game ID to connect to.
     * @param {string} playerID - The player ID associated with this client.
     * @param {string} gameName - The game type (the `name` field in `Game`).
     * @param {string} numPlayers - The number of players.
     * @param {string} server - The game server in the form of 'hostname:port'. Defaults to the server serving the client if not provided.
     */
    constructor({ socket, socketOpts, store, matchID, playerID, gameName, numPlayers, server, } = {}) {
        super({ store, gameName, playerID, matchID, numPlayers });
        this.server = server;
        this.socket = socket;
        this.socketOpts = socketOpts;
        this.isConnected = false;
        this.callback = () => { };
        this.matchDataCallback = () => { };
    }
    /**
     * Called when an action that has to be relayed to the
     * game master is made.
     */
    onAction(state, action) {
        this.socket.emit('update', action, state._stateID, this.matchID, this.playerID);
    }
    /**
     * Connect to the server.
     */
    connect() {
        if (!this.socket) {
            if (this.server) {
                let server = this.server;
                if (server.search(/^https?:\/\//) == -1) {
                    server = 'http://' + this.server;
                }
                if (server.substr(-1) != '/') {
                    // add trailing slash if not already present
                    server = server + '/';
                }
                this.socket = io(server + this.gameName, this.socketOpts);
            }
            else {
                this.socket = io('/' + this.gameName, this.socketOpts);
            }
        }
        // Called when another player makes a move and the
        // master broadcasts the update to other clients (including
        // this one).
        this.socket.on('update', (matchID, state, deltalog) => {
            const currentState = this.store.getState();
            if (matchID == this.matchID &&
                state._stateID >= currentState._stateID) {
                const action = update(state, deltalog);
                this.store.dispatch(action);
            }
        });
        // Called when the client first connects to the master
        // and requests the current game state.
        this.socket.on('sync', (matchID, syncInfo) => {
            if (matchID == this.matchID) {
                const action = sync(syncInfo);
                this.matchDataCallback(syncInfo.filteredMetadata);
                this.store.dispatch(action);
            }
        });
        // Called when new player joins the match or changes
        // it's connection status
        this.socket.on('matchData', (matchID, matchData) => {
            if (matchID == this.matchID) {
                this.matchDataCallback(matchData);
            }
        });
        // Keep track of connection status.
        this.socket.on('connect', () => {
            // Initial sync to get game state.
            this.socket.emit('sync', this.matchID, this.playerID, this.numPlayers);
            this.isConnected = true;
            this.callback();
        });
        this.socket.on('disconnect', () => {
            this.isConnected = false;
            this.callback();
        });
    }
    /**
     * Disconnect from the server.
     */
    disconnect() {
        this.socket.close();
        this.socket = null;
        this.isConnected = false;
        this.callback();
    }
    /**
     * Subscribe to connection state changes.
     */
    subscribe(fn) {
        this.callback = fn;
    }
    subscribeMatchData(fn) {
        this.matchDataCallback = fn;
    }
    /**
     * Updates the game id.
     * @param {string} id - The new game id.
     */
    updateMatchID(id) {
        this.matchID = id;
        const action = reset(null);
        this.store.dispatch(action);
        if (this.socket) {
            this.socket.emit('sync', this.matchID, this.playerID, this.numPlayers);
        }
    }
    /**
     * Updates the player associated with this client.
     * @param {string} id - The new player id.
     */
    updatePlayerID(id) {
        this.playerID = id;
        const action = reset(null);
        this.store.dispatch(action);
        if (this.socket) {
            this.socket.emit('sync', this.matchID, this.playerID, this.numPlayers);
        }
    }
}
function SocketIO({ server, socketOpts } = {}) {
    return (transportOpts) => new SocketIOTransport({
        server,
        socketOpts,
        ...transportOpts,
    });
}

export { Local as L, SocketIO as S };
