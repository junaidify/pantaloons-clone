require('dotenv').config();
const jsonServer = require("json-server");
const express = require("express");
const cors = require("cors");
const paymentRoutes = require("./routes/payment");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173', 'http://localhost:3000'];

server.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

server.use(express.json());
server.use(middlewares);

server.use('/payment', paymentRoutes);

server.use(router);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`JSON Server endpoint: http://localhost:${port}`);
  console.log(`Payment endpoint: http://localhost:${port}/payment`);
});
