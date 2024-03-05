const express = require('express');
const morgan = require("morgan");
const cors = require('cors'); 
const { createProxyMiddleware } = require('http-proxy-middleware');
// Create Express Server
const dotenv = require("dotenv");
const app = express();
//cors
dotenv.config();
app.use(cors({
    origin: 'https://melodify11.netlify.app',
  optionsSuccessStatus: 200
}));
// Logging
app.use(morgan('dev'));
// Configuration
const PORT = process.env.PORT;
const API_SERVICE_URL = "https://cors-anywhere.herokuapp.com/https://api.deezer.com";

// Proxy endpoints
app.use('/api', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/api`]: '',
    },
    onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
 }));
 app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
 // Start the Proxy
app.listen(PORT, () => {
    console.log(`Starting Proxy at Port:${PORT}`);
 });

