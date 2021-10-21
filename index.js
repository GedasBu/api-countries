const server = require('./lib/server.js')


const app = {};

app.init = () =>{
// pasiruosti pradinius folderius
// pasiruosti failus
// prisijungti pie db
server.init();

};

app.init();

module.exports = app;