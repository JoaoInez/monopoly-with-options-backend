import { Server, Socket } from "socket.io";
import { WithSocketsFunction } from "../types";

const withSockets = (io: Server, socket: Socket, fn: WithSocketsFunction) => (
  params: any
): void => fn({ io, socket }, params);

export default withSockets;
