// components/DraggableFlower.js
import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableFlower = ({ flower }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FLOWER',
    item: { ...flower, isNew: true }, // Indicate it's a new flower
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <img
      ref={drag}
      src={flower.image}
      alt={flower.name}
      className={`w-20 h-20 m-2 cursor-move ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    />
  );
};

export default DraggableFlower;
