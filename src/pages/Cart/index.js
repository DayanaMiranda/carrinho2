import { findByTitle } from "@testing-library/react";
import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../../context/cart";
import "./styles.css";



export default function Cart() {
  const [products, setProducts] = useState([]);
  const { productsCart, removeProductToCart } = useContext(CartContext);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    getProductsCart();
    sumValues();
  });


  async function getProductsCart() {
    const body = JSON.stringify(productsCart)

    const response = await fetch("http://3.16.56.233:8080/products/productCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });


    const data = await response.json();
    setProducts(data);
  }

function sumValues (){
  let sum = 0;
  products.map(product => {
    sum += product.price
  });
  setSum(sum);
}

  return (
    <div className="section-cart container">

      <h1>Produtos no carrinho de compras</h1>
      {/* <p>{JSON.stringify(productsCart)}</p> */}
      <div className="container-items">
        {
          products.map((product) => (
            <div key={product.id} className="cart">

              <div className="cart-image">
                <img className="img-fluid" src={product.image} alt={product.title} />
              </div>

              <div>
                <h2>{product.title}</h2>
                <p>{product.category.name}</p>
                <p>Quantidade: {productsCart.find(item => item.id === product.id).quantity}</p>
                <p>{product.price}</p>

              </div>
              <button onClick={() => removeProductToCart(product.id)}>Remover</button>

            </div>

          ))
        }

        

      </div>
      <p>Soma: {sum}</p>

    </div>
  );
}