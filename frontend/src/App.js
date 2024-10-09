// src/App.js
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from './components/sidebar'; // Ensure the import matches the filename (Sidebar.js)
import Editor from './components/editor'; // Ensure the import matches the filename (Editor.js)
import { ResizableBox } from 'react-resizable';
import './App.css'; // Import all styles, including react-resizable styles

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        
        <Editor />
      </div>
    </DndProvider>
  );
};

export default App;
