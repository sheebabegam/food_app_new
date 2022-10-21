import React from "react";
import { Container } from "@mui/system";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import { useLocation } from "react-router-dom";
import ModalAlert from "../Modal/ModalAlert";
import ModalBox from "../Modal/ModalBox";
import GoogleMaps from "simple-react-google-maps";
import "../style.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles({
  backImage: {
    // backgroundImage: `url(${royal_site})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: 500,
  },

  box: {
    marginRight: 50,
  },

  card: {
    width: 370,
    height: 350,
  },

  media: {
    height: 290,
    width: 370,
  },

  action: {
    display: "flex",
    justifyContent: "space-around",
  },

  backImage1: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: 1000,
    height: 500,
  },

  container1: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "wrap",
    borderRadius: 20,
    padding: 15,
    width: 1400,
    height: "fit-content",
  },

  box1: {
    marginRight: 50,
  },

  cards: {
    width: 400,
    height: 473,
    borderRadius: 20,
  },

  media1: {
    height: 350,
    width: 400,
  },

  action1: {
    display: "flex",
    justifyContent: "space-around",
  },
});

export default function Menu_Page(props) {
  console.log("PROPS -->", props);
  const location = useLocation();
  const classes = useStyles();
  const [user, setUser] = useState([]);

  var cart = useSelector((state) => state.addToCart);
  const dispatch = useDispatch();
  var cart = localStorage.getItem("cart", JSON.stringify(cart));

  const [arr, setArr] = useState(cart);
  const [addCart, setAddCart] = useState([]);

  var userdata = localStorage.getItem("userdata", JSON.stringify(user));
  var user_details = JSON.parse(userdata);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const [foodDetails, setFoodDetails] = useState([]);

  const notify = () => {
    // toast("Item Added!");
    toast.success("Items Added", {
      autoClose: 500,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      hideProgressBar: true,
    });
  };

  const addcart = (product, e) => {
    // console.log(user_details.contact);
    if (user === null) {
      setShow(true);
    } else {
      console.log("PRODUCT is", product);
      e.preventDefault();

      addCart.push(product);
      setAddCart([...addCart]);
      console.log("ARRAY --->", addCart);
      localStorage.setItem("cart", JSON.stringify([...addCart], e));
      notify();
    }
  };

  useEffect(() => {
    var carts = localStorage.getItem("cart", JSON.stringify(cart));
    var cart_details = JSON.parse(carts);
    console.log(cart_details);
    for (var item in cart_details) {
      console.log(cart_details[item].menu_id);
    }
    setArr([...arr]);
    console.log("CARTS", setArr);
  }, [cart]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe(); // Clean up function
    };
  }, []);

  console.log("USER is", user);

  const showModal = (e) => {
    if (user !== null) {
      setFoodDetails(e);
      setShow1(true);
    }
  };

  const lat1 = location.state.id.res_address.coordinates1.lat;
  const long1 = location.state.id.res_address.coordinates1.long;

  const lat2 = location.state.id.res_address.coordinates2.lat;
  const long2 = location.state.id.res_address.coordinates2.long;

  return (
    <div>
      <Container
        className={classes.backImage}
        style={{
          maxWidth: "1320px",
          backgroundImage: `url(${location.state.id.res_img})`,
        }}
      >
        <Typography
          sx={{
            paddingTop: 25,
            fontFamily: "cursive",
            color: "white",
            fontSize: 40,
          }}
        >
          The
        </Typography>
        <Typography
          sx={{ fontFamily: "cursive", color: "white", fontSize: 70 }}
        >
          <b>{location.state.id.res_name}</b>
        </Typography>
      </Container>

      <div className="map">
        <GoogleMaps
          apiKey={"AIzaSyDw96E-JeiaACLrNOAP_lBdmtlYmV76iis"}
          style={{
            height: "400px",
            width: "50%",
            borderRadius: "20px 0px 0px 20px",
          }}
          zoom={13}
          center={{ lat: lat1, lng: long1 }}
          markers={[
            { lat: lat1, lng: long1 },
            { lat: lat2, lng: long2 },
          ]}
        />
        {/* sx={{ fontFamily: "cursive", color: "white", fontSize: 70 }} */}

        <div style={{ fontFamily: "cursive", marginLeft: "150px" }}>
          <h3>
            <b>Contact Us</b>
          </h3>{" "}
          <br />
          <label>
            <b>Address :</b> {location.state.id.res_address.address}
          </label>{" "}
          <br />
          <br />
          <label>
            <b>Telephone :</b> {location.state.id.res_phone}
          </label>{" "}
          <br />
          <br />
          <label style={{ cursor: "pointer" }}>
            <b>Website :</b>
            <a
              href={location.state.id.res_web}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              {location.state.id.res_website}
            </a>
          </label>
        </div>
      </div>

      <Typography
        sx={{
          fontFamily: "cursive",
          textAlign: "start",
          marginLeft: 38,
          fontSize: 35,
          fontWeight: "bolder",
          color: "#6439ff",
          marginTop: 15,
        }}
      >
        Our Special Menu
      </Typography>

      <Typography
        sx={{
          fontFamily: "cursive",
          textAlign: "start",
          marginLeft: 38,
          fontSize: 15,
          color: "#6439ff",
          marginBottom: 5,
        }}
      >
        <i>"You don't need a silver fork to eat good food"</i>
      </Typography>
      <ToastContainer />

      <div className="main_div">
        <div className={classes.container1}>
          {location.state.id.menus.map((product, i) => (
            <div
              className="card1"
              key={product.menu_id}
              style={{ borderRadius: 20, marginBottom: 40 }}
            >
              <div className="margins">
                <Card className={classes.cards}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media1}
                      image={product.menu_image}
                      title={product.menu_name}
                      onClick={(e) => {
                        showModal(product, e);
                      }}
                    />

                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h6"
                        sx={{ fontFamily: "cursive" }}
                      >
                        {product.menu_name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>

                  <CardActions className={classes.action1}>
                    <Button
                      sx={{ fontWeight: "bold", fontFamily: "cursive" }}
                      onClick={(e) => {
                        // eslint-disable-next-line no-lone-blocks
                        {
                          if (!cart.includes(product.menu_id)) {
                            user && dispatch({ type: "ADD", payload: product });
                            addcart(product, e);
                          }
                        }
                      }}
                    >
                      {" "}
                      {cart.includes(product.menu_id) ? "Added" : "Add to Cart"}
                    </Button>

                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h6"
                      sx={{ fontFamily: "cursive", fontSize: 16 }}
                    >
                      Rs. {product.menu_price}.00 /-
                    </Typography>
                  </CardActions>
                </Card>
              </div>

              <ModalBox show1={show1} handleClose1={handleClose1}>
                <div
                  style={{
                    color: "black",
                    textAlign: "center",
                    fontSize: "20px",
                  }}
                >
                  <p
                    style={{
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "start",
                      fontSize: "20px",
                      marginTop: "15px",
                      textAlign: "left",
                      padding: "0px 20px",
                    }}
                  >
                    <h6
                      style={{
                        width: "126px",
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      Menu Name
                    </h6>
                    : &nbsp; <p>{foodDetails.menu_name}</p>
                  </p>
                  <p
                    style={{
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "start",
                      fontSize: "20px",
                      marginTop: "15px",
                      textAlign: "left",
                      padding: "0px 20px",
                    }}
                  >
                    <h6
                      style={{
                        width: "126px",
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      Price
                    </h6>{" "}
                    : &nbsp; <p>Rs. {foodDetails.menu_price}/-</p>
                  </p>
                  <p
                    style={{
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "start",
                      fontSize: "20px",
                      marginTop: "15px",
                      textAlign: "left",
                      padding: "0px 20px",
                    }}
                  >
                    <h6
                      style={{
                        width: "310px",
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      Description
                    </h6>{" "}
                    : &nbsp;{" "}
                    <p style={{ textAlign: "justify", fontSize: "20px" }}>
                      {foodDetails.description}
                    </p>
                  </p>

                  <br />
                </div>
              </ModalBox>
            </div>
          ))}
        </div>

        <ModalAlert show={show} handleClose={handleClose}>
          <div
            style={{
              color: "black",
              textAlign: "center",
              fontSize: "20px",
              marginTop: "-40px",
            }}
          >
            <p style={{ fontSize: "25px", marginTop: "15px" }}>
              <b>
                <i>
                  Please{" "}
                  <b>
                    <u>Login</u>
                  </b>{" "}
                  to taste this yummy food
                </i>
              </b>
            </p>
            <br />
          </div>
        </ModalAlert>
      </div>
    </div>
  );
}
