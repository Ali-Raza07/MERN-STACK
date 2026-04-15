const mongoose = require('mongoose');
 
const slideSchema = new mongoose.Schema({
  tag: { 
      type: String, 
      required: true 
  },
  title: { 
      type: String, 
      required: true 
  },
  desc: { 
      type: String, 
      required: true 
  },
  cta: { 
      type: String, 
      default: 'View Project' 
  },
  img: { 
      type: String, 
      required: true 
},
  link: { 
      type: String, 
      default: '#' 
},
  color: { 
      type: String, 
      default: '#c8f55a' 
  },
  order: { 
      type: Number, default: 0 
         }
}, { 
    timestamps: true 
   });
 
module.exports = mongoose.model('Slide', slideSchema);
 
