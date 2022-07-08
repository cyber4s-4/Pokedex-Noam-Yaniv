const { WebSocketServer, WebSocket } = require('ws');
const fs = require('fs');

const wss = new WebSocketServer({ port: 4040 });
wss.on('connection', (client) => {

    client.on('message', msg => {
        if (msg.toString() === 'get-pokemons') {
            let allPokemons = JSON.parse(fs.readFileSync('./pokemonsObj.json'))
            client.send(JSON.stringify(allPokemons))
        }
    });

    client.on('close', () => {
        console.log('Websocket disconnected')
    });
});
console.log('Websocket: ws://localhost:' + 4040);
