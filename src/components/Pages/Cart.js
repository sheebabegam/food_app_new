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
import { collection, addDoc } from "firebase/firestore";
// import "../style.css";
import { db } from "../../firebase";
import { Const } from "../../assets/styles/Constants";

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
    marginTop: "30px",
    borderRadius: Const.borderRadius20,
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
  backtomenubtn: {
    marginBottom: 50,
    backgroundColor: Const.appColor,
    position: "absolute",
    left: 183,
    borderRadius: "10px !important",
    fontFamily: Const.fontFamily,
    marginRight: "auto !important",
    fontWeight: Const.fontWeight,
  },
  clear_cart_btn: {
    marginBottom: 50,
    backgroundColor: Const.appColor,
    fontWeight: "bold !important",
    position: "absolute",
    right: 133,
    borderRadius: "10px !important",
    fontFamily: Const.fontFamily,
  },
  minus_btn: {
    backgroundColor: Const.appColor,
    color: Const.whiteColor,
    borderRadius: "0px 10px 10px 0px",
    fontFamily: Const.fontFamily,
    fontWeight: Const.fontWeight,
    fontSize: "15px !important",
  },
  product_qty_btn: {
    color: Const.appColor,
    fontWeight: Const.fontWeight,
    backgroundColor: Const.whiteColor,
    fontFamily: Const.fontFamily,
  },
  plus_btn: {
    backgroundColor: Const.appColor,
    color: Const.whiteColor,
    borderRadius: "10px 0px 0px 10px !important",
    fontFamily: Const.fontFamily,
    fontWeight: Const.fontWeight,
    fontSize: "15px !important",
  },
  remove_btn: {
    color: Const.appColor,
    fontFamily: Const.fontFamily,
    fontWeight: Const.fontWeight,
  },
  remove_div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "6px",
    marginBottom: "10px",
  },
  buy_btn: {
    backgroundColor: Const.appColor,
    borderRadius: "10px !important",
    fontFamily: Const.fontFamily,
  },
  button_group: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    backgroundColor: Const.appColor,
    color: Const.whiteColor,
  },
  cartcontainer: {
    marginTop: "30px",
  },
  contain1: {
    display: "flex",
    justifyContent: "space-around",
    textAlign: "center",
  },
  empty: {
    fontSize: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: Const.appColor,
    fontWeight: Const.fontWeight,
    fontFamily: Const.fontFamily,
  },
  contain: {
    width: "60%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    padding: "15px",
    marginRight: "458px",
    marginTop: "40px",
    height: "730px",
    overflow: "scroll",
  },
  wid: {
    width: "100%",
  },
  my_div: {
    margin: "0px 6px",
  },
  division: {
    marginTop: "50px",
    marginRight: "10px",
    marginLeft: "10px",
  },
  shade: {
    boxShadow: "2px 4px 10px 1px rgb(201 201 201 / 47%)",
    borderRadius: Const.borderRadius20,
  },
  cart_menu_img: {
    height: "260px",
    width: "288px",
    borderRadius: "20px 20px 0px 0px",
  },
  cart_para: {
    marginTop: "0px",
    marginBottom: "0px",
    fontFamily: Const.fontFamily,
    textAlign: "left",
    padding: "5px",
    marginLeft: "7px",
  },
  cart_para_label: {
    width: "100%",
    display: "unset",
  },
  buynow_div: {
    fontSize: "20px",
    textAlign: "left",
    fontFamily: Const.fontFamily,
  },
  para: {
    display: "inline-block",
    width: "200px",
  },
  buybtn_div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
    fontFamily: Const.fontFamily,
  },
  buy_modal_div: {
    color: "black",
    textAlign: "center",
    fontSize: "20px",
    marginTop: "-40px",
    fontFamily: Const.fontFamily,
  },
  orderid_label: {
    marginLeft: "27px",
  },
  copytext_box: {
    fontSize: "20px",
    borderRadius: "10px",
    border: "none",
    width: "60%",
    textAlign: "center",
    padding: "5px 10px",
    fontFamily: Const.fontFamily,
    pointerEvents: "none",
  },
  copy_icon: {
    backgroundColor: Const.whiteColor,
    fontWeight: Const.fontWeight,
    fontSize: "25px",
    borderStyle: "none",
    borderRadius: "10px",
    fontFamily: Const.fontFamily,
  },
  order_placed_para: {
    fontSize: "25px",
    marginTop: "15px",
    fontFamily: Const.fontFamily,
  },
  order_placed_para_small: {
    fontSize: "15px",
    fontFamily: Const.fontFamily,
  },
});

const Cart = (props) => {
  // console.log("DB is", props);
  const [show, setShow] = useState(false);
  const [orderitem, setOrderitem] = useState([]);

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

  const saveChange = async () => {
    // e.preventDefault();
    console.log("Orders are ", orderitem);

    const data = collection(db, "order-data");
    await addDoc(data, {
      orderitems: orderitem,
      usercontact: contact_details,
    })
      // await addDoc(collection(db, "order-data"), {
      //   orderitems: orderitem,
      //   usercontact: contact_details,
      // })
      .then(function (res) {
        // alert("Items added");
        console.log(res);
      })
      .catch(function (err) {
        // alert("Details cannot be added");
        console.log(err);
      });
  };

  const classes = useStyles();

  const cart = useSelector((state) => state);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  var userdata = localStorage.getItem("userdata", JSON.stringify(userdata));
  var user_details = JSON.parse(userdata);

  // const email = localStorage.getItem("email1", JSON.stringify(email));
  // console.log(email);

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

  const submitAlert = async (totalamount) => {
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

    orderitem.push(menu_details);

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        saveChange();
      }, 1000);
    });

    promise
      .then((val) => {
        console.log(val);
      })
      .catch((err) => console.log(err));

    // await saveChange();
  };
  console.log(orderitem);

  // Modal

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div className={classes.cartcontainer}>
      <div className={classes.contain1}>
        <Button
          variant="contained"
          aria-label="outlined primary button group"
          onClick={() => navigate(-1)}
          className={classes.backtomenubtn}
        >
          {" "}
          Back to Menu
        </Button>

        {cart.length !== 0 && (
          <Button
            variant="contained"
            aria-label="outlined primary button group"
            className={classes.clear_cart_btn}
            onClick={() => dispatch({ type: "STORE_NAME_RESET" })}
          >
            Clear Cart
          </Button>
        )}
      </div>
      <br />

      <div className={classes.wid}>
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
            <div className={classes.empty}>
              <p>Cart is Empty</p>
            </div>
          </div>
        )}
      </div>

      <div className={classes.container}>
        <div className={classes.contain}>
          {cart.map((product) => {
            // console.log("CART is :", product);
            return (
              <div className={classes.my_div}>
                <div className={classes.division}>
                  <div className={classes.shade}>
                    <div className={classes.card} key={product.menu_id}>
                      <div className={classes.cardview}>
                        <img
                          src={product.menu_image}
                          alt="menu"
                          className={classes.cart_menu_img}
                        />
                        <div>
                          <p className={classes.cart_para}>
                            <label className={classes.cart_para_label}>
                              Menu Name
                            </label>
                            : &nbsp;
                            {product.menu_name}
                          </p>
                          <p className={classes.cart_para}>
                            <label className={classes.cart_para_label}>
                              Price
                            </label>
                            : &nbsp; Rs. {product.menu_price} /-
                          </p>
                          <p className={classes.cart_para}>
                            <label className={classes.cart_para_label}>
                              Quantity
                            </label>
                            : &nbsp;
                            {product.quantity}
                          </p>
                        </div>

                        <div className={classes.remove_div}>
                          <Button
                            onClick={() => {
                              dispatch({ type: "REMOVE", payload: product });
                            }}
                            className={classes.remove_btn}
                          >
                            Remove
                          </Button>

                          <div className={classes.button_group}>
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
                                className={classes.plus_btn}
                              >
                                +
                              </Button>
                              <Button className={classes.product_qty_btn}>
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
                                className={classes.minus_btn}
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
              <div className={classes.buynow_div}>
                <label>
                  <p className={classes.para}>Actual product(s) price </p> : Rs.{" "}
                  {total.toFixed(2)}
                </label>
                <br />
                <label>
                  <p className={classes.para}>Total Tax Amount </p> : Rs.{" "}
                  {(total * (5 / 100) + total * (7 / 100)).toFixed(2)}
                </label>
                <br />
                <label>
                  <p className={classes.para}>Delivery Fee </p> : Rs. 20.00
                </label>
                <br />
                <label>
                  <p className={classes.para}>Total Price to pay </p> : Rs.{" "}
                  {(
                    total +
                    20 +
                    (total * (5 / 100) + total * (7 / 100))
                  ).toFixed(2)}
                </label>

                <div className={classes.buybtn_div}>
                  <Button
                    variant="contained"
                    aria-label="outlined primary button group"
                    onClick={() => {
                      handleShow();
                      submitAlert(total);
                    }}
                    className={classes.buy_btn}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        <Modals show={show} handleClose={handleClose}>
          <div className={classes.buy_modal_div}>
            <br />
            <br />
            <label className={classes.orderid_label}>
              <b>Order id </b>: &nbsp;
            </label>
            <input
              id="copy"
              className={classes.copytext_box}
              value={order_id}
              onChange={(e) => setCopyText(e.target.value)}
            />
            <button
              variant="contained"
              className={classes.copy_icon}
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
            <p className={classes.order_placed_para}>
              <b>
                <i>Your Order has been placed.</i>
              </b>
            </p>
            <p className={classes.order_placed_para_small}>
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
