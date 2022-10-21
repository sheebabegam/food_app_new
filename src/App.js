import Home_New from "./components/Pages/Home_New";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/Pages/Cart";
import Navbar from "./components/Navbar";
import Register from "./components/User_Components/Register";
import LoginNew from "./components/User_Components/LoginNew";
import OrderHistory from "./components/Pages/OrderHistory";
import ShowOrderDetails from "./components/Pages/ShowOrderDetails";
import MenuPage from "./components/Pages/MenuPage";
import Map from "./components/Pages/Map";
import Register_New from "./components/User_Components/Register_New";
import { db } from "./firebase";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home_New />} />
        <Route path="/home" element={<Home_New />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/register" element={<Register db={db} />} /> */}
        <Route path="/register_new" element={<Register_New db={db} />} />
        <Route path="/login" element={<LoginNew />} />
        <Route path="/Order_history" element={<OrderHistory />} />
        <Route path="/order_details" element={<ShowOrderDetails />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </div>
  );
}

export default App;
