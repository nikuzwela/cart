
import { Routes, Route} from "react-router-dom";
import Cart from "./context/orderproduct"
import Products from "./context/productsProvider";

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element ={<Products/>} />
      <Route path="/Cart" element={<Cart/>}/>
    </Routes>  
      
    </div>
  );
}

export default App;
