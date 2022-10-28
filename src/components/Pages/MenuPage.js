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
// import "../style.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Const } from "../../assets/styles/Constants";

const useStyles = makeStyles({
  backImage: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: 500,
    maxWidth: "1320px",
    paddingTop: "100px !important",
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
  the: {
    paddingTop: "50px !important",
    fontFamily: Const.fontFamily,
    color: "white",
    fontSize: "40px !important",
    // marginTop: "30px !important",
  },
  resta_name: {
    paddingTop: "50px !important",
    fontFamily: Const.fontFamily,
    color: "white",
    fontSize: "70px !important",
  },
  special_menu: {
    fontFamily: Const.fontFamily,
    textAlign: "start",
    marginLeft: "290px !important",
    fontSize: "35px !important",
    fontWeight: Const.fontWeight,
    color: Const.appColor,
    marginTop: "15px !important",
  },
  menu_words: {
    fontFamily: Const.fontFamily,
    textAlign: "start",
    marginLeft: "290px !important",
    fontSize: "15px !important",
    color: Const.appColor,
    marginBottom: "15px !important",
  },
  name_menu: {
    fontFamily: Const.fontFamily,
  },
  addcartbtn: {
    fontWeight: Const.fontWeight,
    fontFamily: Const.fontFamily,
    color: Const.appColor,
  },
  rupees: {
    fontFamily: Const.fontFamily,
    fontSize: 16,
  },
  map: {
    marginTop: "50px",
    marginBottom: "50px",
    display: "flex",
    alignItems: "center",
    width: "69.3%",
    boxShadow: "2px 4px 10px 1px rgb(201 201 201 / 47%)",
    marginLeft: "290px",
    fontSize: "20px",
    borderRadius: Const.borderRadius20,
  },
  address_res: {
    fontFamily: Const.fontFamily,
    marginLeft: "150px",
  },
  main_div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Const.borderRadius20,
  },
  card1: {
    boxShadow: "2px 4px 10px 1px rgb(201 201 201 / 47%)",
    borderRadius: Const.borderRadius20,
    marginBottom: "30px",
  },
  modalbox: {
    color: "black",
    textAlign: "center",
    fontSize: "20px",
  },
  para: {
    display: "flex",
    alignItems: "start",
    justifyContent: "start",
    fontSize: "20px",
    marginTop: "15px",
    textAlign: "left",
    padding: "0px 20px",
  },
  h61: {
    width: "126px",
    fontWeight: Const.fontWeight,
    fontSize: "20px",
  },
  h63: {
    width: "310px",
    fontWeight: Const.fontWeight,
    fontSize: "20px",
  },
  para1: {
    textAlign: "justify",
    fontSize: "20px",
    marginLeft: "20px",
  },
  modalAlert: {
    color: "black",
    textAlign: "center",
    fontSize: "20px",
    marginTop: "-40px",
  },
  modalAlert_para: {
    fontSize: "25px",
    marginTop: "15px",
  },
  webLinkColor: {
    color: Const.appColor,
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
  const [addCart, setAddCart] = useState([cart]);

  var userdata = localStorage.getItem("userdata", JSON.stringify(user));
  var user_details = JSON.parse(userdata);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const [foodDetails, setFoodDetails] = useState([]);

  const notify = () => {
    toast.success("Items Added", {
      autoClose: 250,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      hideProgressBar: true,
    });
  };

  const addcart = (product, e) => {
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
    console.log("ddddddddddd", cart_details);
    for (var item in cart_details) {
      console.log(cart_details[item].menu_id);
    }
    setArr([...arr]);
    console.log("CARTS", setArr);
  }, []);

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

  // var carts = localStorage.getItem("cart", JSON.stringify(cart));
  // var cart_details = JSON.parse(carts);

  // console.log("CARRRRTTTT", cart_details);

  return (
    <div>
      <Container
        className={classes.backImage}
        style={{
          backgroundImage: `url(${location.state.id.res_img})`,
        }}
      >
        <Typography className={classes.the}>The</Typography>
        <Typography className={classes.resta_name}>
          <b>{location.state.id.res_name}</b>
        </Typography>
      </Container>

      <div className={classes.map}>
        <GoogleMaps
          apiKey={"AIzaSyDw96E-JeiaACLrNOAP_lBdmtlYmV76iis"}
          className="google1"
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

        <div className={classes.address_res}>
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
              className={classes.webLinkColor}
            >
              {" "}
              {location.state.id.res_website}
            </a>
          </label>
        </div>
      </div>

      <Typography className={classes.special_menu}>Our Special Menu</Typography>

      <Typography className={classes.menu_words}>
        <i>"You don't need a silver fork to eat good food"</i>
      </Typography>
      <ToastContainer />

      <div className={classes.main_div}>
        <div className={classes.container1}>
          {location.state.id.menus.map((product, i) => (
            <div className={classes.card1} key={product.menu_id}>
              <div className={classes.margins}>
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
                        className={classes.name_menu}
                      >
                        {product.menu_name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>

                  <CardActions className={classes.action1}>
                    <Button
                      className={classes.addcartbtn}
                      onClick={(e) => {
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
                      className={classes.rupees}
                    >
                      Rs. {product.menu_price}.00 /-
                    </Typography>
                  </CardActions>
                </Card>
              </div>

              <ModalBox show1={show1} handleClose1={handleClose1}>
                <div className={classes.modalbox}>
                  <p className={classes.para}>
                    <h6 className={classes.h61}>Menu Name</h6>: &nbsp;{" "}
                    <p>{foodDetails.menu_name}</p>
                  </p>
                  <p className={classes.para}>
                    <h6 className={classes.h61}>Price</h6> : &nbsp;{" "}
                    <p>Rs. {foodDetails.menu_price}/-</p>
                  </p>
                  <p className={classes.para}>
                    <h6 className={classes.h61}>Description</h6>
                    <p className={classes.para1}>
                      {" "}
                      : {foodDetails.description}
                    </p>
                  </p>

                  <br />
                </div>
              </ModalBox>
            </div>
          ))}
        </div>

        <ModalAlert show={show} handleClose={handleClose}>
          <div className={classes.modalAlert}>
            <p className={classes.modalAlert_para}>
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
