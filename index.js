const express = require('express');
const morgan = require("morgan");
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
// Create Express Server
const dotenv = require("dotenv");
const app = express();
//cors
dotenv.config();
const corsOptions = {
    origin: 'https://melodify11.netlify.app', // Specify the allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed methods
    allowedHeaders: 'Content-Type,Authorization' // Specify allowed headers
};

// Logging
app.use(morgan('dev'));
// Configuration
const PORT = process.env.PORT;
const X_RapidAPI_key=process.env.X_RapidAPI_key;
const X_RapidAPI_Host=process.env.X_RapidAPI_Host;

const API_SERVICE_URL = "https://deezerdevs-deezer.p.rapidapi.com";

// Proxy endpoints
app.use('/api', cors(corsOptions), createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/api`]: '',
    },
    onProxyReq: (proxyReq, req, res) => {
        // Add the custom headers
        proxyReq.setHeader('X-RapidAPI-Key', X_RapidAPI_key);
        proxyReq.setHeader('X-RapidAPI-Host', X_RapidAPI_Host);
    }
}));

// Error handling middleware
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the Proxy
app.listen(PORT, () => {
    console.log(`Starting Proxy at Port:${PORT}`);
});