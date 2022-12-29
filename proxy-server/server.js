// Reference : https://www.npmjs.com/package/cors-anywhere

const cors_proxy = require('cors-anywhere');

// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8080;

cors_proxy
  .createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],	//Optional
    removeHeaders: ['cookie', 'cookie2']			//Optional
  })
  .listen(port, host, function () {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
  });
  
  
  
//////////////////// Proxy Test //////////////////////////////////

  
var http = require('http');
var fs = require('fs');

/*
http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  var readSream = fs.createReadStream('test.html');
  readSream.pipe(response);
}).listen(3000);
*/

http.createServer(function(req, res){
    fs.readFile('test.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
    });
}).listen(3000, function () {
    console.log('Running test.html on port 3000..');
});

