import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "../styles/ProductManager.css";

const ProductManager = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Periwinkle",
      price: 5,
      stock: 20,
      image: "../assets/images/periwinkle.png",
    },
    { id: 2, name: "Daisy", price: 5, stock: 20, image: "../assets/images/daisy.png" },
    {
      id: 3,
      name: "White Rose",
      price: 5,
      stock: 20,
      image: "../assets/images/whiterose.png",
    },
    {
      id: 4,
      name: "White Rose",
      price: 5,
      stock: 20,
      image: "../assets/images/whiterose.png",
    },
  ]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    image: null,
  });

  const handleEditClick = (product) => {
    setSelectedProduct(product);
  };

  const handleAddClick = () => {
    setIsAddPopupOpen(true);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
    setIsAddPopupOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);

    if (selectedProduct) {
      setSelectedProduct((prevProduct) => ({
        ...prevProduct,
        image: imageUrl,
      }));
    } else {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        image: imageUrl,
      }));
    }
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === selectedProduct.id ? selectedProduct : product
      )
    );
    setSelectedProduct(null);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newId = products.length + 1;
    setProducts((prevProducts) => [
      ...prevProducts,
      { ...newProduct, id: newId },
    ]);
    setNewProduct({
      name: "",
      price: "",
      stock: "",
      image: null,
    });
    setIsAddPopupOpen(false);
  };

  return (
    <div className="product-manager-container">
      <Sidebar />
      <main className="main-content">
        <div className="header-row">
          <h2 style={{ fontWeight: 'bold' }}>Products</h2>
          <button className="add-button" onClick={handleAddClick}>
            + ADD
          </button>
        </div>
        
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <p>Name: {product.name}</p>
                <p>Price: ${product.price}</p>
                <p>Stock: {product.stock}</p>
              </div>
              <button
                className="edit-button"
                onClick={() => handleEditClick(product)}
              >
                Edit
              </button>
            </div>
          ))}
        </div>

        {/* Edit Product Popup */}
        {selectedProduct && (
          <div className="popup">
            <div className="popup-content">
              <span className="close-button" onClick={handleClosePopup}>
                &times;
              </span>
              <h3>Edit Product</h3>
              <form onSubmit={handleSaveChanges}>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={selectedProduct.name}
                    onChange={handleFormChange}
                  />
                </label>
                <label>
                  Price:
                  <input
                    type="number"
                    name="price"
                    value={selectedProduct.price}
                    onChange={handleFormChange}
                  />
                </label>
                <label>
                  Stock:
                  <input
                    type="number"
                    name="stock"
                    value={selectedProduct.stock}
                    onChange={handleFormChange}
                  />
                </label>
                <label>
                  Image:
                  <input type="file" onChange={handleImageChange} />
                </label>
                <button type="submit">Save Changes</button>
              </form>
            </div>
          </div>
        )}

        {/* Add Product Popup */}
        {isAddPopupOpen && (
          <div className="popup">
            <div className="popup-content">
              <span className="close-button" onClick={handleClosePopup}>
                &times;
              </span>
              <h3>Add Product</h3>
              <form onSubmit={handleAddProduct}>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleNewProductChange}
                  />
                </label>
                <label>
                  Price:
                  <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleNewProductChange}
                  />
                </label>
                <label>
                  Stock:
                  <input
                    type="number"
                    name="stock"
                    value={newProduct.stock}
                    onChange={handleNewProductChange}
                  />
                </label>
                <label>
                  Image:
                  <input type="file" onChange={handleImageChange} />
                </label>
                <button type="submit">Add Product</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductManager;
