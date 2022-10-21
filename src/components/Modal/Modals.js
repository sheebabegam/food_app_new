import React, { useState, useEffect } from "react";
import "./modal.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import api from "../../api/orderData";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import green_tic from "../../images/green_tic.png";
import close from "../../images/close.jfif";

const Modals = ({ handleClose, show, children }) => {
  const cart = useSelector((state) => state);
  const dispatch = useDispatch();

  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    var order_details = localStorage.getItem(
      "order_details",
      JSON.stringify(order_details)
    );
    var order_data = JSON.parse(order_details);
    console.log(order_details);
    setOrderData(order_data);
  }, []);

  const retriveData = async () => {
    const response = await api.get("/orderData");
    return response.data;
  };
  var order_details = localStorage.getItem(
    "order_details",
    JSON.stringify(order_details)
  );
  var order_data = JSON.parse(order_details);
  const onSubmit = async (data) => {
    console.log(data);
    const request = {
      id: uuidv4(),
      orders: order_data,
    };
    const response = await api.post("/orderData", request);
    setOrderData([...orderData, response.data]);
  };

  useEffect(() => {
    const getData = async () => {
      const allData = await retriveData();
      if (allData) setOrderData(allData);
    };
    getData();
  }, []);

  const toHome = (product, data) => {
    onSubmit(data);
    navigate("/");
    dispatch({ type: "STORE_NAME_RESET", payload: product });
    localStorage.setItem("cart", JSON.stringify([]));
    localStorage.setItem("myproduct", JSON.stringify([]));
    localStorage.setItem("restaurant_data", JSON.stringify([]));
  };

  return (
    <div
      className={showHideClassName}
      style={{ backgroundColor: "rgba(153, 146, 148, 0.6)" }}
    >
      <div className="modal-main">
        <div className="modal_header" style={{ padding: "30px" }}>
          <img
            src={green_tic}
            alt="tick"
            style={{
              height: "100px",
              width: "100px",
              fontSize: "90px",
              marginLeft: "230px",
              marginTop: "-80px",
              borderRadius: "70%",
              backgroundColor: "green",
            }}
          />

          <img
            src={close}
            alt="close"
            className="xbutton"
            onClick={handleClose}
            style={{
              height: "30px",
              width: "30px",
              cursor: "pointer",
              fontSize: "30px",
            }}
          />
        </div>

        {children}

        <div style={{ color: "blue", textAlign: "center" }}>
          <Button
            variant="contained"
            aria-label="outlined primary button group"
            type="button"
            onClick={toHome}
            style={{
              fontFamily: "cursive",
              backgroundColor: "#3bc03b",
              height: "55px",
              width: "130px",
              fontSize: "20px",
              color: "white",
              borderRadius: "10px",
              cursor: "pointer",
              marginTop: "-15px",
              marginBottom: "17px",
            }}
          >
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modals;
