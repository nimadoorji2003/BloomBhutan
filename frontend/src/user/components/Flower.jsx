// components/Flower.js
import React from 'react';
import { useDrag } from 'react-dnd';

const Flower = ({ flower, isHighlighted }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FLOWER',
    item: { ...flower, isNew: false }, // Indicate it's an existing flower
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        position: 'absolute',
        left: flower.x,
        top: flower.y,
        transform: `rotate(${flower.rotation}deg) scale(${flower.scale})`,
        zIndex: flower.zIndex,
        opacity: isDragging ? 0.5 : 1,
      }}
      className={`cursor-move ${
        isHighlighted ? 'border-2 border-blue-500' : ''
      }`}
    >
      <img src={flower.image} alt={flower.name} className="w-24 h-24" />
    </div>
  );
};

export default Flower;
