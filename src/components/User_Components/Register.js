import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useNavigate, Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import back from "../../images/back.jpg";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Fetch_Data from "../../Fetch_Data";
import "../style.css";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { auth, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import TextField from "@material-ui/core/TextField";
import { styled } from "@mui/material/styles";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import user_icon from "../../images/user_icon.png";
import MonochromePhotosIcon from "@mui/icons-material/MonochromePhotos";

const dummyImg = require("../../images/back.jpg");
const orange = "#F2A74B";
const textLight = "#eaf2f4";

export default function Register(props) {
  const classes = useStyles();
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState();

  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState(null);
  // const [file, setFile] = React.useState(null);
  // const fileHandler = (e) => {
  //   setImageUpload(e.target.files[0]);
  // };

  // console.log("First Name is --->", firstname);

  const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls(url);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls(url);
        });
      });
    });
  }, []);

  const saveChange = async (e) => {
    uploadFile();
    e.preventDefault();
    const form = e.target;
    console.log(props.db);
    await addDoc(collection(props.db, "user-data"), {
      firstname: firstname,
      lastname: lastname,
      contact: contact,
      email: email,
      password: password,
      //   photo: String(imageUrls),
      photo: imageUrls,
    })
      .then(function (res) {
        alert("User details are added successfully");
      })
      .catch(function (err) {
        alert("Details cannot be added");
      });

    await createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
      })
      .catch((err) => {
        console.log(err.message);
      });

    navigate("/login");
  };

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
            <Grid item xs={15} className={classes.colors}>
              <Typography variant="h2" className={classes.grid1}>
                Don't have an account?
              </Typography>
              <br />
              <br />
              <Typography variant="h5" className={classes.subtitle}>
                Register to access all the features of our service.
              </Typography>
              <Typography variant="h6" className={classes.subtitle}>
                Manage your business in one place. It's free.
              </Typography>
            </Grid>

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
                    Signup
                  </Typography>

                  <div className={classes.paper}>
                    <form className={classes.form} onSubmit={saveChange}>
                      <div className="loaded_img_sec">
                        <img
                          name="photo"
                          src={
                            imageUpload
                              ? URL.createObjectURL(imageUpload)
                              : user_icon
                          }
                          alt={imageUpload ? imageUpload.name : null}
                          className="round_image"
                        />

                        <div style={{ marginTop: "-45px", marginLeft: "75px" }}>
                          <label
                            for="icon_img"
                            style={{
                              color: "white",
                              fontSize: "20px",
                            }}
                            className="button"
                          >
                            <MonochromePhotosIcon />
                          </label>
                          <input
                            type="file"
                            id="icon_img"
                            onChange={(e) => {
                              setImageUpload(e.target.files[0]);
                            }}
                            name="photo"
                            style={{ display: "none", visibility: "none" }}
                          />
                        </div>
                      </div>
                      <CssTextField
                        className={classes.fields}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="text"
                        label="First Name"
                        name="firstname"
                        inputProps={{ style: { color: "white" } }}
                        InputLabelProps={{
                          style: {
                            color: "white",
                          },
                        }}
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                      />

                      <CssTextField
                        className={classes.fields}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="text"
                        label="Last Name"
                        name="lastname"
                        inputProps={{ style: { color: "white" } }}
                        InputLabelProps={{
                          style: {
                            color: "white",
                          },
                        }}
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                      />
                      <CssTextField
                        className={classes.fields}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="text"
                        label="Contact"
                        name="contact"
                        inputProps={{ style: { color: "white" } }}
                        InputLabelProps={{
                          style: {
                            color: "white",
                          },
                        }}
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                      />
                      <CssTextField
                        className={classes.fields}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="email"
                        label="Email"
                        name="email"
                        inputProps={{ style: { color: "white" } }}
                        InputLabelProps={{
                          style: {
                            color: "white",
                          },
                        }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <CssTextField
                        className={classes.fields}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        label="Password"
                        name="password"
                        inputProps={{ style: { color: "white" } }}
                        InputLabelProps={{
                          style: {
                            color: "white",
                          },
                        }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {/* <CssTextField type="file" /> */}
                      {/* <input id="filename" /> */}

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

                      <Typography style={{ color: "white" }}>
                        Already have an account. Please{" "}
                        <Link
                          to="/login"
                          style={{ color: "#410ff7", fontWeight: "bolder" }}
                        >
                          Sign In
                        </Link>
                      </Typography>
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

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#9c9a9a",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#9c9a9a",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#9c9a9a",
    },
    "&:hover fieldset": {
      borderColor: "yellow",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#9c9a9a",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    height: 873,
    justifyContent: "flex-start",
    backgroundImage: `url(${back})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    alignContent: "stretch",
    [theme.breakpoints.down("sm")]: {
      alignContent: "flex-start",
    },
  },
  user_icon: {
    backgroundImage: `url(${user_icon})`,
    height: "50px",
    width: "50px",
    borderRadius: 50,
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
    textShadow: "2px 2px rgb(201 201 201 / 47%)",
  },

  paper1: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    display: "flex",
    flexDirection: "column",

    alignItems: "center",

    boxShadow: ".2px .1px 4px 1px rgba(131,153,167,0.6)",

    "&:hover": {
      boxShadow: "0px 0px 6px 5px rgba(131,153,167,0.99)",
    },
  },

  notchedOutline: {
    borderWidth: "1px",
  },
  grid1: {
    marginTop: theme.spacing(2),
    textShadow: "2.5px 2.5px rgb(201 201 201 / 47%)",
  },
  colors: {
    color: "#d5cece",
    textAlign: "center",
  },
  register: {
    color: "white",
  },
  register1: {
    color: "#9c9a9a",
  },
  fields: {
    borderColor: "#9c9a9a",
    ".MuiInputLabel-outlined": {
      color: "white",
    },
  },
  paper: {
    padding: 16,
    backgroundColor: "transparent",
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
    marginTop: theme.spacing(3),
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
    },
    "&:hover::before": {
      transform: "scale(1,1)",
      transition: "transform cubic-bezier(0.85,.36,.8,.42) 0.3s",
    },
    "&:hover::after": {
      transform: "scale(1,1)",
      transition: "transform cubic-bezier(0.85,.36,.8,.42) .2s",
    },
    "&::first-letter": {
      color: orange,
    },
    "&:hover": {
      background: "rgba(169,198,217,0.8)",
      color: textLight,
    },
  },
  legend: {
    float: "unset",
  },
}));
