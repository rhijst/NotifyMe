require('dotenv').config();
const http = require('http');
const client = require('prom-client');

const { connectRabbit } = require('./config/rabbit');
const { startConsumer } = require('./consumers/eventConsumer');

client.collectDefaultMetrics();

async function start() {
  await connectRabbit();
  await startConsumer();

  const port = process.env.PORT || 3003;
  http.createServer(async (req, res) => {
    if (req.url === '/metrics') {
      res.setHeader('Content-Type', client.register.contentType);
      res.end(await client.register.metrics());
    } else {
      res.writeHead(404);
      res.end();
    }
  }).listen(port, () => {
    console.log(`Mail service metrics available on port ${port}`);
  });
}

start();