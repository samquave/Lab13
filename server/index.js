var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var clientPath = path.join(__dirname, '../client');
var dataPath = path.join(__dirname, 'data.json');

var server = http.createServer(function (req, res) {
    var urlData = url.parse(req.url, true);

    if (urlData.pathname === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(path.join(clientPath, 'index.html')).pipe(res);
    } else if (urlData.pathname === '/api/chirps') {
        switch (req.method) {
            case 'GET':
                res.writeHead(200, { 'Content-Type': 'application/json' });
                fs.createReadStream(dataPath).pipe(res);
                break;
            case 'POST':
                fs.readFile(dataPath, 'utf8', function (err, fileContents) {
                    if (err) {
                        console.log(err);
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Internal Server Error');
                    } else {
                        var chirps = JSON.parse(fileContents);
                        var incomingData = '';
                        req.on('data', function (chunk) {
                            incomingData += chunk;
                        });
                        req.on('end', function () {
                            var newChirp = JSON.parse(incomingData);
                            chirps.push(newChirp);

                            var chirpsJSONData = JSON.stringify(chirps);
                            fs.writeFile(dataPath, chirpsJSONData, function (err) {
                                if (err) {
                                    console.log(err);
                                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                                    res.end('Internal Server Error');
                                } else {
                                    res.writeHead(201);
                                    res.end();
                                }
                            });


                        });
                    }
                });
                break;

        }
    } else if (req.method === 'GET') {
        var fileExtension = path.extname(urlData.pathname);
        var conteneType;
        switch (fileExtension) {
            case '.html':
                contentType = 'text/html';
                break;
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            default:
                contentType = 'text/plain';

        }

        var readStream = fs.createReadStream(path.join(clientPath, urlData.pathname));
        readStream.on('error', function (err) {
            res.writeHead(404);
            res.end('Not Found');
        });
        res.writeHead(200, { 'Content-Type': contentType });
        readStream.pipe(res);
    }




});
server.listen(3000);