
// // import React, { useState, useRef, useEffect } from 'react';
// // import { useDrop } from 'react-dnd';
// // import { ReactComponent as Actuator } from '../assets/Actuator.svg';
// // import { ReactComponent as Crushing } from '../assets/Crushing.svg';
// // import { ReactComponent as ElectricMotor } from '../assets/Electric_motor.svg';
// // import { ReactComponent as Pump } from '../assets/Pump.svg';
// // import { ReactComponent as Turbine } from '../assets/Turbine.svg';
// // import { ReactComponent as LineH } from '../assets/line-h1.svg';
// // import { ReactComponent as LineV } from '../assets/line-v.svg';
// // import axios from 'axios';

// // import './editor.css';
// // import Sidebar from './sidebar';

// // const ICON_SIZE = 40;
// // const GRID_SIZE = 20;
// // const ROTATION_HANDLE_SIZE = 10;

// // const Editor = () => {
// //   const [elements, setElements] = useState([]);
// //   const [diagramName, setDiagramName] = useState('');
// //   const editorRef = useRef(null);
// //   const [diagrams, setDiagrams] = useState([]);

// //   const [selectedDiagramId, setSelectedDiagramId] = useState(null);
// //   const [isRotating, setIsRotating] = useState(false);

// //   const [, drop] = useDrop({
// //     accept: 'ICON',
// //     drop: (item, monitor) => {
// //       const offset = monitor.getClientOffset();
// //       if (editorRef.current) {
// //         const editorRect = editorRef.current.getBoundingClientRect();
// //         const left = offset.x - editorRect.left - ICON_SIZE / 2;
// //         const top = offset.y - editorRect.top - ICON_SIZE / 2;

// //         const constrainedLeft = Math.max(0, Math.min(left, editorRect.width - ICON_SIZE));
// //         const constrainedTop = Math.max(0, Math.min(top, editorRect.height - ICON_SIZE));

// //         const snappedLeft = Math.round(constrainedLeft / GRID_SIZE) * GRID_SIZE;
// //         const snappedTop = Math.round(constrainedTop / GRID_SIZE) * GRID_SIZE;

// //         const newElement = {
// //           id: Date.now(),
// //           type: item.type,
// //           x: snappedLeft,
// //           y: snappedTop,
// //           rotation: 0,
// //         };
// //         setElements((prev) => [...prev, newElement]);
// //       }
// //     },
// //   });

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (editorRef.current && !editorRef.current.contains(event.target)) {
// //         setSelectedDiagramId(null);
// //       }
// //     };

// //     document.addEventListener('mousedown', handleClickOutside);
// //     return () => {
// //       document.removeEventListener('mousedown', handleClickOutside);
// //     };
// //   }, []);

// //   const renderIcon = (type) => {
// //     switch (type) {
// //       case 'Actuator':
// //         return <Actuator className="editor-svg-icon" />;
// //       case 'Crushing':
// //         return <Crushing className="editor-svg-icon" />;
// //       case 'ElectricMotor':
// //         return <ElectricMotor className="editor-svg-icon" />;
// //       case 'Pump':
// //         return <Pump className="editor-svg-icon" />;
// //       case 'Turbine':
// //         return <Turbine className="editor-svg-icon" />;
// //       case 'line-h':
// //         return <LineH className="editor-svg-icon" />;
// //       case 'line-v':
// //         return <LineV className="editor-svg-icon" />;
// //       default:
// //         return null;
// //     }
// //   };




// //   const handleElementClick = (e, id) => {
// //     e.stopPropagation();
// //     setSelectedDiagramId(id);
// //   };

// //   const handleMouseDown = (e, id, isRotationHandle = false) => {
// //     e.stopPropagation();
// //     const element = document.getElementById(id);
// //     const elementRect = element.getBoundingClientRect();

// //     if (isRotationHandle) {
// //       const elementCenterX = elementRect.left + elementRect.width / 2;
// //       const elementCenterY = elementRect.top + elementRect.height / 2;

// //       const handleMouseMove = (e) => {
// //         const deltaX = e.clientX - elementCenterX;
// //         const deltaY = e.clientY - elementCenterY;
// //         const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

// //         setElements((prevElements) =>
// //           prevElements.map((el) =>
// //             el.id === id ? { ...el, rotation: angle } : el
// //           )
// //         );
// //       };

// //       const handleMouseUp = () => {
// //         document.removeEventListener('mousemove', handleMouseMove);
// //         document.removeEventListener('mouseup', handleMouseUp);
// //         setIsRotating(false);
// //       };

// //       setIsRotating(true);
// //       document.addEventListener('mousemove', handleMouseMove);
// //       document.addEventListener('mouseup', handleMouseUp);
// //     } else {
// //       const offsetX = e.clientX - elementRect.left;
// //       const offsetY = e.clientY - elementRect.top;

// //       const handleMouseMove = (e) => {
// //         const newX = e.clientX - offsetX - editorRef.current.offsetLeft;
// //         const newY = e.clientY - offsetY - editorRef.current.offsetTop;

// //         setElements((prevElements) =>
// //           prevElements.map((el) =>
// //             el.id === id
// //               ? {
// //                 ...el,
// //                 x: Math.max(0, Math.min(newX, editorRef.current.offsetWidth - ICON_SIZE)),
// //                 y: Math.max(0, Math.min(newY, editorRef.current.offsetHeight - ICON_SIZE)),
// //               }
// //               : el
// //           )
// //         );
// //       };

// //       const handleMouseUp = () => {
// //         document.removeEventListener('mousemove', handleMouseMove);
// //         document.removeEventListener('mouseup', handleMouseUp);
// //       };

// //       document.addEventListener('mousemove', handleMouseMove);
// //       document.addEventListener('mouseup', handleMouseUp);
// //     }
// //   };

// //   const saveDiagram = async () => {
// //     try {
// //       const diagramData = {
// //         name: diagramName,
// //         elements: elements.map((el) => ({
// //           id: el.id.toString(),
// //           type: el.type,
// //           x: el.x,
// //           y: el.y,
// //           rotation: el.rotation, // Include rotation in saved data
// //         })),
// //       };

// //       const response = await axios.post('http://localhost:5000/api/diagrams/createDiagram', diagramData);
// //       fetchDiagrams();
// //     } catch (error) {
// //       console.error('Error saving diagram:', error);
// //     }
// //   };


// //   const fetchDiagrams = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:5000/api/diagrams/getDiagram');
// //       setDiagrams(response.data);
// //       if (response.data.length > 0) {
// //         setSelectedDiagramId(response.data[0]._id);
// //         setElements(response.data[0].elements);
// //         setDiagramName(response.data[0].name);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching diagrams:', error);
// //     }
// //   };

// //   const handleSelectDiagram = (diagram) => {
// //     setSelectedDiagramId(diagram._id);
// //     setElements(diagram.elements);
// //     setDiagramName(diagram.name);
// //   };

// //   const createNewDiagram = () => {
// //     setElements([]);
// //     setDiagramName('New Diagram');
// //     setSelectedDiagramId(null);
// //   };

// //   useEffect(() => {
// //     fetchDiagrams();
// //   }, []);


// //   return (
// //     <div className="editor-container">
// //       <input
// //         type="text"
// //         value={diagramName}
// //         onChange={(e) => setDiagramName(e.target.value)}
// //         placeholder="Diagram Name"
// //       />
// //       <div className="btn-container">
// //         <button className="save-btn" onClick={saveDiagram}>Save Diagram</button>
// //         <button className="new-diagram-button" onClick={createNewDiagram}> New Diagram </button>

// //       </div>
// //       <div className="editor-layout">
// //         <div className="sidebar-layout">
// //           <Sidebar diagrams={diagrams} onSelectDiagram={handleSelectDiagram} />
// //         </div>
// //         <div
// //           ref={(node) => { drop(node); editorRef.current = node; }}
// //           className="editor"
// //           onClick={() => setSelectedDiagramId(null)}
// //         >
// //           {elements.map((element) => (
// //             <div
// //               key={element.id}
// //               id={element.id}
// //               className={`editor-element ${selectedDiagramId === element.id ? 'selected' : ''}`}
// //               style={{
// //                 left: element.x,
// //                 top: element.y,
// //                 position: 'absolute',
// //                 cursor: isRotating ? 'grabbing' : 'move',
// //                 transform: `rotate(${element.rotation}deg)`,
// //               }}
// //               onClick={(e) => handleElementClick(e, element.id)}
// //               onMouseDown={(e) => handleMouseDown(e, element.id)}
// //             >
// //               {renderIcon(element.type)}
// //               {selectedDiagramId === element.id && (
// //                 <div
// //                   className="rotation-handle"
// //                   style={{
// //                     position: 'absolute',
// //                     top: -ROTATION_HANDLE_SIZE - 5,
// //                     left: '50%',
// //                     width: ROTATION_HANDLE_SIZE,
// //                     height: ROTATION_HANDLE_SIZE,
// //                     marginLeft: -ROTATION_HANDLE_SIZE / 2,
// //                     background: '#4CAF50',
// //                     borderRadius: '50%',
// //                     cursor: 'grab',
// //                     zIndex: 2,
// //                   }}
// //                   onMouseDown={(e) => handleMouseDown(e, element.id, true)}
// //                 />
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Editor;


























// import React, { useState, useRef, useEffect } from 'react';
// import { useDrop } from 'react-dnd';
// import { ReactComponent as Actuator } from '../assets/Actuator.svg';
// import { ReactComponent as Crushing } from '../assets/Crushing.svg';
// import { ReactComponent as ElectricMotor } from '../assets/Electric_motor.svg';
// import { ReactComponent as Pump } from '../assets/Pump.svg';
// import { ReactComponent as Turbine } from '../assets/Turbine.svg';
// import { ReactComponent as LineH } from '../assets/line-h1.svg';
// import { ReactComponent as LineV } from '../assets/line-v.svg';
// import axios from 'axios';

// import './editor.css';
// import Sidebar from './sidebar';

// const ICON_SIZE = 40;
// const GRID_SIZE = 20;
// const ROTATION_HANDLE_SIZE = 10;

// const Editor = () => {
//   const [elements, setElements] = useState([]);
//   const [diagramName, setDiagramName] = useState('');
//   const editorRef = useRef(null);
//   const [diagrams, setDiagrams] = useState([]);

//   const [selectedDiagramId, setSelectedDiagramId] = useState(null);
//   const [isRotating, setIsRotating] = useState(false);

//   const [showProperties, setShowProperties] = useState(false);
//   const [propertiesElementId, setPropertiesElementId] = useState(null);
//   const [propertiesPosition, setPropertiesPosition] = useState({ x: 0, y: 0 });

//   const [, drop] = useDrop({
//     accept: 'ICON',
//     drop: (item, monitor) => {
//       const offset = monitor.getClientOffset();
//       if (editorRef.current) {
//         const editorRect = editorRef.current.getBoundingClientRect();
//         const left = offset.x - editorRect.left - ICON_SIZE / 2;
//         const top = offset.y - editorRect.top - ICON_SIZE / 2;

//         const constrainedLeft = Math.max(0, Math.min(left, editorRect.width - ICON_SIZE));
//         const constrainedTop = Math.max(0, Math.min(top, editorRect.height - ICON_SIZE));

//         const snappedLeft = Math.round(constrainedLeft / GRID_SIZE) * GRID_SIZE;
//         const snappedTop = Math.round(constrainedTop / GRID_SIZE) * GRID_SIZE;

//         const newElement = {
//           id: Date.now(),
//           type: item.type,
//           x: snappedLeft,
//           y: snappedTop,
//           rotation: 0,
//         };
//         setElements((prev) => [...prev, newElement]);
//       }
//     },
//   });

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (editorRef.current && !editorRef.current.contains(event.target)) {
//         setSelectedDiagramId(null);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const renderIcon = (type) => {
//     switch (type) {
//       case 'Actuator':
//         return <Actuator className="editor-svg-icon" />;
//       case 'Crushing':
//         return <Crushing className="editor-svg-icon" />;
//       case 'ElectricMotor':
//         return <ElectricMotor className="editor-svg-icon" />;
//       case 'Pump':
//         return <Pump className="editor-svg-icon" />;
//       case 'Turbine':
//         return <Turbine className="editor-svg-icon" />;
//       case 'line-h':
//         return <LineH className="editor-svg-icon" />;
//       case 'line-v':
//         return <LineV className="editor-svg-icon" />;
//       default:
//         return null;
//     }
//   };

//   const handleElementClick = (e, id) => {
//     e.stopPropagation();
//     setSelectedDiagramId(id);
//   };

//   const handleMouseDown = (e, id, isRotationHandle = false) => {
//     e.stopPropagation();
//     const element = document.getElementById(id);
//     const elementRect = element.getBoundingClientRect();

//     if (isRotationHandle) {
//       const elementCenterX = elementRect.left + elementRect.width / 2;
//       const elementCenterY = elementRect.top + elementRect.height / 2;

//       const handleMouseMove = (e) => {
//         const deltaX = e.clientX - elementCenterX;
//         const deltaY = e.clientY - elementCenterY;
//         const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

//         setElements((prevElements) =>
//           prevElements.map((el) =>
//             el.id === id ? { ...el, rotation: angle } : el
//           )
//         );
//       };

//       const handleMouseUp = () => {
//         document.removeEventListener('mousemove', handleMouseMove);
//         document.removeEventListener('mouseup', handleMouseUp);
//         setIsRotating(false);
//       };

//       setIsRotating(true);
//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//     } else {
//       const offsetX = e.clientX - elementRect.left;
//       const offsetY = e.clientY - elementRect.top;

//       const handleMouseMove = (e) => {
//         const newX = e.clientX - offsetX - editorRef.current.offsetLeft;
//         const newY = e.clientY - offsetY - editorRef.current.offsetTop;

//         setElements((prevElements) =>
//           prevElements.map((el) =>
//             el.id === id
//               ? {
//                 ...el,
//                 x: Math.max(0, Math.min(newX, editorRef.current.offsetWidth - ICON_SIZE)),
//                 y: Math.max(0, Math.min(newY, editorRef.current.offsetHeight - ICON_SIZE)),
//               }
//               : el
//           )
//         );
//       };

//       const handleMouseUp = () => {
//         document.removeEventListener('mousemove', handleMouseMove);
//         document.removeEventListener('mouseup', handleMouseUp);
//       };

//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//     }
//   };

//   const handleContextMenu = (e, id) => {
//     e.preventDefault();
//     setShowProperties(true);
//     setPropertiesElementId(id);
//     setPropertiesPosition({ x: e.clientX, y: e.clientY });
//   };

//   const handlePropertiesClose = () => {
//     setShowProperties(false);
//   };

//   const saveDiagram = async () => {
//     try {
//       const diagramData = {
//         name: diagramName,
//         elements: elements.map((el) => ({
//           id: el.id.toString(),
//           type: el.type,
//           x: el.x,
//           y: el.y,
//           rotation: el.rotation, // Include rotation in saved data
//         })),
//       };

//       const response = await axios.post('http://localhost:5000/api/diagrams/createDiagram', diagramData);
//       fetchDiagrams();
//     } catch (error) {
//       console.error('Error saving diagram:', error);
//     }
//   };

//   const fetchDiagrams = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/diagrams/getDiagram');
//       setDiagrams(response.data);
//       if (response.data.length > 0) {
//         setSelectedDiagramId(response.data[0]._id);
//         setElements(response.data[0].elements);
//         setDiagramName(response.data[0].name);
//       }
//     } catch (error) {
//       console.error('Error fetching diagrams:', error);
//     }
//   };

//   const handleSelectDiagram = (diagram) => {
//     setSelectedDiagramId(diagram._id);
//     setElements(diagram.elements);
//     setDiagramName(diagram.name);
//   };

//   const createNewDiagram = () => {
//     setElements([]);
//     setDiagramName('');
//     setSelectedDiagramId(null);
//   };

//   useEffect(() => {
//     fetchDiagrams();
//   }, []);

//   return (
//     <div className="editor-container">
//       <input
//         type="text"
//         value={diagramName}
//         onChange={(e) => setDiagramName(e.target.value)}
//         placeholder="Diagram Name"
//       />
//       <div className="btn-container">
//         <button className="save-btn" onClick={saveDiagram}>Save Diagram</button>
//         <button className="new-diagram-button" onClick={createNewDiagram}> New Diagram </button>

//       </div>
//       <div className="editor-layout">
//         <div className="sidebar-layout">
//           <Sidebar diagrams={diagrams} onSelectDiagram={handleSelectDiagram} />
//         </div>
//         <div
//           ref={(node) => { drop(node); editorRef.current = node; }}
//           className="editor"
//           onClick={() => setSelectedDiagramId(null)}
//         >
//           {elements.map((element) => (
//             <div
//               key={element.id}
//               id={element.id}
//               className={`editor-element ${selectedDiagramId === element.id ? 'selected' : ''}`}
//               style={{
//                 left: element.x,
//                 top: element.y,
//                 position: 'absolute',
//                 cursor: isRotating ? 'grabbing' : 'move',
//                 transform: `rotate(${element.rotation}deg)`,
//               }}
//               onClick={(e) => handleElementClick(e, element.id)}
//               onMouseDown={(e) => handleMouseDown(e, element.id)}
//               onContextMenu={(e) => handleContextMenu(e, element.id)}
//             >
//               {renderIcon(element.type)}
//               {selectedDiagramId === element.id && (
//                 <div
//                   className="rotation-handle"
//                   style={{
//                     position: 'absolute',
//                     top: -ROTATION_HANDLE_SIZE - 5,
//                     left: '50%',
//                     width: ROTATION_HANDLE_SIZE,
//                     height: ROTATION_HANDLE_SIZE,
//                     marginLeft: -ROTATION_HANDLE_SIZE / 2,
//                     background: '#4CAF50',
//                     borderRadius: '50%',
//                     cursor: 'grab',
//                     zIndex: 2,
//                   }}
//                   onMouseDown={(e) => handleMouseDown(e, element.id, true)}
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       </div >
//       {showProperties && (
//         <div
//           className="properties-box"
//           style={{
//             position: 'absolute',
//             top: propertiesPosition.y,
//             left: propertiesPosition.x + 100,
//           }}
//         >
//           <h2>Properties</h2>
//           <ul>
          
//             <li>
//               <label>Type:</label>
//               <input type="text" value={elements.find((el) => el.id === propertiesElementId).type} readOnly />
//             </li>
//             <li>
//               <label>X:</label>
//               <input type="number" value={elements.find((el) => el.id === propertiesElementId).x} readOnly />
//             </li>
//             <li>
//               <label>Y:</label>
//               <input type="number" value={elements.find((el) => el.id === propertiesElementId).y} readOnly />
//             </li>
//             <li>
//               <label>Rotation:</label>
//               <input type="number" value={elements.find((el) => el.id === propertiesElementId).rotation} readOnly />
//             </li>
//           </ul>
//           <button onClick={handlePropertiesClose}>Close</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Editor;





























// import React, { useState, useRef, useEffect } from 'react';
// import { useDrop } from 'react-dnd';
// import { ReactComponent as Actuator } from '../assets/Actuator.svg';
// import { ReactComponent as Crushing } from '../assets/Crushing.svg';
// import { ReactComponent as ElectricMotor } from '../assets/Electric_motor.svg';
// import { ReactComponent as Pump } from '../assets/Pump.svg';
// import { ReactComponent as Turbine } from '../assets/Turbine.svg';
// import { ReactComponent as LineH } from '../assets/line-h1.svg';
// import { ReactComponent as LineV } from '../assets/line-v.svg';
// import axios from 'axios';

// import './editor.css';
// import Sidebar from './sidebar';

// const ICON_SIZE = 40;
// const GRID_SIZE = 20;
// const ROTATION_HANDLE_SIZE = 10;

// const Editor = () => {
//   const [elements, setElements] = useState([]);
//   const [diagramName, setDiagramName] = useState('');
//   const editorRef = useRef(null);
//   const [diagrams, setDiagrams] = useState([]);

//   const [selectedDiagramId, setSelectedDiagramId] = useState(null);
//   const [isRotating, setIsRotating] = useState(false);

//   const [showProperties, setShowProperties] = useState(false);
//   const [propertiesElementId, setPropertiesElementId] = useState(null);
//   const [propertiesPosition, setPropertiesPosition] = useState({ x: 0, y: 0 });
//   const [properties, setProperties] = useState({
//     type: '',
//     x: 0,
//     y: 0,
//     rotation: 0,
//   });

//   const [, drop] = useDrop({
//     accept: 'ICON',
//     drop: (item, monitor) => {
//       const offset = monitor.getClientOffset();
//       if (editorRef.current) {
//         const editorRect = editorRef.current.getBoundingClientRect();
//         const left = offset.x - editorRect.left - ICON_SIZE / 2;
//         const top = offset.y - editorRect.top - ICON_SIZE / 2;

//         const constrainedLeft = Math.max(0, Math.min(left, editorRect.width - ICON_SIZE));
//         const constrainedTop = Math.max(0, Math.min(top, editorRect.height - ICON_SIZE));

//         const snappedLeft = Math.round(constrainedLeft / GRID_SIZE) * GRID_SIZE;
//         const snappedTop = Math.round(constrainedTop / GRID_SIZE) * GRID_SIZE;

//         const newElement = {
//           id: Date.now(),
//           type: item.type,
//           x: snappedLeft,
//           y: snappedTop,
//           rotation: 0,
//         };
//         setElements((prev) => [...prev, newElement]);
//       }
//     },
//   });

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (editorRef.current && !editorRef.current.contains(event.target)) {
//         setSelectedDiagramId(null);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const renderIcon = (type) => {
//     switch (type) {
//       case 'Actuator':
//         return <Actuator className="editor-svg-icon" />;
//       case 'Crushing':
//         return <Crushing className="editor-svg-icon" />;
//       case 'ElectricMotor':
//         return <ElectricMotor className="editor-svg-icon" />;
//       case 'Pump':
//         return <Pump className="editor-svg-icon" />;
//       case 'Turbine':
//         return <Turbine className="editor-svg-icon" />;
//       case 'line-h':
//         return <LineH className="editor-svg-icon" />;
//       case 'line-v':
//         return <LineV className="editor-svg-icon" />;
//       default:
//         return null;
//     }
//   };

//   const handleElementClick = (e, id) => {
//     e.stopPropagation();
//     setSelectedDiagramId(id);
//   };

//   const handleMouseDown = (e, id, isRotationHandle = false) => {
//     e.stopPropagation();
//     const element = document.getElementById(id);
//     const elementRect = element.getBoundingClientRect();

//     if (isRotationHandle) {
//       const elementCenterX = elementRect.left + elementRect.width / 2;
//       const elementCenterY = elementRect.top + elementRect.height / 2;

//       const handleMouseMove = (e) => {
//         const deltaX = e.clientX - elementCenterX;
//         const deltaY = e.clientY - elementCenterY;
//         const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

//         setElements((prevElements) =>
//           prevElements.map((el) =>
//             el.id === id ? { ...el, rotation: angle } : el
//           )
//         );
//       };

//       const handleMouseUp = () => {
//         document.removeEventListener('mousemove', handleMouseMove);
//         document.removeEventListener(' mouseup', handleMouseUp);
//         setIsRotating(false);
//       };

//       setIsRotating(true);
//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//     } else {
//       const offsetX = e.clientX - elementRect.left;
//       const offsetY = e.clientY - elementRect.top;

//       const handleMouseMove = (e) => {
//         const newX = e.clientX - offsetX - editorRef.current.offsetLeft;
//         const newY = e.clientY - offsetY - editorRef.current.offsetTop;

//         setElements((prevElements) =>
//           prevElements.map((el) =>
//             el.id === id
//               ? {
//                 ...el,
//                 x: Math.max(0, Math.min(newX, editorRef.current.offsetWidth - ICON_SIZE)),
//                 y: Math.max(0, Math.min(newY, editorRef.current.offsetHeight - ICON_SIZE)),
//               }
//               : el
//           )
//         );
//       };

//       const handleMouseUp = () => {
//         document.removeEventListener('mousemove', handleMouseMove);
//         document.removeEventListener('mouseup', handleMouseUp);
//       };

//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//     }
//   };

//   const handleContextMenu = (e, id) => {
//     e.preventDefault();
//     setShowProperties(true);
//     setPropertiesElementId(id);
//     setPropertiesPosition({ x: e.clientX, y: e.clientY });
//     const element = elements.find((el) => el.id === id);
//     setProperties({
//       type: element.type,
//       x: element.x,
//       y: element.y,
//       rotation: element.rotation,
//     });
//   };

//   const handlePropertiesClose = () => {
//     setShowProperties(false);
//   };

//   const handlePropertiesChange = (e) => {
//     setProperties((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handlePropertiesSave = () => {
//     const element = elements.find((el) => el.id === propertiesElementId);
//     setElements((prev) =>
//       prev.map((el) =>
//         el.id === propertiesElementId
//           ? { ...el, ...properties }
//           : el
//       )
//     );
//     setShowProperties(false);
//   };

//   const saveDiagram = async () => {
//     try {
//       const diagramData = {
//         name: diagramName,
//         elements: elements.map((el) => ({
//           id: el.id.toString(),
//           type: el.type,
//           x: el.x,
//           y: el.y,
//           rotation: el.rotation, // Include rotation in saved data
//         })),
//       };

//       const response = await axios.post('http://localhost:5000/api/diagrams/createDiagram', diagramData);
//       fetchDiagrams();
//     } catch (error) {
//       console.error('Error saving diagram:', error);
//     }
//   };

//   const fetchDiagrams = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/diagrams/getDiagram');
//       setDiagrams(response.data);
//       if (response.data.length > 0) {
//         setSelectedDiagramId(response.data[0]._id);
//         setElements(response.data[0].elements);
//         setDiagramName(response.data[0].name);
//       }
//     } catch (error) {
//       console.error('Error fetching diagrams:', error);
//     }
//   };

//   const handleSelectDiagram = (diagram) => {
//     setSelectedDiagramId(diagram._id);
//     setElements(diagram.elements);
//     setDiagramName(diagram.name);
//   };

//   const createNewDiagram = () => {
//     setElements([]);
//     setDiagramName('');
//     setSelectedDiagramId(null);
//   };

//   useEffect(() => {
//     fetchDiagrams();
//   }, []);

//   return (
//     <div className="editor-container">
//       <input
//         type="text"
//         value={diagramName}
//         onChange={(e) => setDiagramName(e.target.value)}
//         placeholder="Diagram Name"
//       />
//       <div className="btn-container">
//         <button className="save-btn" onClick={saveDiagram}>Save Diagram</button>
//         <button className="new-diagram-button" onClick={createNewDiagram}> New Diagram </button>

//       </div>
//       <div className="editor-layout">
//         <div className="sidebar-layout">
//           <Sidebar diagrams={diagrams} onSelectDiagram={handleSelectDiagram} />
//         </div>
//         <div
//           ref={(node) => { drop(node); editorRef.current = node; }}
//           className="editor"
//           onClick={() => setSelectedDiagramId(null)}
//         >
//           {elements.map((element) => (
//             <div
//               key={element.id}
//               id={element.id}
//               className={`editor-element ${selectedDiagramId === element.id ? 'selected' : ''}`}
//               style={{
//                 left: element.x,
//                 top: element.y,
//                 position: 'absolute',
//                 cursor: isRotating ? 'grabbing' : 'move',
//                 transform: `rotate(${element.rotation}deg) `,
//               }}
//               onClick={(e) => handleElementClick(e, element.id)}
//               onMouseDown={(e) => handleMouseDown(e, element.id)}
//               onContextMenu={(e) => handleContextMenu(e, element.id)}
//             >
//               {renderIcon(element.type)}
//               {selectedDiagramId === element.id && (
//                 <div
//                   className="rotation-handle"
//                   style={{
//                     position: 'absolute',
//                     top: -ROTATION_HANDLE_SIZE - 5,
//                     left: '50%',
//                     width: ROTATION_HANDLE_SIZE,
//                     height: ROTATION_HANDLE_SIZE,
//                     marginLeft: -ROTATION_HANDLE_SIZE / 2,
//                     background: '#4CAF50',
//                     borderRadius: '50%',
//                     cursor: 'grab',
//                     zIndex: 2,
//                   }}
//                   onMouseDown={(e) => handleMouseDown(e, element.id, true)}
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//       {showProperties && (
//         <div
//           className="properties-box"
//           style={{
//             position: 'absolute',
//             top: propertiesPosition.y,
//             left: propertiesPosition.x + 100,
//           }}
//         >
//           <h2>Properties</h2>
//           <ul>
//             <li>
//               <label>Type:</label>
//               <input
//                 type="text"
//                 name="type"
//                 value={properties.type}
//                 onChange={handlePropertiesChange}
//               />
//             </li>
//             <li>
//               <label>X:</label>
//               <input
//                 type="number"
//                 name="x"
//                 value={properties.x}
//                 onChange={handlePropertiesChange}
//               />
//             </li>
//             <li>
//               <label>Y:</label>
//               <input
//                 type="number"
//                 name="y"
//                 value={properties.y}
//                 onChange={handlePropertiesChange}
//               />
//             </li>
//             <li>
//               <label>Rotation:</label>
//               <input
//                 type="number"
//                 name="rotation"
//                 value={properties.rotation}
//                 onChange={handlePropertiesChange}
//               />
//             </li>
//           </ul>
//           <button onClick={handlePropertiesSave}>Save</button>
//           <button onClick={handlePropertiesClose}>Close</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Editor;






























//og code



import React, { useState, useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { ReactComponent as Actuator } from '../assets/Actuator.svg';
import { ReactComponent as Crushing } from '../assets/Crushing.svg';
import { ReactComponent as ElectricMotor } from '../assets/Electric_motor.svg';
import { ReactComponent as Pump } from '../assets/Pump.svg';
import { ReactComponent as Turbine } from '../assets/Turbine.svg';
import { ReactComponent as LineH } from '../assets/line-h1.svg';
import { ReactComponent as LineV } from '../assets/line-v.svg';
import axios from 'axios';

import './editor.css';
import Sidebar from './sidebar';

const ICON_SIZE = 40;
const GRID_SIZE = 20;
const ROTATION_HANDLE_SIZE = 10;

const Editor = () => {
  const [elements, setElements] = useState([]);
  const [diagramName, setDiagramName] = useState('');
  const editorRef = useRef(null);
  const [diagrams, setDiagrams] = useState([]);

  const [selectedDiagramId, setSelectedDiagramId] = useState(null);
  const [isRotating, setIsRotating] = useState(false);

  const [showProperties, setShowProperties] = useState(false);
  const [propertiesElementId, setPropertiesElementId] = useState(null);
  const [propertiesPosition, setPropertiesPosition] = useState({ x: 0, y: 0 });
  const [properties, setProperties] = useState({
    type: '',
    x: 0,
    y: 0,
    rotation: 0,
  });

  const [, drop] = useDrop({
    accept: 'ICON',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      if (editorRef.current) {
        const editorRect = editorRef.current.getBoundingClientRect();
        const left = offset.x - editorRect.left - ICON_SIZE / 2;
        const top = offset.y - editorRect.top - ICON_SIZE / 2;

        const constrainedLeft = Math.max(0, Math.min(left, editorRect.width - ICON_SIZE));
        const constrainedTop = Math.max(0, Math.min(top, editorRect.height - ICON_SIZE));

        const snappedLeft = Math.round(constrainedLeft / GRID_SIZE) * GRID_SIZE;
        const snappedTop = Math.round(constrainedTop / GRID_SIZE) * GRID_SIZE;

        const newElement = {
          id: Date.now(),
          type: item.type,
          x: snappedLeft,
          y: snappedTop,
          rotation: 0,
        };
        setElements((prev) => [...prev, newElement]);
      }
    },
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editorRef.current && !editorRef.current.contains(event.target)) {
        setSelectedDiagramId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderIcon = (type) => {
    switch (type) {
      case 'Actuator':
        return <Actuator className="editor-svg-icon" />;
      case 'Crushing':
        return <Crushing className="editor-svg-icon" />;
      case 'ElectricMotor':
        return <ElectricMotor className="editor-svg-icon" />;
      case 'Pump':
        return <Pump className="editor-svg-icon" />;
      case 'Turbine':
        return <Turbine className="editor-svg-icon" />;
      case 'line-h':
        return <LineH className="editor-svg-icon" />;
      case 'line-v':
        return <LineV className="editor-svg-icon" />;
      default:
        return null;
    }
  };

  const handleElementClick = (e, id) => {
    e.stopPropagation();
    setSelectedDiagramId(id);
  };

  const handleMouseDown = (e, id, isRotationHandle = false) => {
    e.stopPropagation();
    const element = document.getElementById(id);
    const elementRect = element.getBoundingClientRect();

    if (isRotationHandle) {
      const elementCenterX = elementRect.left + elementRect.width / 2;
      const elementCenterY = elementRect.top + elementRect.height / 2;

      const handleMouseMove = (e) => {
        const deltaX = e.clientX - elementCenterX;
        const deltaY = e.clientY - elementCenterY;
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

        setElements((prevElements) =>
          prevElements.map((el) =>
            el.id === id ? { ...el, rotation: angle } : el
          )
        );
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        setIsRotating(false);
      };

      setIsRotating(true);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      const offsetX = e.clientX - elementRect.left;
      const offsetY = e.clientY - elementRect.top;

      const handleMouseMove = (e) => {
        const newX = e.clientX - offsetX - editorRef.current.offsetLeft;
        const newY = e.clientY - offsetY - editorRef.current.offsetTop;

        setElements((prevElements) =>
          prevElements.map((el) =>
            el.id === id
              ? {
                  ...el,
                  x: Math.max(0, Math.min(newX, editorRef.current.offsetWidth - ICON_SIZE)),
                  y: Math.max(0, Math.min(newY, editorRef.current.offsetHeight - ICON_SIZE)),
                }
              : el
          )
        );
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  const handleContextMenu = (e, id) => {
    e.preventDefault();
    setShowProperties(true);
    setPropertiesElementId(id);
    setPropertiesPosition({ x: e.clientX, y: e.clientY });
    const element = elements.find((el) => el.id === id);
    setProperties({
      type: element.type,
      x: element.x,
      y: element.y,
      rotation: element.rotation,
    });
  };

  const handlePropertiesClose = () => {
    setShowProperties(false);
  };

  const handlePropertiesChange = (e) => {
    const { name, value } = e.target;
    setProperties((prev) => ({
      ...prev,
      [name]: name === 'type' ? value : parseFloat(value),
    }));
  };

  const handlePropertiesSave = () => {
    const element = elements.find((el) => el.id === propertiesElementId);
    setElements((prev) =>
      prev.map((el) =>
        el.id === propertiesElementId
          ? { ...el, ...properties }
          : el
      )
    );
    setShowProperties(false);
  };

  const handleDeleteElement = (id) => {
    setElements((prevElements) => prevElements.filter((el) => el.id !== id));
    setShowProperties(false);
    if (selectedDiagramId === id) {
      setSelectedDiagramId(null);
    }
  };

  const saveDiagram = async () => {
    try {
      const diagramData = {
        name: diagramName,
        elements: elements.map((el) => ({
          id: el.id.toString(),
          type: el.type,
          x: el.x,
          y: el.y,
          rotation: el.rotation, // Include rotation in saved data
        })),
      };

      const response = await axios.post('http://localhost:5000/api/diagrams/createDiagram', diagramData);
      fetchDiagrams();
    } catch (error) {
      console.error('Error saving diagram:', error);
    }
  };

  const fetchDiagrams = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/diagrams/getDiagram');
      setDiagrams(response.data);
      if (response.data.length > 0) {
        setSelectedDiagramId(response.data[0]._id);
        setElements(response.data[0].elements);
        setDiagramName(response.data[0].name);
      }
    } catch (error) {
      console.error('Error fetching diagrams:', error);
    }
  };

  const handleSelectDiagram = (diagram) => {
    setSelectedDiagramId(diagram._id);
    setElements(diagram.elements);
    setDiagramName(diagram.name);
  };

  const createNewDiagram = () => {
    setElements([]);
    setDiagramName('');
    setSelectedDiagramId(null);
  };

  useEffect(() => {
    fetchDiagrams();
  }, []);

  return (
    <div className="editor-container">
      <input
        type="text"
        value={diagramName}
        onChange={(e) => setDiagramName(e.target.value)}
        placeholder="Diagram Name"
      />
      <div className="btn-container">
        <button className="save-btn" onClick={saveDiagram}>Save Diagram</button>
        <button className="new-diagram-button" onClick={createNewDiagram}> New Diagram </button>
      </div>
      <div className="editor-layout">
        <div className="sidebar-layout">
          <Sidebar diagrams={diagrams} onSelectDiagram={handleSelectDiagram} />
        </div>
        <div
          ref={(node) => { drop(node); editorRef.current = node; }}
          className="editor"
          onClick={() => setSelectedDiagramId(null)}
        >
          {elements.map((element) => (
            <div
              key={element.id}
              id={element.id}
              className={`editor-element ${selectedDiagramId === element.id ? 'selected' : ''}`}
              style={{
                left: element.x,
                top: element.y,
                position: 'absolute',
                cursor: isRotating ? 'grabbing' : 'move',
                transform: `rotate(${element.rotation}deg) `,
              }}
              onClick={(e) => handleElementClick(e, element.id)}
              onMouseDown={(e) => handleMouseDown(e, element.id)}
              onContextMenu={(e) => handleContextMenu(e, element.id)}
            >
              {renderIcon(element.type)}
              {selectedDiagramId === element.id && (
                <>
                  <div
                    className="rotation-handle"
                    style={{
                      position: 'absolute',
                      top: -ROTATION_HANDLE_SIZE - 5,
                      left: '50%',
                      width: ROTATION_HANDLE_SIZE,
                      height: ROTATION_HANDLE_SIZE,
                      marginLeft: -ROTATION_HANDLE_SIZE / 2,
                      background: '#4CAF50',
                      borderRadius: '50%',
                      cursor: 'grab',
                      zIndex: 2,
                    }}
                    onMouseDown={(e) => handleMouseDown(e, element.id, true)}
                  />
                  {/* Delete Button */}
                  {/* <button
                    className="element-delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteElement(element.id);
                    }}
                  >
                    &times;
                  </button> */}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      {showProperties && (
        <div
          className="properties-box"
          style={{
            position: 'absolute',
            top: propertiesPosition.y,
            left: propertiesPosition.x + 100,
          }}
        >
          <h2>Properties</h2>
          <ul>
            <li>
              <label>Type:</label>
              <input
                type="text"
                name="type"
                value={properties.type}
                onChange={handlePropertiesChange}
              />
            </li>
            <li>
              <label>X:</label>
              <input
                type="number"
                name="x"
                value={properties.x}
                onChange={handlePropertiesChange}
              />
            </li>
            <li>
              <label>Y:</label>
              <input
                type="number"
                name="y"
                value={properties.y}
                onChange={handlePropertiesChange}
              />
            </li>
            <li>
              <label>Rotation:</label>
              <input
                type="number"
                name="rotation"
                value={properties.rotation}
                onChange={handlePropertiesChange}
              />
            </li>
          </ul>
          <button onClick={handlePropertiesSave}>Save</button>
          <button onClick={handlePropertiesClose}>Close</button>
          <button className="delete-btn" onClick={() => handleDeleteElement(propertiesElementId)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Editor;
