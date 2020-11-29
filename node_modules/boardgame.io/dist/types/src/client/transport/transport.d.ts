import { ProcessGameConfig } from '../../core/game';
import { Game, PlayerID, CredentialedActionShape, State, Store, SyncInfo } from '../../types';
export declare type MetadataCallback = (metadata: SyncInfo['filteredMetadata']) => void;
export interface TransportOpts {
    store?: Store;
    gameName?: string;
    gameKey?: Game;
    game?: ReturnType<typeof ProcessGameConfig>;
    playerID?: PlayerID;
    matchID?: string;
    numPlayers?: number;
}
export declare abstract class Transport {
    protected store: Store;
    protected gameName: string;
    protected playerID: PlayerID | null;
    protected matchID: string;
    protected numPlayers: number;
    isConnected: boolean;
    constructor({ store, gameName, playerID, matchID, numPlayers, }: TransportOpts);
    abstract onAction(state: State, action: CredentialedActionShape.Any): void;
    abstract connect(): void;
    abstract disconnect(): void;
    abstract subscribe(fn: () => void): void;
    abstract subscribeMatchData(fn: MetadataCallback): void;
    abstract updateMatchID(id: string): void;
    abstract updatePlayerID(id: PlayerID): void;
}
