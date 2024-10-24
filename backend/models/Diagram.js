const mongoose = require('mongoose');

const DiagramSchema = new mongoose.Schema({
  name: { type: String, required: true },
  elements: [
    {
      id: { type: String, required: true }, // or type: Number
      type: { type: String, required: true },
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
  ],
});

const Diagram = mongoose.model('Diagram', DiagramSchema);
module.exports = Diagram;
