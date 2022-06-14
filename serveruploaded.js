const http = require('http');
const url = require('url');
const { exec, execFile } = require('child_process');


const port = 8080;

// command injection fail
const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  if (query.cmd) {
    const command = `/usr/local/bin/${query.cmd}`;
    const args = [];
    execFile(command,args,(err, stdout) => {
      if (err) {
        res.end(JSON.stringify(err));
        return;
      }
      res.end(JSON.stringify({
        stdout,
        stderr
      }))
    });
  } else {
    res.end(JSON.stringify(query));
  }

});

server.listen(port, () => {
  console.log(`Server running.`);
});
