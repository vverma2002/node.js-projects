// Reference : https://codeforgeek.com/render-html-file-expressjs/

const express = require('express'); 	//Import the express dependency

const app = express();              	//Instantiate an express app, the main work horse of this server
const port = process.env.port || 5000;	//Save the port number where your server will be listening

const path = require('path');
const router = express.Router();

/*
app.get('/', (req, res) => {        
    res.send('Hello World! : Served by express');
});

app.get('/file', (req, res) => {       
    res.sendFile('index.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
                                                        //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});
*/

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/about.html'));
});

router.get('/sitemap',function(req,res){
  res.sendFile(path.join(__dirname+'/sitemap.html'));
});

//add the router
app.use('/', router);

//static content
// app.use(express.static(__dirname + "/public/"));
// app.use(express.static(__dirname + "/css/"));
app.use(express.static(__dirname));

app.listen(port, () => {            	//server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});
