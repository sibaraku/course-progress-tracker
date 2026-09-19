import 'dotenv/config';
import app from './app.js';
import sequelize from './config/database.js';
import './models/index.js';

const port = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port, () => console.log(`Backend listening on port ${port}`));
  } catch (error) {
    console.error('Unable to start server:', error.message);
    process.exit(1);
  }
}

start();