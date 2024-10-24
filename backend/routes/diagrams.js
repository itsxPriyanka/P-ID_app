const express = require('express');
const Diagram = require('../models/Diagram');
const router = express.Router();

// Create a new diagram
router.post('/createDiagram', async (req, res) => {
  try {
    const { name, elements } = req.body;
    const newDiagram = new Diagram({ name, elements });
    const savedDiagram = await newDiagram.save();
    res.status(201).json(savedDiagram);
  } catch (error) {
    res.status(500).json({ message: 'Error creating diagram', error });
  }
});

// Get all diagrams
router.get('/getDiagram', async (req, res) => {
  try {
    const diagrams = await Diagram.find();
    res.status(200).json(diagrams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching diagrams', error });
  }
});

// Get a single diagram by ID
router.get('/:id', async (req, res) => {
  try {
    const diagram = await Diagram.findById(req.params.id);
    if (!diagram) {
      return res.status(404).json({ message: 'Diagram not found' });
    }
    res.status(200).json(diagram);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching diagram', error });
  }
});

// Update a diagram
router.delete('/:id', async (req, res) => {
  try {
    const diagramId = req.params.id;
    console.log("Attempting to delete diagram with ID:", diagramId);

    const deletedDiagram = await Diagram.findByIdAndDelete(diagramId);
    if (!deletedDiagram) {
      return res.status(404).json({ message: 'Diagram not found' });
    }
    res.status(200).json({ message: 'Diagram deleted successfully' });
  } catch (error) {
    console.error("Error deleting diagram:", error); // Log the error for debugging
    res.status(500).json({ message: 'Error deleting diagram', error });
  }
});

// PUT route to update a diagram's elements
router.put('/:id', async (req, res) => {
  try {
    const diagramId = req.params.id;
    const { name, elements } = req.body;

    console.log(`Updating diagram ${diagramId} with elements:`, elements);

    const updatedDiagram = await Diagram.findByIdAndUpdate(
      diagramId,
      { name, elements },
      { new: true, runValidators: true }
    );

    if (!updatedDiagram) {
      return res.status(404).json({ message: 'Diagram not found' });
    }

    res.status(200).json({ message: 'Diagram updated successfully', diagram: updatedDiagram });
  } catch (error) {
    console.error("Error updating diagram:", error);
    res.status(500).json({ message: 'Error updating diagram', error });
  }
});


module.exports = router;



