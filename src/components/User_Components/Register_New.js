import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useNavigate, Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import "../style.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { auth, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import TextField from "@material-ui/core/TextField";
import { styled } from "@mui/material/styles";
import { v4 } from "uuid";
import user_icon from "../../images/user_icon.png";
import MonochromePhotosIcon from "@mui/icons-material/MonochromePhotos";
import side_img from "../../images/side_img.png";
import special1 from "../../images/special1.png";
import special2 from "../../images/special2.png";
import special3 from "../../images/special3.png";
import { Const } from "../../assets/styles/Constants";

const orange = "#F2A74B";

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
        // alert("User details are added successfully");
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
    <div className="register_div">
      <div className="plate_img">
        <div className="plate_img1">
          <img src={side_img} alt="plate_image" className="sideimg" />
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
                <div className="special_menu_div">
                  <div className="special_menu_sub_div">
                    <Typography className="special_typo">
                      Today's special Menu
                    </Typography>
                  </div>
                  <div className="special_menu">
                    <div>
                      <img src={special1} alt="special1" className="special" />
                      <Typography className="menu_typo">Aloo Parata</Typography>
                    </div>
                    <div>
                      <img src={special2} alt="special2" className="special" />
                      <Typography className="menu_typo">
                        Chicken Biriyani
                      </Typography>
                    </div>
                    <div>
                      <img src={special3} alt="special3" className="special" />
                      <Typography className="menu_typo">
                        Spicy Noodles
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="reg_form_div">
          <Grid item xs={10}>
            <Container
              component="main"
              maxWidth="600px"
              className={classes.containers}
              style={{}}
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

                      <div className="profile_pic_div">
                        <label for="icon_img" className="button">
                          <MonochromePhotosIcon />
                        </label>
                        <input
                          type="file"
                          id="icon_img"
                          onChange={(e) => {
                            setImageUpload(e.target.files[0]);
                          }}
                          name="photo"
                          className="img_read"
                        />
                      </div>
                    </div>
                    <ReusableInput
                      className={classes.fields}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      type="text"
                      label="First Name"
                      name="firstname"
                      inputProps={{ style: { color: "black" } }}
                      InputLabelProps={{
                        style: {
                          color: "black",
                          fontFamily: Const.fontFamily,
                        },
                      }}
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />

                    <ReusableInput
                      className={classes.fields}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      type="text"
                      label="Last Name"
                      name="lastname"
                      inputProps={{ style: { color: "black" } }}
                      InputLabelProps={{
                        style: {
                          color: "black",
                          fontFamily: Const.fontFamily,
                        },
                      }}
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                    <ReusableInput
                      className={classes.fields}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      type="text"
                      label="Contact"
                      name="contact"
                      inputProps={{ style: { color: "black" } }}
                      InputLabelProps={{
                        style: {
                          color: "black",
                          fontFamily: Const.fontFamily,
                        },
                      }}
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                    <ReusableInput
                      className={classes.fields}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      type="email"
                      label="Email"
                      name="email"
                      inputProps={{ style: { color: "black" } }}
                      InputLabelProps={{
                        style: {
                          color: "black",
                          fontFamily: Const.fontFamily,
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
                      label="Password"
                      name="password"
                      inputProps={{ style: { color: "black" } }}
                      InputLabelProps={{
                        style: {
                          color: "black",
                          fontFamily: Const.fontFamily,
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

                    <Typography className={classes.alreadyTypo}>
                      Already have an account. Please{" "}
                      <Link to="/login" className={classes.signinLink}>
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

const ReusableInput = styled(TextField)({
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
  fontFamily: Const.fontFamily,
});

const useStyles = makeStyles((theme) => ({
  grid1: {
    marginTop: theme.spacing(2),
    textShadow: "2.5px 2.5px rgb(201 201 201 / 47%)",
    fontFamily: Const.fontFamily,
  },
  signinLink: {
    color: "#410ff7",
    fontWeight: "bolder",
    fontFamily: Const.fontFamily,
  },
  fields: {
    fontFamily: "cursive !important",
  },
  subtitle: {
    color: "black",
    fontFamily: Const.fontFamily,
  },
  alreadyTypo: {
    color: "black",
    fontFamily: Const.fontFamily,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  register: {
    color: "black",
    fontFamily: Const.fontFamily,
    fontWeight: "bolder",
  },
  containers: {
    borderRadius: "20px",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  button: {
    color: "white",
    position: "relative",
    fontFamily: "cursive",
    fontWeight: "bold",
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
