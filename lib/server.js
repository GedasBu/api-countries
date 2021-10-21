const http = require('http');
const data = require('./data.js')

const server = {};

server.db = null;

server.httpServer = http.createServer((req, res) => {
  const baseURL = `http${req.socket.encrypted ? 's':''}://${req.headers.host}`;
  const parseURL = new URL(req.url,baseURL);
  const parsedPathName = parseURL.pathname;
  const httpMethod = req.method.toLowerCase();
  const trimedPath = parsedPathName.replace(/^\/+|\/+$/g,'')


  console.log(trimedPath); 
    

    req.on('data',  ()=>{
        console.log('dalinis uzklausos gavimas');
    })
    req.on('end', async ()=>{
        let responseContent = ''; 
        if (httpMethod === 'get'){
                responseContent = 'GET country';
                const countryContent = await data.read('countries',trimedPath);
                console.log(countryContent);

        } else if (httpMethod === 'post'){
            responseContent = 'POST country';
        } else if (httpMethod === 'put'){
            responseContent = 'PUT country'; 
        }else if (httpMethod === 'delete'){
            responseContent = 'DELETE country';
        } else {
            responseContent = 'Klaida netinkamas užklausos metodas';
        }

       
        res.end(responseContent);
    })
});


server.routes = {};

server.api = {};

server.init = () => {
    const port = 3000;
    
    server.httpServer.listen(port, () => {
        console.log(`Tavo serveris sukasi ant http://localhost:${port}`);
    })
 
}


module.exports = server;