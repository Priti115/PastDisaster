const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve Static Files
app.use(express.static(path.join(__dirname)));

// API Route to Fetch Disaster Data (No Limit)
app.get('/api/disasters', async (req, res) => {
  try {
    const response = await axios.get('https://api.reliefweb.int/v1/disasters', {
      params: {
        appname: 'disaster-dashboard',
        profile: 'full',
        sort: 'date:desc'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message || error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Serve the Dashboard Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
