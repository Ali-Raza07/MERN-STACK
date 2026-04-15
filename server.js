const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
 
dotenv.config();
const app = express();
 
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type','Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
 
app.use('/api/team',   require('./routes/team'));
app.use('/api/slides', require('./routes/slides'));
app.use('/api/auth',   require('./routes/auth'));
 
app.get('/', (req, res) => res.json({ message: 'DevPortfolio API running ✅', version: '1.0.0' }));
 
app.use((req, res) => res.status(404).json({ success: false, error: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({ success: false, error: err.message || 'Server error' });
});
 
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/devportfolio')
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server: http://localhost:${PORT}`));
  })
  .catch(err => { console.error('❌ MongoDB failed:', err.message); process.exit(1); });
 
