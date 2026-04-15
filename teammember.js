const mongoose = require('mongoose');
 
const teamMemberSchema = new mongoose.Schema({
  name: { 
      type: String, 
      required: [true,'Name is required'], 
      trim: true
  },
  role: { 
      type: String, 
      required: [true, 'Role is required'], 
      enum: ['Developer','Designer','Manager','DevOps'] 
  },
  bio: { 
      type: String, 
      default: '', 
      trim: true 
  },
  img: { 
      type: String, 
      default: '' 
  },
  linkedin: { 
      type: String, 
      default: '' 
  },
  github: { 
      type: String, 
      default: '' 
  },
  order: { 
      type: Number, 
      default: 0 
  }
}, 
{ 
    timestamps: true 
});
 
module.exports = mongoose.model('TeamMember', teamMemberSchema);
 
