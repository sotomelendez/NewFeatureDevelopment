var express = require('express');
var app = express();

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
 
global.__basedir = __dirname;
 
let router = require('./app/routers/file.router.js');
app.use('/', router);

let server = app.listen(8080, () => {

  let host = server.address().address
  let port = server.address().port

  console.log("App listening at http://%s:%s", host, port); 
})