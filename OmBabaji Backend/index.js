const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4001;

// Middleware
app.use(bodyParser.json());
const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/user', require('./routes/userRoute')); 

const initiateConnection = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connection has been established successfully.');
    app.listen(PORT, () => {
      console.log(`Server started on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

initiateConnection();
