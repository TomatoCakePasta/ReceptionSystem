const express = require('express')
const app = express()
const port = 3000

// ../json/config.jsonからRASPBERRY_PI_IPを読み込む
const fs = require('fs');
const path = require('path');
const configPath = path.join(__dirname, '../json/config.json');
let config;

try {
  const configData = fs.readFileSync(configPath, 'utf8');
  config = JSON.parse(configData);
} catch (error) {
  console.error('Error reading config file:', error);
  process.exit(1);
}
// RASPBERRY_PI_IPを環境変数に設定
process.env.RASPBERRY_PI_IP = config.RASPBERRY_PI_IP;
process.env.RASPBERRY_PI_PORT = config.RASPBERRY_PI_PORT;

// corsで全てのアクセスを許可
const cors = require('cors');
app.use(cors()); 
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/entry', (req, res) => {
  const id = req.body.id;
  const { r, g, b } = req.body.color; // Assuming color is sent in the request body
  console.log(`Entry detected for ID: ${id} ${r}, ${g}, ${b}`);
  // Here you would handle the entry logic, e.g., update a database or send a response
  res.send(`Entry for ID: ${id} recorded.`);

  // Raspberry PiにTCPでidと点灯トリガー数値を送信
  const net = require('net');
  const client = new net.Socket();
  const raspberryPiIp = process.env.RASPBERRY_PI_IP;
  const raspberryPiPort = process.env.RASPBERRY_PI_PORT;

  client.connect(raspberryPiPort, raspberryPiIp, () => {
    console.log(`Connected to Raspberry Pi at ${raspberryPiIp}:${raspberryPiPort}`);
    // Sending ID and status 1 for entry
    client.write(`${id},entry,${r},${g},${b}`);
  });

  client.on('data', (data) => {
    console.log('Received from Raspberry Pi:', data.toString());
    client.destroy(); // Close the connection after receiving a response
  });

  client.on('error', (error) => {
    console.error('Error connecting to Raspberry Pi:', error);
  });

  client.on('close', () => {
    console.log('Connection to Raspberry Pi closed');
  });

})

app.post('/exit', (req, res) => {
  const id = req.body.id;
  console.log(`Exit detected for ID: ${id}`);
  // Here you would handle the exit logic, e.g., update a database or send a response
  res.send(`Exit for ID: ${id} recorded.`);

   // Raspberry PiにTCPでidと消灯トリガー数値を送信
  const net = require('net');
  const client = new net.Socket();
  const raspberryPiIp = process.env.RASPBERRY_PI_IP;
  const raspberryPiPort = process.env.RASPBERRY_PI_PORT;

  client.connect(raspberryPiPort, raspberryPiIp, () => {
    console.log(`Connected to Raspberry Pi at ${raspberryPiIp}:${raspberryPiPort}`);
    // Sending ID and status 0 for exit
    client.write(`${id},exit,0,0,0`);
  });

  client.on('data', (data) => {
    console.log('Received from Raspberry Pi:', data.toString());
    client.destroy(); // Close the connection after receiving a response
  });

  client.on('error', (error) => {
    console.error('Error connecting to Raspberry Pi:', error);
  });

  client.on('close', () => {
    console.log('Connection to Raspberry Pi closed');
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})