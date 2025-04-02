import express, { json } from 'express';
import 'express-async-errors';
import { config } from './config/index.js';
import { hub } from './src/hub/index.js';

const app = express();
app.use(json());
app.use('/storage', express.static('storage'));

app.use('/api/v1/hub', hub.router);

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message || 'An error occurred while processing the request' });
});

app.listen(config.app.port, () => {
  console.log(`Server is running on port: http://localhost:${config.app.port}`);
});
