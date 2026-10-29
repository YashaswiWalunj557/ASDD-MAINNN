const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Node.js backend is running\n");
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Node.js backend is running on port 3000");
});
