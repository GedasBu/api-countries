const http = require('http');
const { StringDecoder } = require('string_decoder');
const data = require('./data.js');
const utils = require('./utils');

const server = {};

server.db = null;

server.httpServer = http.createServer((req, res) => {
    const baseURL = `http${req.socket.encrypted ? 's' : ''}://${req.headers.host}`;
    const parseURL = new URL(req.url, baseURL);
    const parsedPathName = parseURL.pathname;
    const httpMethod = req.method.toLowerCase();
    const trimedPath = parsedPathName.replace(/^\/+|\/+$/g, '')

    const decoder = new StringDecoder('utf-8');
    let buffer = '';

    req.on('data', (data) => {
        buffer += decoder.write(data);
    })
    req.on('end', async () => {
        buffer += decoder.end();
        let responseContent = '';
        const payLoad = utils.parseJSONtoObject(buffer);


        switch (httpMethod) {
            case 'get':
                const countryContent = await data.read('countries', trimedPath);
                responseContent = JSON.stringify(countryContent);
                break;
            case 'post':
                if (typeof payLoad.name !== 'string' || payLoad.name === '') {
                    responseContent = 'Norint irasyti nauja valstybe privaloma nurodyta pavadinima';
                } else {
                    const createResponse = await data.create('countries', payLoad.name.toLowerCase(), payLoad)
                    responseContent = `${createResponse}: ${payLoad.name}`
                }
                break;
            case 'put':
                const payLoadKeys = Object.keys(payLoad); //tikriname ar objekte yra raktu
                const payLoadHasName = payLoadKeys.includes('name');
                
                if (payLoadHasName && payLoadKeys.length === 1) {                    
                        responseContent = 'Salies pavadinimo keisti negalima';
                    } else {
                        // ignoruojame salies pavadinima
                        // atnaujiname visus kitas reiksmes  
                          const currentContent = await data.read('countries', trimedPath);
                            const newContent = { ...currentContent, ...payLoad, name: currentContent.name };
                            const updateResponse = await data.update('countries', trimedPath, newContent);
                           responseContent = `${updateResponse}: ${trimedPath}`;
                        
                        }
                     
                break;

            case 'delete':
                const deleteResponse = await data.delete('countries', trimedPath);
                responseContent = `${deleteResponse}: ${trimedPath}`;
                break;
            default:
                responseContent = 'Klaida netinkamas užklausos metodas';
                break;
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