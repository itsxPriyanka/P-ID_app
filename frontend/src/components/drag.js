// src/components/DraggableIcon.js
import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableIcon = ({ type, icon }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ICON', // Type for drag-and-drop
    item: { type }, // Item data to be passed to drop target
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(), // Monitor dragging state
    }),
  }));

  // Handle click event to alert the type of icon clicked
  const handleClick = () => {
    alert(`You clicked on ${type}`);
  };

  return (
    <div
      ref={drag} // Attach the drag ref
      onClick={handleClick} // Handle click events
      aria-label={type} // Accessibility label
      role="button" // Role for accessibility
      tabIndex={0} // Make it focusable
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleClick(); // Handle keyboard activation
      }}
      className="draggable-icon"
      style={{
        opacity: isDragging ? 0.5 : 1, // Change opacity when dragging
      }}
    >
      {React.cloneElement(icon, { className: 'sidebar-icon' })} {/* Clone the icon with class */}
      <div className="icon-label">{type}</div> {/* Label for the icon */}
    </div>
  );
};

export default DraggableIcon;
























