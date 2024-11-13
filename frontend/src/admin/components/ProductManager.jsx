import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "../styles/ProductManager.css";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    image: null,
  });
  const [error, setError] = useState(null);

  // Load products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch all products from the API
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/products/products"
      );
      if (response.status === 401) throw new Error("Unauthorized access");
      const data = await response.json();
      setProducts(data); // Assuming `data` is an array of products from the database
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please check your authorization.");
    }
  };

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
    if (selectedProduct) {
      setSelectedProduct((prevProduct) => ({
        ...prevProduct,
        image: file,
      }));
    } else {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        image: file,
      }));
    }
  };

  // Save changes to an edited product
  const handleSaveChanges = async (e) => {
    e.preventDefault();

    // Debug logs
    console.log("Selected Product:", selectedProduct);

    const formData = new FormData();
    formData.append("name", selectedProduct.name);
    formData.append("price", selectedProduct.price);
    formData.append("stock", selectedProduct.stock);

    // Check if a new image is selected and append it to formData
    if (selectedProduct.image) {
      formData.append("image", selectedProduct.image);
    }

    try {
      const productId = selectedProduct._id;
      console.log(`Sending update request for Product ID: ${productId}`);

      // Sending the PUT request to update the product details
      const response = await fetch(
        `http://localhost:5000/api/products/product/${productId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Response Status:", response.status); // Debug log
      console.log("Response Data:", data); // Debug log

      if (response.ok) {
        alert("Product updated successfully");
      } else {
        throw new Error(data.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Add a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!newProduct.image) {
      alert("Please select an image for the product.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("stock", newProduct.stock);
    formData.append("image", newProduct.image); // Key must match `upload.single("image")`

    try {
      const response = await fetch(
        "http://localhost:5000/api/products/product",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to add product");
      fetchProducts();
      setIsAddPopupOpen(false);
      setNewProduct({ name: "", price: "", stock: "", image: null });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  
  return (
    <div className="product-manager-container">
      <Sidebar />
      <main className="main-content">
        <div className="header-row">
          <h2 style={{ fontWeight: "bold" }}>Products</h2>
          <button className="add-button" onClick={handleAddClick}>
            + ADD
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="product-card">
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
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>

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
