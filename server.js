import { createServer } from "node:http";
import { readFile } from "node:fs";

export const server = createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      readFile("./index.html", (err, content) => {
        if (err) {
          res.writeHead(500);
          res.end("Server Error");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(content);
        }
      });
    } else if (req.url === "/index.js") {
      readFile("./index.js", (err, content) => {
        if (err) {
          res.writeHead(500);
          res.end("Server Error");
        } else {
          res.writeHead(200, { "Content-Type": "application/javascript" });
          res.end(content);
        }
      });
    }
  } else if (req.method === "POST" && req.url === "/like") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      console.log("data: ", body);
    });
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        console.log(`User clicked: ${data.liked ? "Liked" : "Unliked"}`);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true }));
      } catch (error) {
        res.writeHead(400);
        res.end("Invalid JSON");
      }
    });
  } else if (req.method === "POST" && req.url === "/api/add-item") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const params = new URLSearchParams(body);
      const item = params.get("new-list-item-label");
      console.log("Received item:", item);
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ input: item }));
    });
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
