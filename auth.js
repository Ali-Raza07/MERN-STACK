const express = require('express');
const router  = express.Router();
const jwt     = require('jsonwebtoken');
const Admin   = require('../models/Admin');
const protect = require('../middleware/auth');
 
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || 'devportfolio_secret_key', { expiresIn: '7d' });
 
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ 
          success: false, 
          error: 'All fields required'
      });
 
    const exists = await Admin.findOne({ email });
      
    if (exists)
      return res.status(400).json({ 
          success: false, 
          error: 'Email already registered' 
      });
 
    const admin = await Admin.create({ 
        username, 
        email, 
        password 
    });
      
    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      data: { 
          id: admin._id, 
          username: admin.username, 
          email: admin.email 
      },
      token: generateToken(admin._id)
    });
  } catch (err) {
    res.status(400).json({ 
        success: false, 
        error: err.message 
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ 
          success: false, 
          error: 'Email and password required' 
      });
 
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.comparePassword(password)))
      return res.status(401).json({ 
          success: false, 
         error: 'Invalid email or password' 
      });
 
    res.json({
      success: true,
      message: 'Login successful',
      data: { 
          id: admin._id, 
          username: admin.username, 
          email: admin.email 
            },
      token: generateToken(admin._id)
    });
  } catch (err) {
    res.status(500).json({ 
        success: false, 
        error: err.message 
    });
  }
});
 
router.get('/me', protect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    if (!admin) return res.status(404).json({ 
        success: false, 
        error: 'Admin not found' 
    });
    res.json({ 
        success: true, 
        data: admin 
    });
  } catch (err) {
    res.status(500).json({ 
        success: false, 
        error: err.message 
    });
  }
});
 
router.put('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.admin.id);
 
    if (!(await admin.comparePassword(currentPassword)))
      return res.status(400).json({ 
          success: false, 
          error: 'Current password is wrong' 
        });
 
    admin.password = newPassword;
    await admin.save();
    res.json({ 
        success: true, 
        message: 'Password updated successfully' 
    });
  } catch (err) {
    res.status(400).json({ 
        success: false, 
        error: err.message 
    });
  }
});
 
module.exports = router;
