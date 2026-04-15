const express = require('express');
const router  = express.Router();
const Slide   = require('../models/Slide');
const protect = require('../middleware/auth');
const upload  = require('../middleware/upload');
const path    = require('path');
const fs      = require('fs');
 
const getImgUrl = (req, filename) =>
  `${req.protocol}://${req.get('host')}/uploads/${filename}`;
 
const deleteOldImage = (imgUrl) => {
  if (!imgUrl || !imgUrl.includes('/uploads/')) return;
  const filepath = path.join(__dirname, '../uploads', path.basename(imgUrl));
  if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
};
 
router.get('/', async (req, res) => {
  try {
    const slides = await Slide.find().sort({ 
     order: 1, 
     createdAt: 1 
    });
    res.json({ 
     success: true, 
     count: slides.length,
     data: slides 
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
    const slide = await Slide.findById(req.params.id);
    if (!slide) return res.status(404).json({ 
     success: false,
     error: 'Slide not found' 
    });
    res.json({ 
     success: true, 
     data: slide 
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
    const data = { ...req.body };
    if (req.file) data.img = getImgUrl(req, req.file.filename);
    const slide = await Slide.create(data);
    res.status(201).json({ success: true, data: slide });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});
 
// PUT update slide (protected)
router.put('/:id', protect, upload.single('image'), async (req, res) => {
  try {
    const existing = await Slide.findById(req.params.id);
    if (!existing) return res.status(404).json({ 
     success: false, 
     error: 'Slide not found' 
    });
   
    const data = { ...req.body };
    if (req.file) {
      deleteOldImage(existing.img);
      data.img = getImgUrl(req, req.file.filename);
    }
   
    const slide = await Slide.findByIdAndUpdate(req.params.id, data, { 
     new: true 
    });
    res.json({ 
     success: true, 
     data: slide 
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
    const slide = await Slide.findByIdAndDelete(req.params.id);
    if (!slide) return res.status(404).json({
     success: false, 
     error: 'Slide not found' 
    });
   
    deleteOldImage(slide.img);
   
   res.json({ 
     success: true, 
     message: 'Slide deleted' 
    });
  } catch (err) {
    res.status(500).json({ 
     success: false, 
     error: err.message 
    });
  }
});
 
module.exports = router;
