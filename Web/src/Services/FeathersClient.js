import feathers from '@feathersjs/client'
import socketio from '@feathersjs/socketio-client'
import fcAuth from '@feathersjs/authentication-client'
import io from 'socket.io-client'
import { invalidateQuery } from './QueryCache'

/* ============================== Environment Setup ================================================== */
const serverUrl = __API_BASE_URL__;
/* ============================== Socket Configuration ================================================== */
const FC = {
  socket: io(serverUrl, { transports: ['websocket'], forceNew: true }),
  client: feathers(),
  online: false,
  authenticated: false,
  connectionHandler: (event) => () => {
    console.log(`Socket ${event} to ${serverUrl}`);
    FC.online = event === 'connect';
  },
  server: serverUrl
}

FC.client.configure(socketio(FC.socket, { timeout: 30000, pingInterval: 5000, pingTimeout: 20000 }));
FC.client.configure(fcAuth({ storage: new fcAuth.MemoryStorage() }));

FC.socket.on('connect', FC.connectionHandler('connect'));
FC.socket.on('disconnect', FC.connectionHandler('disconnect'));

/* ============================== Socket Methods ================================================== */

FC.login = async (credentials) => {
  try {
    const user = await FC.client.authenticate(credentials);
    FC.authenticated = !!user.accessToken;

    return user
  } catch (details) {
    FC.authenticated = false;
    console.log(details);

    return { user: { username: 'NotAuthenticated' } }
  }
}

FC.logout = () => {
  try { FC.client.logout() } catch (e) {}
}

FC.services = FC.client.services;
FC.service = FC.client.service;

FC.isReady = () => FC.online && FC.authenticated;

// Channel Updates
FC.updateCache = (keys) => FC.client.service('messages').create({ action: 'update', keys });

FC.client.service('messages').on('created', (message) => {
  message && message.action === 'update' && message.keys && invalidateQuery(message.keys)
});

export { FC }
