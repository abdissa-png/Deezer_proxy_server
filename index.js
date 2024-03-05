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
    origin: '', // Specify the allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed methods
    allowedHeaders: 'Content-Type,Authorization' // Specify allowed headers
  };
app.use("/api",cors(corsOptions));
// Logging
app.use(morgan('dev'));
// Configuration
const PORT = process.env.APP_PORT || 3000;
console.log("PORT: ",PORT)
const API_SERVICE_URL = "https://groove-it-app.ew.r.appspot.com/https://api.deezer.com";

// Proxy endpoints
app.use('/api', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/api`]: '',
    },
    onProxyReq: (proxyReq, req, res) => {
        // Set the Origin header to the desired value
        proxyReq.setHeader('Origin', 'https://groov.netlify.app');
    },
    onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
 }));
 app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500).send('Something went wrong!');
});
 // Start the Proxy
app.listen(PORT, () => {
    console.log(`Starting Proxy at Port:${PORT}`);
 });

