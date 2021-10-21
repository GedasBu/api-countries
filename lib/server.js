const http = require('http');

const server = {};

server.db = null;

server.httpServer = http.createServer((req, res) => {
    console.log('Atejo uzklausa...');
    console.log(req.url, ':',req.method);
    

    req.on('data',()=>{
        console.log('dalinis uzklausos gavimas');
    })
    req.on('end',()=>{
        console.log('serveris gavo visa uzklausa');
        res.end('Sveiki atvyke i musu Countries API puslapi');
    })
});


server.routes = {};

server.api = {};

server.init = () => {
    const port = 3000;
    console.log('uzkuriam serveri..')
    server.httpServer.listen(port, () => {
        console.log(`Tavo serveris sukasi ant http://localhost:${port}`);
    })
 
}


module.exports = server;