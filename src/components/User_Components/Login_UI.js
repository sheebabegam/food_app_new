import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useNavigate } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { useForm } from "react-hook-form";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import final_log from "../../images/final_log.jpg";
import { Link } from "react-router-dom";
import ReusableInput from "./ReusableInput";
import "../style.css";
import axios from "axios";

const orange = "#F2A74B";
// const textLight = "#eaf2f4";

export default function Login_UI() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { register } = useForm();

  return (
    <div className={classes.root}>
      <Grid
        className={classes.paperContainer}
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
      >
        <Paper elevation={1} square className={classes.paper}>
          <Grid container>
            <Grid item xs={15}>
              <Container
                component="main"
                maxWidth="xs"
                justify="flex-end"
                className={classes.containers}
              >
                <CssBaseline />
                <div className={classes.paper1}>
                  <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography
                    component="h1"
                    variant="h5"
                    className={classes.register}
                  >
                    Sign In
                  </Typography>
                  <div className={classes.paper}>
                    <form className={classes.form}>
                      <ReusableInput
                        className={classes.fields}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="user_email"
                        label="Email"
                        name="user_email"
                        sx={{ borderRadius: "10px" }}
                        inputProps={{ style: { color: "white" } }}
                        InputLabelProps={{
                          style: {
                            color: "white",
                          },
                        }}
                        {...register("email", {
                          required: "Email is required",
                        })}
                      />

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={navigate("/send_otp")}
                        data-toggle="modal"
                      >
                        By OTP
                      </Button>

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={navigate("/login")}
                      >
                        By Password
                      </Button>
                    </form>
                  </div>
                </div>
              </Container>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    height: 844,
    justifyContent: "flex-start",
    paddingTop: 120,
    backgroundImage: `url(${final_log})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    alignContent: "stretch",
    [theme.breakpoints.down("sm")]: {
      alignContent: "flex-start",
    },
  },

  header: {
    padding: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  title: {
    color: theme.palette.primary.contrastText,
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    color: theme.palette.primary.contrastText,
  },

  paper1: {
    position: "relative",
    marginTop: theme.spacing(2),
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    display: "flex",
    flexDirection: "column",

    alignItems: "center",

    boxShadow: ".2px .1px 4px 1px rgba(131,153,167,0.6)",

    "&:hover": {
      boxShadow: "0px 0px 6px 5px rgba(255,255,255,0.99)",
    },
    borderRadius: 10,
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white !important",
  },
  grid1: {
    marginTop: theme.spacing(25),
  },
  colors: {
    color: "#d5cece",
    textAlign: "center",
    borderColor: "white",
  },
  register: {
    color: "white",
    fontWeight: "bold",
  },
  register1: {
    color: "white",
  },
  fields: {
    borderRadius: 10,
    ".MuiInputLabel-outlined": {
      color: "white",
    },
  },
  paper: {
    padding: 16,
    backgroundColor: "transparent",
    borderRadius: 10,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    display: "block",
    width: "auto",
    [theme.breakpoints.up(1000 + theme.spacing(3))]: {
      width: 1000,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  button: {
    color: "white",
    position: "relative",
    fontWeight: 400,
    fontFamily: "Raleway, sans-serif",
    overflow: "hidden",
    marginTop: theme.spacing(6),
    padding: `${theme.spacing(1.6)}px`,
    border: "none",
    borderRadius: "8px",
    letterSpacing: "3px",

    "&::before, &::after": {
      position: "absolute",
      content: '""',
      boxSizing: "border-box",
      borderRadius: "8px",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      opacity: 1,
      color: "white",
      fontWeight: "bolder",
    },
    "&::before": {
      borderBottom: "2px solid rgba(255,255,255,.58)",
      borderTop: "2px solid rgba(255,255,255,.58)",
      transform: "scale(0,1)",
    },
    "&::after": {
      borderLeft: "3px solid rgba(255,255,255,.58)",
      borderRight: "3px solid rgba(255,255,255,.58)",
      transform: "scale(1,0)",
      color: "white",
      fontWeight: "bolder",
    },
    "&:hover::before": {
      transform: "scale(1,1)",
      transition: "transform cubic-bezier(0.85,.36,.8,.42) 0.3s",
    },
    "&:hover::after": {
      transform: "scale(1,1)",
      transition: "transform cubic-bezier(0.85,.36,.8,.42) .2s",
      color: "white",
      fontWeight: "bolder",
    },
    "&::first-letter": {
      color: orange,
    },
    "&:hover": {
      background: "rgba(169,198,217,0.8)",
      // color: textLight,
      color: "white",
      fontWeight: "bolder",
    },
  },
}));

// Email Validation
// const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
// const isEmail = re.test(item.email);

// if (!isEmail) {
//     // e.preventDefault;
//     console.log('Invalid email address');
// }
