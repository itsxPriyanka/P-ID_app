// src/components/Sidebar.js
import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import DraggableIcon from './drag'; // Ensure correct import of DraggableIcon

import { ReactComponent as Actuator } from '../assets/Actuator.svg';
import { ReactComponent as Crushing } from '../assets/Crushing.svg';
// import { ReactComponent as Dryer } from '../assets/Dryer.svg';
import { ReactComponent as ElectricMotor } from '../assets/Electric_motor.svg';
import { ReactComponent as Pump } from '../assets/Pump.svg';
import { ReactComponent as Turbine } from '../assets/Turbine.svg';
import { ReactComponent as LineH } from '../assets/line-h1.svg';
import { ReactComponent as LineV } from '../assets/line-v.svg';



import './sidebar.css';

const Sidebar = ({ diagrams = [], onSelectDiagram }) => {
  const [selectedDiagramId, setSelectedDiagramId] = useState(null); // State to track selected diagram

  const icons = [
    { type: 'Actuator', icon: <Actuator className="sidebar-svg-icon" /> },
    { type: 'Crushing', icon: <Crushing className="sidebar-svg-icon" /> },
    // { type: 'Dryer', icon: <Dryer className="sidebar-svg-icon" /> },
    { type: 'ElectricMotor', icon: <ElectricMotor className="sidebar-svg-icon" /> },
    { type: 'Pump', icon: <Pump className="sidebar-svg-icon" /> },
    { type: 'Turbine', icon: <Turbine className="sidebar-svg-icon" /> },
    { type: 'line-h', icon: <LineH className="sidebar-svg-icon" /> },
    { type: 'line-v', icon: <LineV className="sidebar-svg-icon" /> },

  ];

  const handleDiagramClick = (diagram) => {
    setSelectedDiagramId(diagram._id); // Update the selected diagram ID
    onSelectDiagram(diagram); // Trigger onSelectDiagram callback
  };

  return (
    <div className="sidebar">
      <h3>Icons</h3>
      {icons.map((icon) => (
        <DraggableIcon key={icon.type} type={icon.type} icon={icon.icon} />
      ))}

      <h3>Saved Diagrams</h3>
      {diagrams.length > 0 ? (
        <ul className="diagram-list">
          {diagrams.map((diagram) => (
            <li
              key={diagram._id}
              className={`diagram-item ${selectedDiagramId === diagram._id ? 'selected' : ''}`} // Conditional class for highlighting
              onClick={() => handleDiagramClick(diagram)}
            >
              <span className="diagram-name">{diagram.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-diagrams-message">No diagrams saved.</p>
      )}
    </div>
  );
};

// PropTypes for prop validation
Sidebar.propTypes = {
  diagrams: PropTypes.array, // Expect diagrams to be an array
  onSelectDiagram: PropTypes.func.isRequired, // Expect onSelectDiagram to be a function
};

export default Sidebar;
