// import React, { useState } from "react"
// import "./productProvider.css"
// import { Link } from "react-router-dom"


//  export interface Product{
//     id: number,
//     image: string,
//     title :string,
//     price: number, 
//     category: string,
//     description: string,
//     count:number,
// }
// const Products = ()=>{
//     const [datas,setDatas] =useState<Product[]>([]);
//     fetch ("https://fakestoreapi.com/products")
//     .then((res)=> res.json())
//     .then((data)=>{
//         setDatas(data);
//         console.log(data);
//     })
//     .catch((error)=>{
//         console.error(error)
//     });
//     const handleAddCart=(product:Product)=>{
//     const item: any = localStorage.getItem("product") ;
//     let allProducts: any =[];
//     console.log(JSON.parse(item)); 

//     allProducts= JSON.parse(item);
//     if(allProducts === null){
//         allProducts=[];
//         allProducts.push(product)
//     }
//     else{
//         // allProducts.push(product)
//         let Duplicate  = allProducts.filter(
//             (item: Product) => item.id === product.id
//         );
//         console.log(Duplicate);
//         if(Duplicate.length <1){
//             allProducts.push(product);
//         }
//     }
//     console.log(allProducts, product);
//     localStorage.setItem("product", JSON.stringify(allProducts));
//     };

//     return(
//     <div className="container">
//           <header> 
//             <Link to="/Cart">Cart</Link>
//             <h2> Sort </h2></header>
//         <div className="product-container" >
//             {datas.map((detail) =>(
//                 <div className="product-card" key={detail.id}>
//                     <img src={detail.image} alt="new" onClick={()=>handleAddCart(detail)}/>
//                     <h1>{detail.title}</h1>
//                     <h3>{detail.category}</h3>
//                     <p>{detail.description}</p>
//                     <h5>${detail.price}</h5>

//                 </div> 
//             ))}
           
//         </div>
//         </div>
//     )
// }
// export default Products;


import React, { useState, useEffect } from "react";
import "./productProvider.css";
import { Link } from "react-router-dom";

export interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  category: string;
  description: string;
  count: number;
}

const Products = () => {
  const [datas, setDatas] = useState<Product[]>([]);
  const [sortType, setSortType] = useState<string>(""); 


  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setDatas(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const sortProducts = () => {
      const sortedData = [...datas];
      if (sortType === "priceLowToHigh") {
        sortedData.sort((a, b) => a.price - b.price);
      } else if (sortType === "priceHighToLow") {
        sortedData.sort((a, b) => b.price - a.price);
      } else if (sortType === "titleAtoZ") {
        sortedData.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortType === "titleZtoA") {
        sortedData.sort((a, b) => b.title.localeCompare(a.title));
      }
      setDatas(sortedData);
    };
  
    sortProducts();
  }, [sortType, datas]);

  const handleAddCart = (product: Product) => {
    const item: any = localStorage.getItem("product") ;
    let allProducts: any =[];
    console.log(JSON.parse(item)); 

    allProducts= JSON.parse(item);
    if(allProducts === null){
        allProducts=[];
        allProducts.push(product)
    }
    else{
        let Duplicate  = allProducts.filter(
            (item: Product) => item.id === product.id
        );
        console.log(Duplicate);
        if(Duplicate.length <1){
            allProducts.push(product);
        }
    }
    console.log(allProducts, product);
    localStorage.setItem("product", JSON.stringify(allProducts));
  };

  return (
    <div className="container">
      <header>
        <Link to="/Cart">Cart</Link>
        <div >
          <label>Sort By:</label>
          <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
            <option value="">Select</option>
            <option value="priceLowToHigh">Low to High</option>
            <option value="priceHighToLow"> High to Low</option>
            <option value="titleAtoZ"> A to Z</option>
            <option value="titleZtoA"> Z to A</option>
          </select>
        </div>
      </header>
      <div className="product-container">
        {datas.map((detail) => (
          <div className="product-card" key={detail.id}>
            <img src={detail.image} alt="new" onClick={()=>handleAddCart(detail)}/>
                    <h1>{detail.title}</h1>
                    <h3>{detail.category}</h3>
                    <p>{detail.description}</p>
                    <h5>${detail.price}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
