const express = require('express');
const morgan = require("morgan");
const cors = require('cors'); 
const { createProxyMiddleware } = require('http-proxy-middleware');
// Create Express Server
const dotenv = require("dotenv");
const app = express();
//cors
dotenv.config();
app.use(cors());
// Logging
app.use(morgan('dev'));
// Configuration
const PORT = process.env.PORT;
const API_SERVICE_URL = "https://api.deezer.com";

// Proxy endpoints
app.use('/api', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/api`]: '',
    },
 }));

 // Start the Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at Port:${PORT}`);
 });

