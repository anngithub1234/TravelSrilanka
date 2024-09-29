require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const packageRoutes  = require('./routes/packages')
const destinationRoutes = require('./routes/destinations');
const specialRoutes = require('./routes/specials');
const path = require("path");

connection()

//middleware
app.use(express.json())
app.use(cors());

app.use("/images", express.static(path.join(__dirname, "/images")));

//routes
app.use("/api/users",userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/packages", packageRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/specials', specialRoutes);

const port = process.allowedNodeEnvironmentFlags.PORT || 8080;
app.listen(port,()=> console.log(`Listening on port ${port}`));
