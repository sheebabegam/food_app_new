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
import { v4 } from "uuid";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { toast } from "react-toastify";
import user_icon from "../../images/user_icon.png";
import MonochromePhotosIcon from "@mui/icons-material/MonochromePhotos";
import side_img from "../../images/side_img.png";
import special1 from "../../images/special1.jpg";
import special2 from "../../images/special2.jpg";
import special3 from "../../images/special3.jpg";

function Register_New(props) {
  const classes = useStyles();
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState();

  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState();

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls(url);
        console.log("url isssss", url);
      });
    });
  };

  const saveChange = async (e) => {
    uploadFile();
    e.preventDefault();

    await addDoc(collection(props.db, "user-data"), {
      firstname: firstname,
      lastname: lastname,
      contact: contact,
      email: email,
      password: password,
      // photo: String(imageUrls),
      photo: imageUrls,
    })
      .then(function (res) {
        alert("User details are added successfully");
      })
      .catch(function (err) {
        // alert("Details cannot be added");
      });

    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (res) => {
          console.log(res.user);
        }
      );
    } catch (err) {
      setError(err.message);
    }

    navigate("/login");
    window.location.reload();
  };
  console.log("Image URLs --->", imageUrls);
  console.log("Upload", imageUpload);
  return (
    <div style={{ backgroundColor: "#f6f6fdfa" }}>
      <div className="plate_img" style={{ height: "100%", width: "100%" }}>
        <div className="plate_img1">
          <img
            src={side_img}
            alt="plate_image"
            style={{
              height: "1090px",
              width: "520px",
              objectFit: "fill",
            }}
          />
        </div>

        <div className="register_div">
          <div className="register_text">
            <div>
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

              <div>
                <div
                  style={{
                    borderRadius: "10px",
                    width: "600px",
                    marginTop: "220px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "40px",
                      fontFamily: "cursive",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "40px",
                        fontFamily: "cursive",
                        color: "#6439ff",
                      }}
                    >
                      Today's special Menu
                    </Typography>
                  </div>
                  <div className="special_menu">
                    <div>
                      <img
                        src={special1}
                        alt="special1"
                        style={{ height: "150px", width: "160px" }}
                        className="special"
                      />
                      <Typography style={{ fontFamily: "cursive" }}>
                        Aloo Parata
                      </Typography>
                    </div>
                    <div>
                      <img
                        src={special2}
                        alt="special2"
                        style={{ height: "150px", width: "160px" }}
                        className="special"
                      />
                      <Typography style={{ fontFamily: "cursive" }}>
                        Chicken Biriyani
                      </Typography>
                    </div>
                    <div>
                      <img
                        src={special3}
                        alt="special3"
                        style={{ height: "150px", width: "160px" }}
                        className="special"
                      />
                      <Typography style={{ fontFamily: "cursive" }}>
                        Spicy Noodles
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            marginBottom: "80px",
            marginLeft: "100px",
            borderRadius: "20px",
          }}
        >
          <Grid item xs={10}>
            <Container
              component="main"
              maxWidth="600px"
              className={classes.containers}
              style={{ borderRadius: "20px" }}
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
                      style={{ fontFamily: "cursive" }}
                      inputProps={{ style: { color: "black" } }}
                      InputLabelProps={{
                        style: {
                          color: "black",
                          fontFamily: "cursive",
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
                      style={{ fontFamily: "cursive" }}
                      inputProps={{ style: { color: "black" } }}
                      InputLabelProps={{
                        style: {
                          color: "black",
                          fontFamily: "cursive",
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
                      style={{ fontFamily: "cursive" }}
                      inputProps={{ style: { color: "black" } }}
                      InputLabelProps={{
                        style: {
                          color: "black",
                          fontFamily: "cursive",
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
                      style={{ fontFamily: "cursive" }}
                      inputProps={{ style: { color: "black" } }}
                      InputLabelProps={{
                        style: {
                          color: "black",
                          fontFamily: "cursive",
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
                      style={{ fontFamily: "cursive" }}
                      inputProps={{ style: { color: "black" } }}
                      InputLabelProps={{
                        style: {
                          color: "black",
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
                      style={{ fontFamily: "cursive", fontWeight: "bold" }}
                    >
                      Submit
                    </Button>
                    <br />
                    <br />

                    <Typography
                      style={{ color: "black", fontFamily: "cursive" }}
                    >
                      Already have an account. Please{" "}
                      <Link
                        to="/login"
                        style={{
                          color: "#410ff7",
                          fontWeight: "bolder",
                          fontFamily: "cursive",
                        }}
                      >
                        Sign In
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

export default Register_New;

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
      borderColor: "pink",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#9c9a9a",
    },
  },
  fontFamily: "cursive",
});

const useStyles = makeStyles((theme) => ({
  grid1: {
    marginTop: theme.spacing(2),
    textShadow: "2.5px 2.5px rgb(201 201 201 / 47%)",
    fontFamily: "cursive",
  },
  fields: {
    fontFamily: "cursive",
  },
  subtitle: {
    color: "black",
    fontFamily: "cursive",
    // textShadow: "2px 2px rgb(201 201 201 / 47%)",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  register: {
    color: "black",
    fontFamily: "cursive",
    fontWeight: "bolder",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  paper1: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    display: "flex",
    flexDirection: "column",
    borderRadius: "20px",
    alignItems: "center",
    boxShadow: ".2px .1px 4px 1px rgba(131,153,167,0.6)",
    "&:hover": {
      boxShadow: "0px 0px 6px 5px rgba(131,153,167,0.99)",
    },
  },
}));
