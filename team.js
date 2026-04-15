const express = require('express');
const router  = express.Router();
const path    = require('path');
const fs      = require('fs');
const TeamMember = require('../models/TeamMember');
const upload  = require('../middleware/upload');
const protect = require('../middleware/auth');
 
const getImgUrl = (req, filename) =>
  `${req.protocol}://${req.get('host')}/uploads/${filename}`;
 
const deleteOldImage = (imgUrl) => {
  if (!imgUrl || !imgUrl.includes('/uploads/')) return;
  const filename = path.basename(imgUrl);
  const filepath = path.join(__dirname, '../uploads', filename);
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
    console.log('🗑 Deleted old image:', filename);
  }
};
 
router.get('/', async (req, res) => {
  try {
    const { search, role } = req.query;
    let query = {};
 
    if (role && role !== 'All') query.role = role;
    if (search) {
      query.$or = [
        { 
            name: { 
                $regex: search, 
                $options: 'i' 
            } },
        { 
            bio:  { 
                $regex: search, 
                $options: 'i' 
            } },
        { 
            role: { 
                $regex: search, 
                $options: 'i' 
            } }
      ];
    }
 
    const members = await TeamMember.find(query).sort({ 
        order: 1, 
        createdAt: 1 
    });
    res.json({ 
        success: true, 
        count: members.length, 
        data: members 
    });
  } catch (err) {
    res.status(500).json({ 
        success: false, 
        error: err.message 
});
  }
});
 
router.get('/:id', async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) return res.status(404).json({ 
        success: false, 
        error: 'Member not found' 
    });
    res.json({ 
        success: true, 
        data: member 
    });
  } catch (err) {
    res.status(500).json({ 
        success: false, 
        error: err.message 
    });
  }
});
 
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const { 
        name, 
        role, 
        bio, 
        linkedin, 
        github, 
        order 
    } = req.body;
 
    const memberData = { 
        name, 
        role, 
        bio, 
        linkedin, 
        github, 
        order 
    };
 
      if (req.file) {
      memberData.img = getImgUrl(req, req.file.filename);
    }
 
    const member = await TeamMember.create(memberData);
    res.status(201).json({ 
        success: true, 
        data: member 
    });
  } catch (err) {
        if (req.file) deleteOldImage(getImgUrl(req, req.file.filename));
    res.status(400).json({ 
        success: false, 
        error: err.message 
    });
  }
});
 
router.put('/:id', protect, upload.single('image'), async (req, res) => {
  try {
    const existing = await TeamMember.findById(req.params.id);
    if (!existing) return res.status(404).json({ 
        success: false, 
        error: 'Member not found' 
    });
 
    const { 
        name, 
        role, 
        bio, 
        linkedin, 
        github, 
        order 
    } = req.body;
    const updateData = { 
        name,
        role, 
        bio, 
        linkedin, 
        github, 
        order 
    };
 
      if (req.file) {
      deleteOldImage(existing.img);
      updateData.img = getImgUrl(req, req.file.filename);
    }
 
    const member = await TeamMember.findByIdAndUpdate(
      req.params.id,
      updateData,
      { 
          new: true, 
          runValidators: true 
      }
    );
 
    res.json({ 
        success: true, 
        data: member 
    });
  } catch (err) {
    res.status(400).json({ 
        success: false, 
        error: err.message 
    });
  }
});
 
router.delete('/:id', protect, async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ 
        success: false, 
        error: 'Member not found' 
      });
 
      deleteOldImage(member.img);
 
    res.json({ 
        success: true, 
        message: `${member.name} deleted successfully` 
    });
  } catch (err) {
    res.status(500).json({ 
        success: false, 
        error: err.message 
    });
  }
});
 
module.exports = router;
