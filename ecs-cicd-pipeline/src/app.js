const express = require('express');
const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

app.get('/properties', (req, res) => {
  res.status(200).json({
    properties: [
      { id: 1, address: '12 Baker Street', status: 'active' },
      { id: 2, address: '45 Kings Road', status: 'maintenance' },
    ]
  });
});

module.exports = app;