import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
// import "./style.css";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Fetch_Data from "../Fetch_Data";
import PowerSettingsNewSharpIcon from "@mui/icons-material/PowerSettingsNewSharp";
import logo_delivery from "../images/logo_delivery.jpg";
import { Const } from "../assets/styles/Constants";

const useStyles = makeStyles({
  largeIcon: {
    width: "80px",
    height: "80px",
  },
  mainbar: {
    fontFamily: Const.fontFamily,
  },
  box_nav: {
    flexGrow: 1,
    display: { xs: "none", md: "flex" },
    backgroundColor: Const.appColor,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginLeft: 75,
  },
  foodApp: {
    fontSize: "28px !important",
    color: Const.whiteColor,
    display: "block",
    fontFamily: Const.fontFamily,
    fontWeight: Const.fontWeight,
  },
  emailbtn: {
    marginRight: "-300px",
    fontFamily: Const.fontFamily,
  },
  homelink: {
    textDecoration: "none",
    backgroundColor: Const.appColor,
  },
  homebtn: {
    my: 1,
    fontSize: "20px !important",
    color: Const.whiteColor,
    textDecoration: "none",
    display: "block",
    textTransform: "capitalize !important",

    fontFamily: Const.fontFamily,
  },
  orderHist_link: {
    textDecoration: "none",
    backgroundColor: Const.appColor,
  },
  orderHist_btn: {
    my: 1,
    fontSize: "20px !important",
    color: Const.whiteColor,
    textDecoration: "none",
    display: "block",
    textTransform: "capitalize !important",
    fontFamily: Const.fontFamily,
  },
  loggedEmail: {
    my: 1,
    color: Const.whiteColor,
    textDecoration: "none",
    fontSize: "20px !important",
    backgroundColor: Const.appColor,
    textTransform: "lowercase !important",
    fontFamily: Const.fontFamily,
  },
  cartButton: {
    // my: 1,
    fontSize: "20px !important",
    color: Const.whiteColor,
    display: "block",
    // minWidth: "0px",
    // padding: "0px",
  },
  cartIcon: {
    fontSize: "30px !important",
    color: Const.whiteColor,
  },
  logoutbtn: {
    my: 2,
    fontSize: "25px !important",
    color: Const.whiteColor,
    display: "block",
    textTransform: "capitalize",
    marginTop: "auto !important",
    marginBottom: "4px !important",
  },
  logoutIcon: {
    fontSize: "30px !important",
    color: Const.whiteColor,
    // marginTop: "10px !important",
  },
  box2: {
    width: 300,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: "80px",
  },
  box2Btn: {
    my: 2,
    fontSize: "20px !important",
    color: Const.whiteColor,
    display: "block",
    textTransform: "capitalize !important",
    fontFamily: Const.fontFamily,
    textDecoration: "none !important",
  },
  signup_btn: {
    my: 2,
    fontSize: "20px !important",
    color: Const.whiteColor,
    display: "block",
    textTransform: "capitalize !important",
    fontFamily: Const.fontFamily,
    textDecoration: "none !important",
  },
  signin_btn: {
    my: 2,
    fontSize: "20px !important",
    color: Const.whiteColor,
    display: "block",
    textTransform: "capitalize !important",
    fontFamily: Const.fontFamily,
  },
  emailNav: {
    width: 700,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "baseline",
  },
  container_nav: {
    backgroundColor: Const.appColor,
    position: "sticky",
  },
  header_nav: {
    position: "sticky",
    top: 0,
    background: Const.appColor,
  },
  img_nav: {
    height: "50px",
    width: "50px",
    marginRight: "20px",
  },
  round_image1: {
    height: "50px",
    width: "50px",
    borderRadius: "50%",
  },
  cart: {
    fontSize: "13px",
    backgroundColor: "red",
    width: "20px",
    borderRadius: "50%",
    marginTop: "-20px",
    textAlign: "center",
    padding: "0px",
  },
  linkLine: {
    textDecoration: "none !important",
  },
});

const pages = ["Register", "Login"];

const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);

  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  const [isregister, setIsregister] = useState(false);

  const cart = useSelector((state) => state);

  const [email, setEmail] = useState([]);

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem("email"));
    if (email) {
      setEmail(email);
    }
    console.log("USER EMAIL is", email);
  }, []);

  useEffect(() => {
    getUsers();
  }, []); // If empty Array, this dependency will run only one time

  const getUsers = async () => {
    const data = await Fetch_Data.getAllData();
    console.log(data.docs);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.setItem("email", JSON.stringify([]));
      localStorage.setItem("email1", JSON.stringify([]));
      localStorage.setItem("contact", JSON.stringify([]));
      localStorage.setItem("firstname", JSON.stringify([]));
      localStorage.setItem("order_details", JSON.stringify([]));
      localStorage.setItem("restaurant_data", JSON.stringify([]));
      localStorage.setItem("cart", JSON.stringify([]));
      navigate("/");
      setTimeout(function () {
        window.location.reload();
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log("authentication", auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      // onAuthStateChanged will run only once when the component gets mounted
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe(); // Clean up function
    };
  }, []);

  useEffect(() => {
    users.map((item, i) => {
      if (user?.email === item?.email) {
        localStorage.setItem("email1", JSON.stringify(item.email));
        console.log(item.email);
        localStorage.setItem("firstname", JSON.stringify(item.firstname));
        console.log(item.firstname);
        localStorage.setItem("contact", JSON.stringify(item.contact));
        console.log(item.contact);
      }
    });
  });

  console.log("user -->", user);

  return (
    <AppBar position="static" className={classes.mainbar}>
      <header className={classes.header_nav}>
        <Container maxWidth="xxl" className={classes.container_nav}>
          <Toolbar disableGutters>
            <Box className={classes.box_nav}>
              <img src={logo_delivery} alt="Logo" className={classes.img_nav} />

              <Button className={classes.foodApp}>FOOD DELIVERY APP</Button>
            </Box>

            <Box className={classes.emailbtn}>
              {email.length !== 0 && auth.currentUser && (
                <div className={classes.emailNav}>
                  <Link to="/" className={classes.homelink}>
                    <Button className={classes.homebtn}>Home</Button>
                  </Link>
                  <Link to="/order_history" className={classes.orderHist_link}>
                    <Button className={classes.orderHist_btn}>
                      Order History
                    </Button>
                  </Link>

                  {email.length !== 0 &&
                    users.map((item, i) =>
                      user?.email === item?.email ? (
                        <div key="id">
                          <Button className={classes.loggedEmail}>
                            {item.email}
                          </Button>
                          <img
                            src={item.photo}
                            alt="Profile picture"
                            className={classes.round_image1}
                          />
                        </div>
                      ) : null
                    )}

                  <Link to="/cart">
                    <Button className={classes.cartButton}>
                      <ShoppingCartCheckoutIcon
                        iconStyle={useStyles.largeIcon}
                        className={classes.cartIcon}
                      ></ShoppingCartCheckoutIcon>
                      <span className={classes.cart}>
                        {cart && cart.length}
                      </span>
                      {/* <span className="cart_items">{cart && cart.length}</span> */}
                    </Button>
                  </Link>

                  <Button className={classes.logoutbtn} onClick={handleLogout}>
                    <PowerSettingsNewSharpIcon className={classes.logoutIcon} />
                  </Button>
                </div>
              )}
            </Box>

            <Box className={classes.box2}>
              {email.length === 0 && (
                <Link to="/" className={classes.linkLine}>
                  <Button className={classes.box2Btn}>Home</Button>
                </Link>
              )}

              {email.length === 0 && (
                <Link to="/register_new" className={classes.linkLine}>
                  <Button className={classes.signup_btn}>Sign up</Button>
                </Link>
              )}

              {email.length === 0 && (
                <Link to="/login" className={classes.linkLine}>
                  <Button
                    className={classes.signin_btn}
                    onClick={() => {
                      setIsregister(true);
                    }}
                  >
                    Sign in
                  </Button>
                </Link>
              )}
            </Box>
          </Toolbar>
        </Container>
      </header>
    </AppBar>
  );
};

export default Navbar;
