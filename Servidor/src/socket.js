
const WebSocket = require("ws");
const fs = require("fs");
const path = require("path");
const wss = new WebSocket.Server({ port: 8080 });

console.log("WebSocket server running on ws://localhost:8080");



wss.on("connection", (ws) => {
  console.log("Client connected!");

  ws.on("message", (message) => {
    const text = message.toString().trim(); 

    console.log("Received text:", text);

    const income = parseFloat(text);

    if (isNaN(income) || income < 0) {
      ws.send("Error: Please send a valid income amount.");
      return;
    }

  
    const taxRate = 0.2;
    const taxAmount = income * taxRate;
    const afterTaxIncome = income - taxAmount;

    const response = {
      originalIncome: income,
      taxRate: taxRate * 100 + "%",
      taxAmount: taxAmount,
      afterTaxIncome: afterTaxIncome,
    };

    ws.send(JSON.stringify(response));
  });

  ws.on("close", () => {
    console.log("Client disconnected.");
  });
});