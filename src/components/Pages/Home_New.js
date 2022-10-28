import React from "react";
import home_img from "../../images/home_img.png";
// import "../style.css";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import makeStyles from "@material-ui/core/styles/makeStyles";
import restaurant from "../Data/restaurant.json";
import { Link } from "react-router-dom";
import { Const } from "../../assets/styles/Constants";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "-588px",
    marginLeft: "300px",
  },

  mycontain: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  rest_name: {
    fontFamily: Const.fontFamily,
    fontWeight: Const.fontWeight,
    color: Const.appColor,
  },

  box: {
    marginRight: 50,
    borderRadius: 20,
    position: "relative",
    display: "flex",
    flexDirection: "column",

    alignItems: "center",

    boxShadow: "2px 4px 10px 1px rgb(201 201 201 / 47%) !important",

    // boxShadow: ".2px .1px 4px 1px rgba(131,153,150,0.3)",

    "&:hover": {
      boxShadow: "0px 0px 6px 5px rgba(131,153,167,0.99)",
    },
  },

  card: {
    width: 445,
    borderRadius: 20,
  },

  media: {
    height: 340,
  },

  action: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "13px",
  },
  viewmenu: {
    fontFamily: Const.fontFamily,
    fontWeight: Const.fontWeight,
    color: Const.appColor,
    border: "1px solid #6439ff",
    borderRadius: "10px",
    padding: "7px",
  },

  pick: {
    fontSize: 40,
  },

  fiCardContent: {
    color: "#ffffff",
    backgroundColor: "rgba(0,0,0,.24)",
  },
  fiCardContentTextSecondary: {
    color: "rgba(255,255,255,0.78)",
  },
  home_img: {
    height: "780px",
    width: "700px",
    marginLeft: "-1220px",
    marginTop: "-1px",
  },
  dish_num: {
    fontFamily: Const.fontFamily,
    fontSize: "40px",
    textTransform: "uppercase",
    marginLeft: "550px",
    marginTop: "-723px",
    fontWeight: Const.fontWeight,
  },
  spanMore: {
    color: Const.appColor,
  },
  small_text: {
    fontFamily: Const.fontFamily,
    fontSize: "20px",
    marginLeft: "550px",
  },
  linkLine: {
    textDecoration: "none !important",
  },
}));

function Home_New() {
  const classes = useStyles();
  return (
    <div className={classes.main_home}>
      <div className={classes.side_img}>
        <img src={home_img} alt="Image" className={classes.home_img} />
      </div>

      <div>
        <div>
          <br />
          <br />
          <p className={classes.dish_num}>
            More than <span className={classes.spanMore}>20,000</span> dishes to
            order!{" "}
          </p>
          <p className={classes.small_text}>
            Welcome to the biggest network of food order and delivery
          </p>
        </div>

        <Container className={classes.imageBack}>
          <Toolbar />

          <Container className={classes.container}>
            {restaurant.map((product) => {
              return (
                <Box className={classes.box}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <Link to={{ pathname: "/menu" }} state={{ id: product }}>
                        <CardMedia
                          className={classes.media}
                          image={product.res_image}
                          title={product.res_name}
                        />
                      </Link>
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          className={classes.rest_name}
                        >
                          {product.res_name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.action}>
                      <Link
                        to={{ pathname: "/menu" }}
                        state={{ id: product }}
                        className={classes.linkLine}
                      >
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => {
                            const restaurant_details = {
                              res_phone: product.res_phone,
                              res_name: product.res_name,
                              res_address: product.res_address,
                            };
                            localStorage.setItem(
                              "restaurant_data",
                              JSON.stringify(restaurant_details)
                            );
                          }}
                          className={classes.viewmenu}
                        >
                          View Menu
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Box>
              );
            })}
          </Container>
        </Container>
      </div>
    </div>
  );
}

export default Home_New;
