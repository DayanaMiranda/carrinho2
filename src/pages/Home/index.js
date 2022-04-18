import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/cart";

import { getAllProducts } from "../../api/products";
import "./styles.css";

export default function Home() {
  const { productsCart, addProducToCart, removeProductToCart } = useContext(CartContext);
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then(data => setProducts(data.content));
  }, []);

  return (
    <div>
      
      {products.map((product) => (
        <div key={product.id} className="cart">
          <div className="container">
            <h2>{product.title}</h2>
            <h3>R$ {product.price}</h3>
            <p>{product.description}</p>
            <button onClick={() => addProducToCart(product.id, product.image)}>+</button>
            <button onClick={() => removeProductToCart(product.id)}>-</button>
          </div>
          <img src={product.image} />
        </div>
      ))}
      <Link to="/cart">Ver carrinho</Link>
    </div>
  );
}