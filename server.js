'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const multer      = require('multer');

let app           = express();
let upload        = multer({ dest: 'uploads/' });


// MIDDLEWARES
// Sets PORT where server will run
app.set ( 'PORT' , process.env.PORT || 3000 );
//Defines bodyParser to handle POST requests
app.use( bodyParser.urlencoded ( { extended: false } ) );
// Defines public folder to server static files
app.use( '/public' , express.static( process.cwd() + '/public' ) );
// Use cors for FCC testing
app.use( cors() );


// ROUTES
app.get( '/',  ( req, res ) => {
     res.sendFile( process.cwd() + '/views/index.html' );
} );

app.post( '/api/fileanalyse', upload.single('upfile'), ( req, res ) => {
  res.json( {'name': req.file.originalname, 'type': req.file.mimetype, 'size':  req.file.size} );
});

app.listen( app.get ( 'PORT' ),  () => {
  console.log( 'Node.js listening ...' );
} );
