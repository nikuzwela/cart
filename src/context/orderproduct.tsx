
import React, { useEffect, useState } from "react";
import { Product } from "./productsProvider";
import "../context/orderproduct.css";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState<Product[]>([]);
  const [itemNumber] = useState(1);
  const [total, setTotal] = useState(0); // Add total state

  const cartDisplay = () => {
    const item: any = localStorage.getItem("product");
    setCart(JSON.parse(item));
  };

  useEffect(() => {
    cartDisplay();
  }, []);

  useEffect(() => {
    // Calculate total whenever the cart changes
    const sum = cart.reduce((acc, item) => acc + (item.count || 1) * item.price, 0);
    setTotal(sum);
  }, [cart]);

  const removeItem = (ItemId: number)=>{
    const item: any= localStorage.getItem("product");
    let allProducts: any = [];

    allProducts = JSON.parse(item);
    let remaining =[];
    if(allProducts !== null){
    remaining = allProducts.filter(
    (item: Product)=>item.id !==ItemId
    );
    localStorage.setItem("product", JSON.stringify(remaining));
    cartDisplay();
    }
  };
  const increment = (ItemId: number)=>{
  const item: any = localStorage.getItem("product");
  let allProducts: any =[];
  allProducts = JSON.parse(item);
  let newList: any= [];
  if(allProducts !== null){
    for(let item of allProducts){
     if(item.id === ItemId){
      let currentCount = item?.count || 1;
      item.count = Number(currentCount)+1;
     }
      newList.push(item) ;
    }
    localStorage.setItem("product", JSON.stringify(newList));
    cartDisplay();
  }
  };
  const decrement = (ItemId: number)=>{
    const item: any = localStorage.getItem("product")
    let allProducts: any =[];
    allProducts = JSON.parse(item);
    let newList: any= [];
    if(allProducts !== null){
      for(let item of allProducts){
       if(item.id === ItemId){
        let currentCount = item?.count || 1;
    if(currentCount === 1){
      removeItem(ItemId);
      return;
    }
        item.count = Number(currentCount)-1;
       }
        newList.push(item) ;
      }
      localStorage.setItem("product", JSON.stringify(newList));
      cartDisplay();
    }
    };
  return (
    <div className="cart-container">
      <div className="all-cart">
        <header>
        <p className="back">
          <Link to="/">Go back</Link>
        </p>
        <h2 className="total">Total: ${total.toFixed(2)}</h2> 
        </header>
        {cart.map((detail) => (
          <div className="cart-details" key={detail.id}>
   <img src={detail.image} alt="new" />
   <div className="right">
    <div className="description">
   <h1>{detail.title}</h1>
   <h5>${detail.price}</h5>
   <div className="btn">
    <button onClick={()=>decrement (detail.id)}>-</button>
    <p>{detail?.count || itemNumber}</p>
    <button onClick={()=> increment (detail.id)}>+</button>
   </div>
   </div>
   <div className="click">
    <span>${(detail?.count || 1) * detail?.price}</span> <br />
    <button onClick={()=>removeItem (detail.id)}>Delete</button>
   </div>
   </div>
  </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
