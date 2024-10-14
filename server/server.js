const express = require("express");
require('dotenv').config();
const cors = require("cors");
const app = express();
const path = require('path');
const _dirname=path.dirname("")
const frontUrl = process.env.API_URL;

const corsOptions = {
  origin: `${frontUrl}`, 
  credentials: true 
};

// Use the CORS middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'));

const buildPath=path.join(_dirname,"../client/dist")
app.use(express.static(buildPath));

const urlRoutes=require("./router/router")
app.use('/api', urlRoutes);


app.listen(5000, () => {
  console.log("Server started on port 5000");
});
