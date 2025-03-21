
const WebSocket = require("ws");
const fs = require("fs");
const path = require("path");
const wss = new WebSocket.Server({ port: 8080 });

console.log("WebSocket server running on ws://localhost:8080");



wss.on("connection", (ws) => {
  console.log("Client connected!");

  ws.on("message", (message) => {
    console.log("Received message:", typeof message);

    if (message instanceof Buffer) {
      const filename = `image${Date.now()}.png`;
      const filePath = path.join(__dirname,"uploads", filename);

      fs.writeFile(filePath, message, (err) => {
        if (err) {
          console.error("Error saving image:", err);
          ws.send("Error saving image.");
        } else {
          console.log(`Image saved as ${filename}`);
          ws.send(`http://localhost:5000/uploads/$%7Bfilename%7D%60`); // Send image URL back
        }
      });
    } else {
      ws.send("Received non-binary data.");
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected.");
  });
});