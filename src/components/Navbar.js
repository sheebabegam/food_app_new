import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import "./style.css";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Fetch_Data from "../Fetch_Data";
import PowerSettingsNewSharpIcon from "@mui/icons-material/PowerSettingsNewSharp";
import logo_delivery from "../images/logo_delivery.jpg";

const useStyles = makeStyles({
  box2: {
    // display: 'flex',
    // justifyContent: 'space-around',
    // alignItems: 'baseline'
  },
  // "& .MuiPaper-root": {
  //   position: "sticky",
  //   top: 0,
  //   zIndex: 100,
  // },
  largeIcon: {
    width: "80px",
    height: "80px",
  },
  mainbar: {
    fontFamily: "cursive",
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

  // console.log("USER EMAIL is", email);

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

      navigate("/");
      window.location.roload();
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

  // const email1 = localStorage.setItem(
  //   "email1",
  //   JSON.stringify(auth.currentUser.email)
  // );
  // console.log(email1);

  // const firstName = JSON.parse(localStorage.setItem("user.firstname"));
  // console.log(firstName);

  // const lastName = JSON.parse(localStorage.setItem("user.lastname"));
  // console.log(lastName);

  console.log("user -->", user);

  return (
    <AppBar position="static" className="mainbar">
      <header
        style={{
          background: "#6439ff",
          position: "sticky",
          top: 0,
        }}
      >
        <Container
          maxWidth="xxl"
          sx={{ backgroundColor: "#6439ff", position: "sticky" }}
        >
          <Toolbar disableGutters>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                backgroundColor: "#6439ff",
                marginLeft: 10,
              }}
            >
              {/* <Box>
                 <Link to="/">
                  <i
                    class="bi bi-house-door"
                    style={{
                      color: "white",
                      fontSize: "33px",
                    }}
                  ></i>
                </Link> 
                
              </Box> */}
              <img
                src={logo_delivery}
                alt="Logo"
                style={{ height: "50px", width: "50px", marginRight: "20px" }}
              />

              <Button
                sx={{
                  // my: 2,
                  fontSize: 28,
                  color: "white",
                  display: "block",
                  fontFamily: "cursive",
                  fontWeight: "bolder",
                }}
              >
                FOOD DELIVERY APP
              </Button>
            </Box>

            <Box sx={{ marginRight: "-300px", fontFamily: "cursive" }}>
              {email.length !== 0 && auth.currentUser && (
                <div
                  style={{
                    width: 700,
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "baseline",
                  }}
                >
                  <Link
                    to="/"
                    sx={{
                      textDecoration: "none",
                      backgroundColor: "#6439ff",
                    }}
                    className="link_underline"
                  >
                    <Button
                      sx={{
                        my: 1,
                        fontSize: 20,
                        color: "white",
                        textDecoration: "none",
                        display: "block",
                        textTransform: "capitalize",
                        fontFamily: "cursive",
                      }}
                    >
                      Home
                    </Button>
                  </Link>
                  <Link
                    to="/order_history"
                    sx={{
                      textDecoration: "none",
                      backgroundColor: "#6439ff",
                    }}
                    className="link_underline"
                  >
                    <Button
                      sx={{
                        my: 1,
                        fontSize: 20,
                        color: "white",
                        textDecoration: "none",
                        display: "block",
                        textTransform: "capitalize",
                        fontFamily: "cursive",
                      }}
                    >
                      Order History
                    </Button>
                  </Link>

                  {email.length !== 0 &&
                    users.map((item, i) =>
                      user?.email === item?.email ? (
                        <div key="id">
                          <Button
                            style={{
                              my: 1,
                              color: "white",
                              textDecoration: "none",
                              fontSize: 20,
                              backgroundColor: "#6439ff",
                              textTransform: "lowercase",
                              fontFamily: "cursive",
                            }}
                            className="link_underline"
                          >
                            {item.email}
                          </Button>
                          <img
                            src={item.photo}
                            alt="Profile picture"
                            className="round_image1"
                          />
                        </div>
                      ) : null
                    )}

                  <Link to="/cart" className="link_underline">
                    <Button
                      sx={{
                        my: 1,
                        fontSize: 20,
                        color: "white",
                        display: "block",
                        minWidth: "0px",
                        padding: "0px",
                      }}
                    >
                      <ShoppingCartCheckoutIcon
                        iconStyle={useStyles.largeIcon}
                        sx={{
                          fontSize: 30,
                          color: "white",
                        }}
                      ></ShoppingCartCheckoutIcon>

                      <span
                        className="cart-items"
                        style={{ fontFamily: "cursive" }}
                      >
                        {cart && cart.length}
                      </span>
                    </Button>
                  </Link>

                  <Button
                    className="link_underline"
                    sx={{
                      my: 2,
                      fontSize: 25,
                      color: "white",
                      display: "block",
                      textTransform: "capitalize",
                    }}
                    onClick={handleLogout}
                  >
                    <PowerSettingsNewSharpIcon
                      sx={{
                        fontSize: 30,
                        color: "white",
                      }}
                    />
                  </Button>
                </div>
              )}
            </Box>

            <Box
              sx={{
                width: 300,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginRight: "80px",
              }}
              className={classes.box2}
            >
              {email.length === 0 && (
                <Link to="/">
                  <Button
                    sx={{
                      my: 2,
                      fontSize: 20,
                      color: "white",
                      display: "block",
                      textTransform: "capitalize",
                    }}
                  >
                    Home
                  </Button>
                </Link>
              )}

              {email.length === 0 && (
                <Link to="/register_new">
                  <Button
                    sx={{
                      my: 2,
                      fontSize: 20,
                      color: "white",
                      display: "block",
                      textTransform: "capitalize",
                    }}
                  >
                    Sign up
                  </Button>
                </Link>
              )}

              {email.length === 0 && (
                <Link to="/login">
                  <Button
                    onClick={() => {
                      setIsregister(true);
                      // setLogin(true);
                      // setLogo(true);
                    }}
                    sx={{
                      my: 2,
                      fontSize: 20,
                      color: "white",
                      display: "block",
                      textTransform: "capitalize",
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

{
  /* <i
                  class="bi bi-house-door"
                  style={{
                    color: "white",
                    fontSize: "30px",
                  }}
                ></i> */
}
