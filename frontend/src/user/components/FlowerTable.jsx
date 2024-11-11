// FlowerTable.js
import React from 'react';

const FlowerTable = ({ flowersOnCanvas, setFlowersOnCanvas, setHighlightedFlowerId }) => {
  const handleDelete = (id) => {
    setFlowersOnCanvas(flowersOnCanvas.filter(flower => flower.id !== id));
  };

  return (
    <table className="w-full max-w-3xl border-collapse mb-5">
      <thead>
        <tr className="bg-gray-200">
          <th className="border px-2 py-1">Sl. No</th>
          <th className="border px-2 py-1">Name</th>
          <th className="border px-2 py-1">Price</th>
          <th className="border px-2 py-1">Action</th>
        </tr>
      </thead>
      <tbody>
        {flowersOnCanvas.map((flower, index) => (
          <tr
            key={flower.id}
            className="hover:bg-gray-100"
            onMouseEnter={() => setHighlightedFlowerId(flower.id)}
            onMouseLeave={() => setHighlightedFlowerId(null)}
          >
            <td className="border px-2 py-1 text-center">{index + 1}</td>
            <td className="border px-2 py-1 text-center">{flower.name}</td>
            <td className="border px-2 py-1 text-center">{flower.price}</td>
            <td className="border px-2 py-1 text-center">
              <button
                onClick={() => handleDelete(flower.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FlowerTable;
