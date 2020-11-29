/// <reference types="node" />
import { Socket, ServerOptions as SocketOptions } from 'socket.io';
import { ServerOptions as HttpsOptions } from 'https';
import { TransportAPI as MasterTransport, AuthFn } from '../../master/master';
/**
 * API that's exposed by SocketIO for the Master to send
 * information to the clients.
 */
export declare function TransportAPI(matchID: string, socket: Socket, clientInfo: SocketIO['clientInfo'], roomInfo: SocketIO['roomInfo']): MasterTransport;
export interface SocketOpts {
    auth?: boolean | AuthFn;
    https?: HttpsOptions;
    socketOpts?: SocketOptions;
    socketAdapter?: any;
}
interface Client {
    matchID: string;
    playerID: string;
    socket: Socket;
}
/**
 * Transport interface that uses socket.io
 */
export declare class SocketIO {
    protected clientInfo: Map<string, Client>;
    protected roomInfo: Map<string, Set<string>>;
    private auth;
    private https;
    private socketAdapter;
    private socketOpts;
    constructor({ auth, https, socketAdapter, socketOpts, }?: SocketOpts);
    init(app: any, games: any): void;
}
export {};
