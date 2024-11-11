// src/components/Canvas.js
import React from 'react';
import { useDrop } from 'react-dnd';
import Flower from './Flower';

const Canvas = ({ flowersOnCanvas, setFlowersOnCanvas, highlightedFlowerId }) => {
  const [, drop] = useDrop(() => ({
    accept: 'FLOWER',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const canvas = document.querySelector('.canvas');
      const canvasRect = canvas.getBoundingClientRect();

      // Calculate the position relative to the canvas
      const x = offset.x - canvasRect.left;
      const y = offset.y - canvasRect.top;

      setFlowersOnCanvas((prevFlowers) => {
        if (item.isNew) {
          // If it's a new flower from the panel
          return [
            ...prevFlowers,
            {
              ...item,
              x,
              y,
              rotation: 0,
              scale: 1,
              zIndex: prevFlowers.length,
              id: Date.now(), // Assign unique id
            },
          ];
        } else {
          // If it's an existing flower being moved
          return prevFlowers.map((flower) =>
            flower.id === item.id ? { ...flower, x, y } : flower
          );
        }
      });
    },
  }));

  return (
    <div
      ref={drop}
      className="canvas relative border-2 border-gray-300 overflow-hidden mb-5"
      style={{ width: '1000px', height: '550px' }} // Set canvas size
    >
      {flowersOnCanvas.map((flower) => (
        <Flower
          key={flower.id}
          flower={flower}
          isHighlighted={flower.id === highlightedFlowerId}
        />
      ))}
    </div>
  );
};

export default Canvas;
