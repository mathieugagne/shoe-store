import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';

@WebSocketGateway(8080)
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server;

  private logger: Logger = new Logger('EventsGateway');

  newNotification({ updated }) {
    this.logger.log(`New notification ${updated.id}`);
    try {
      this.server.clients.forEach((s) => {
        s.send( JSON.stringify(updated));
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async handleConnection(instance) {
    try {
      instance.emit('READY');
    } catch (error) {
      this.logger.error(`gateway connection error ${error}`);
    }
  }

  async handleDisconnect(client) {
    this.logger.error(`gateway client disconnect error ${client}`);
  }
}
