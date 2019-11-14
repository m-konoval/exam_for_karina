const fs = require('fs');
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });

  fs.createReadStream(__dirname + '/home.html', 'utf8').pipe(res);
});

server.listen(3000, 'localhost', () => {
  console.log('it works !');
});