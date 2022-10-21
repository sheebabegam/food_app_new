import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import makeStyles from "@material-ui/core/styles/makeStyles";
import { useNavigate } from "react-router-dom";
import "../Modal/modal.css";
import Modals from "../Modal/Modals.js";
import ReactTooltip from "react-tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import "../style.css";

const useStyles = makeStyles({
  backImage: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: 1000,
    height: 500,
  },

  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  box: {
    marginRight: 50,
  },

  card: {
    width: 500,
    height: 750,
  },

  media: {
    height: 500,
    width: 500,
  },

  action: {
    display: "flex",
    justifyContent: "space-around",
  },
  cardview: {
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  rightline: {
    width: 100,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const Cart = () => {
  const [show, setShow] = useState(false);
  const classes = useStyles();

  const cart = useSelector((state) => state);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  var userdata = localStorage.getItem("userdata", JSON.stringify(userdata));
  var user_details = JSON.parse(userdata);

  // const email = localStorage.getItem("email1", JSON.stringify(email));
  // console.log(email);

  var restaurant_data = localStorage.getItem(
    "restaurant_data",
    JSON.stringify(restaurant_data)
  );
  var restaurant_details = JSON.parse(restaurant_data);

  var email1 = localStorage.getItem("email1", JSON.stringify(email1));
  var email_details = JSON.parse(email1);
  var firstname = localStorage.getItem("firstname", JSON.stringify(firstname));
  var firstname_details = JSON.parse(firstname);
  var contact = localStorage.getItem("contact", JSON.stringify(contact));
  var contact_details = JSON.parse(contact);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addition = (acc, currentvalue) => {
    return acc + currentvalue.menu_price * currentvalue.quantity;
  };

  const total = cart.reduce(addition, 0);

  var currentdate = new Date();
  var date =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear();

  var time =
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  var datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    "@" +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  let order_id = contact_details + "@" + datetime;
  const [copytext, setCopyText] = useState(order_id);
  const handleCopy = () => {
    navigator.clipboard.writeText(copytext);
  };

  const submitAlert = (totalamount) => {
    var menu_details = {
      order_id: order_id,
      date: date,
      time: time,
      menus: cart,
      totalPrice: totalamount.toFixed(2),
      delivery_fee: 20,
      tax: [
        {
          taxname: "gst",
          taxpercentage: "5",
          taxamount: (totalamount * (5 / 100)).toFixed(2),
        },
        {
          taxname: "cgst",
          taxpercentage: "7",
          taxamount: (totalamount * (7 / 100)).toFixed(2),
        },
      ],
      clear_amount: (
        total +
        20 +
        (total * (5 / 100) + total * (7 / 100))
      ).toFixed(2),

      customer_details: {
        customer_name: firstname_details,
        customer_phone: contact_details,
        customer_email: email_details,
      },

      restaurant_details: {
        restaurant_name: restaurant_details.res_name,
        restaurant_phone: restaurant_details.res_phone,
        restaurant_address: restaurant_details.res_address,
      },
    };

    var order_details = localStorage.setItem(
      "order_details",
      JSON.stringify(menu_details)
    );
  };

  // Modal

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div className="cartcontainer">
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          textAlign: "center",
        }}
      >
        <Button
          variant="contained"
          aria-label="outlined primary button group"
          onClick={() => navigate(-1)}
          style={{
            marginBottom: 50,
            backgroundColor: "#6439ff",
            fontWeight: "bold",
            position: "absolute",
            left: 183,
            borderRadius: 10,
            fontFamily: "cursive",
          }}
        >
          {" "}
          Back to Menu
        </Button>

        {cart.length !== 0 && (
          <Button
            variant="contained"
            aria-label="outlined primary button group"
            style={{
              marginBottom: 50,
              backgroundColor: "#6439ff",
              fontWeight: "bold",
              position: "absolute",
              right: 133,
              borderRadius: 10,
              fontFamily: "cursive",
            }}
            onClick={() => dispatch({ type: "STORE_NAME_RESET" })}
          >
            Clear Cart
          </Button>
        )}
      </div>
      <br />

      <div className="wid">
        {cart.length === 0 && (
          <div>
            <div>
              <img
                src="https://i.imgur.com/dCdflKN.png"
                width="130"
                height="130"
                class="img-fluid mb-4 mr-3"
                alt="menu"
              ></img>
              <br />
            </div>
            <div
              className="empty"
              style={{
                textAlign: "center",
                color: "#6439ff",
                fontWeight: "bold",
                fontFamily: "cursive",
              }}
            >
              <p>Cart is Empty</p>
            </div>
          </div>
        )}
      </div>

      <div className={classes.container}>
        <div className="contain">
          {cart.map((product) => {
            console.log("CART is :", product);
            return (
              <div className="my_div">
                <div className="division">
                  <div className="shade">
                    <div
                      className="card"
                      key={product.menu_id}
                      style={{
                        marginTop: "30px",
                        borderRadius: "20px",
                      }}
                    >
                      <div className={classes.cardview}>
                        <img
                          src={product.menu_image}
                          alt="menu"
                          style={{
                            height: "260px",
                            width: "288px",
                            borderRadius: "20px 20px 0px 0px",
                          }}
                        />
                        <div>
                          <p
                            style={{
                              marginTop: "0px",
                              marginBottom: "0px",
                              fontFamily: "cursive",
                              textAlign: "left",
                              padding: "5px",
                              marginLeft: "7px",
                            }}
                          >
                            <label style={{ width: "100px" }}>Menu Name</label>:
                            &nbsp;
                            {product.menu_name}
                          </p>
                          <p
                            style={{
                              marginTop: "0px",
                              marginBottom: "0px",
                              fontFamily: "cursive",
                              textAlign: "left",
                              padding: "5px",
                              marginLeft: "7px",
                            }}
                          >
                            <label style={{ width: "100px" }}>Price</label>:
                            &nbsp; Rs. {product.menu_price} /-
                          </p>
                          <p
                            style={{
                              marginTop: "0px",
                              marginBottom: "0px",
                              fontFamily: "cursive",
                              textAlign: "left",
                              padding: "5px",
                              marginLeft: "7px",
                            }}
                          >
                            <label style={{ width: "100px" }}>Quantity</label>:
                            &nbsp;
                            {product.quantity}
                          </p>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "6px",
                            marginBottom: "10px",
                          }}
                        >
                          <Button
                            onClick={() => {
                              dispatch({ type: "REMOVE", payload: product });
                            }}
                            style={{ color: "#6439ff", fontFamily: "cursive" }}
                          >
                            Remove
                          </Button>

                          <div
                            className="button_group"
                            style={{ borderRadius: 10 }}
                          >
                            <ButtonGroup
                              className="me-2"
                              aria-label="Second group"
                            >
                              <Button
                                onClick={() => {
                                  dispatch({
                                    type: "INCREASE",
                                    payload: product,
                                  });
                                }}
                                style={{
                                  backgroundColor: "#6439ff",
                                  color: "white",
                                  borderRadius: "10px 0px 0px 10px",
                                  fontFamily: "cursive",
                                }}
                              >
                                +
                              </Button>
                              <Button
                                style={{ color: "#6439ff", fontWeight: "bold" }}
                              >
                                {product.quantity}
                              </Button>
                              <Button
                                onClick={() => {
                                  if (product.quantity > 1) {
                                    dispatch({
                                      type: "DECREASE",
                                      payload: product,
                                    });
                                  } else {
                                    dispatch({
                                      type: "REMOVE",
                                      payload: product,
                                    });
                                  }
                                }}
                                style={{
                                  backgroundColor: "#6439ff",
                                  color: "white",
                                  borderRadius: "0px 10px 10px 0px",
                                  fontFamily: "cursive",
                                }}
                              >
                                -
                              </Button>
                            </ButtonGroup>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {cart && (
          <div className={cart.length !== 0 ? "shadow" : ""}>
            {total > 0 && (
              <div
                style={{
                  fontSize: "20px",
                  textAlign: "left",
                  fontFamily: "cursive",
                }}
              >
                <label>
                  <p className="para">Actual product(s) price </p> : Rs.{" "}
                  {total.toFixed(2)}
                </label>
                <br />
                <label>
                  <p className="para">Total Tax Amount </p> : Rs.{" "}
                  {(total * (5 / 100) + total * (7 / 100)).toFixed(2)}
                </label>
                <br />
                <label>
                  <p className="para">Delivery Fee </p> : Rs. 20.00
                </label>
                <br />
                <label>
                  <p className="para">Total Price to pay </p> : Rs.{" "}
                  {(
                    total +
                    20 +
                    (total * (5 / 100) + total * (7 / 100))
                  ).toFixed(2)}
                </label>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "20px",
                    fontFamily: "cursive",
                  }}
                >
                  <Button
                    variant="contained"
                    aria-label="outlined primary button group"
                    onChange={submitAlert(total)}
                    onClick={handleShow}
                    style={{
                      backgroundColor: "#6439ff",
                      borderRadius: "10px",
                      fontFamily: "cursive",
                    }}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        <Modals show={show} handleClose={handleClose}>
          <div
            style={{
              color: "black",
              textAlign: "center",
              fontSize: "20px",
              marginTop: "-40px",
              fontFamily: "cursive",
            }}
          >
            <br />
            <br />
            <label style={{ marginLeft: "27px" }}>
              <b>Order id </b>: &nbsp;
            </label>
            <input
              id="copy"
              style={{
                fontSize: "20px",
                borderRadius: "10px",
                borderStyle: "none",
                width: "60%",
                textAlign: "center",
                padding: "5px 10px",
                fontFamily: "cursive",
                pointerEvents: "none",
              }}
              value={order_id}
              onChange={(e) => setCopyText(e.target.value)}
            />
            <button
              variant="contained"
              style={{
                backgroundColor: "white",
                fontWeight: "bolder",
                fontSize: "25px",
                borderStyle: "none",
                borderRadius: "10px",
                fontFamily: "cursive",
              }}
              onClick={handleCopy}
              data-for="tool"
              data-tip="Copied"
            >
              <ContentCopyIcon />
            </button>
            <ReactTooltip
              place="top"
              id="tool"
              effect="solid"
              event="click"
              border={true}
            />
            <br />
            <br />
            <p
              style={{
                fontSize: "25px",
                marginTop: "15px",
                fontFamily: "cursive",
              }}
            >
              <b>
                <i>Your Order has been placed.</i>
              </b>
            </p>
            <p style={{ fontSize: "15px", fontFamily: "cursive" }}>
              Sit back and relax as your yummy food is on it's way!
            </p>
            <br />
          </div>
        </Modals>
      </div>
    </div>
  );
};

export default Cart;
