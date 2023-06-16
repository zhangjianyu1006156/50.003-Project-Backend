const https = require('https');
const url = 'https:///www.klook.com';

https.get(url, (res) => {
    // Connection successful
    console.log('Connection established successfully');
  }).on('error', (err) => {
    // Connection failed
    console.error('Connection error:', err);
  });
  