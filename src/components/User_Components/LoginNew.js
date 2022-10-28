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
import LockOpenIcon from "@mui/icons-material/LockOpen";
// import final_log from "../../images/final_log.jpg";
import { Link } from "react-router-dom";
import ReusableInput from "./ReusableInput";
import "../style.css";
import axios from "axios";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import log_new from "../../images/log_new.jpg";
import log from "../../images/log.png";
import { Const } from "../../assets/styles/Constants";

const orange = "#F2A74B";

function LoginNew() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  //   const { logIn, googleSignIn } = useUserAuth();

  useEffect(() => {
    localStorage.setItem("email", JSON.stringify(email));
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password).then((res) => {
        console.log(res.user);
        navigate("/");
      });
    } catch (err) {
      setError(err.message);
      // navigate("/");
    }
    await setTimeout(function () {
      window.location.reload();
    });
  };
  return (
    <div className={classes.login_div}>
      <div className={classes.login_logo_div}>
        <img src={log} alt="log" className={classes.login_logo} />
      </div>
      <div className={classes.login_new}>
        <div>
          <img src={log_new} alt="Login" className={classes.login_img} />
        </div>
        <div>
          <Grid item xs={10} className={classes.grids}>
            <Container
              component="main"
              justify="flex-end"
              className={classes.containers}
            >
              <CssBaseline />
              <div className={classes.paper1}>
                <Avatar className={classes.avatar}>
                  <LockOpenIcon />
                </Avatar>
                <Typography
                  component="h1"
                  variant="h5"
                  className={classes.register}
                >
                  Sign In
                </Typography>
                <div className={classes.paper} id="form_inside_sec">
                  <form className={classes.form} onSubmit={handleSubmit}>
                    <ReusableInput
                      className={classes.fields}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      type="email"
                      id="email"
                      label="Email"
                      name="email"
                      sx={{ borderRadius: "10px" }}
                      InputLabelProps={{
                        style: {
                          // fontFamily: Const.fontFamily,
                          fontFamily: "cursive",
                        },
                      }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <ReusableInput
                      className={classes.fields}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      type="password"
                      id="password"
                      label="Password"
                      name="password"
                      InputLabelProps={{
                        style: {
                          // fontFamily: Const.fontFamily,
                          fontFamily: "cursive",
                        },
                      }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      data-toggle="modal"
                    >
                      Submit
                    </Button>
                    <br />
                    <br />

                    <Typography className={classes.signupTypo}>
                      Don't have an account? Please &nbsp;
                      <Link to="/register_new" className={classes.signupLink}>
                        Sign up
                      </Link>
                    </Typography>
                  </form>
                </div>
              </div>
            </Container>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default LoginNew;

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    height: 844,
    justifyContent: "flex-start",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    alignContent: "stretch",
    [theme.breakpoints.down("sm")]: {
      alignContent: "flex-start",
    },
  },
  login_div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgb(255, 245, 238)",
  },
  login_logo_div: {
    marginLeft: "-45px",
    marginTop: "-100px",
  },
  login_logo: {
    height: "980px",
    width: "650px",
    backgroundColor: "rgb(255, 245, 238)",
  },
  login_new: {
    width: "auto",
    height: "870px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(255, 245, 238)",
    marginRight: "-107px",
  },
  login_img: {
    height: "550px",
    width: "600px",
    borderRadius: Const.borderRadius20,
    boxShadow: "2px 4px 10px 1px rgb(201 201 201 / 47%)",
  },
  signupLink: {
    color: "#410ff7",
    fontWeight: Const.fontWeight,
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
  signupTypo: {
    fontFamily: Const.fontFamily,
  },
  paper1: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    borderRadius: Const.borderRadius20,
    alignItems: "center",
    boxShadow: "2px 4px 10px 1px rgb(201 201 201 / 47%)",
    backgroundColor: Const.whiteColor,
    marginLeft: "-244px",
    marginRight: " 221px",
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: Const.whiteColor,
  },
  grids: {
    width: "400px",
  },

  colors: {
    color: "#d5cece",
    textAlign: "center",
    borderColor: Const.whiteColor,
  },
  register: {
    fontWeight: Const.fontWeight,
    fontFamily: Const.fontFamily,
  },
  register1: {
    color: Const.whiteColor,
  },
  fields: {
    borderRadius: 10,
    ".MuiInputLabel-outlined": {
      color: Const.whiteColor,
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
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  button: {
    color: Const.whiteColor,
    position: "relative",
    fontFamily: Const.fontFamily,
    fontWeight: Const.fontWeight,
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
      color: Const.whiteColor,
      fontWeight: Const.fontWeight,
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
      color: Const.whiteColor,
      fontWeight: Const.fontWeight,
    },
    "&:hover::before": {
      transform: "scale(1,1)",
      transition: "transform cubic-bezier(0.85,.36,.8,.42) 0.3s",
    },
    "&:hover::after": {
      transform: "scale(1,1)",
      transition: "transform cubic-bezier(0.85,.36,.8,.42) .2s",
      color: Const.whiteColor,
      fontWeight: Const.fontWeight,
    },
    "&::first-letter": {
      color: orange,
    },
    "&:hover": {
      background: "rgba(169,198,217,0.8)",
      color: Const.whiteColor,
      fontWeight: Const.fontWeight,
    },
  },
}));
