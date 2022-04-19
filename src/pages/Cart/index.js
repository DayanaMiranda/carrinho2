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

  function sumValues() {
    let sum = 0;
    products.map(product => {
      sum += product.price
    });
    setSum(sum);
  }

  return (

    <div className="section-cart container">

      <div className="cart-title"><h3>Carrinho</h3></div>


<div className="teste2">
      <div className="teste">
        <div className="container-items">
          {
            products.map((product) => (
              <div key={product.id} className="cart">

                <div className="cart-image">
                  <img className="img-fluid" src={product.image} alt={product.title} />
                </div>
                <div>
                  <p className="item-title">{product.title}</p>
                  <p>{product.category.name}</p>
                  <p>Quantidade: {productsCart.find(item => item.id === product.id).quantity}</p>
                  <p>R$ {product.price}</p>
                </div>
                <button onClick={() => removeProductToCart(product.id)}>Remover</button>
              </div>
            ))
          }


        </div>

        <div className="return-policy">
          <p className="p1">Política de devolução</p>
          <p className="p2">O que posso devolver?</p>
          <p className="p5">O que posso devolver?Você pode devolver a maioria dos itens novos não abertos vendidos pela merctech.com.br dentro do prazo de 30 dias após a entrega para obter um reembolso total.</p>
          <p className="p3">Quando vou receber meu reembolso?</p>
          <p className="p4">Para cartão de crédito, pode levar até 2 faturas; para Boleto, até 3 dias úteis através da conta bancária fornecida.</p>
        </div>

      </div>

      <div className="order-container">
        <p className="order">Pedido</p>
        <form>
          <input name="name" type="text" value="Cupom de desconto" /> <br />
        </form>
        <p className="subtotal">Subtotal: R$ {sum}</p>
        <p className="delivery">Frete: R$ 0.00</p>
        <p nameClass="final-value">R$ {sum}</p>
        <button className="btn-finish">Finalizar pedido</button>
      </div>
  </div>      


    </div>






  );
}