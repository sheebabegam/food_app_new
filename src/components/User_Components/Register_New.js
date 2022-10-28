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
// import "../style.css";
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
    <div className={classes.register_div}>
      <div className={classes.plate_img}>
        <div className={classes.plate_img1}>
          <img src={side_img} alt="plate_image" className={classes.sideimg} />
        </div>

        <div className={classes.register_div}>
          <div className={classes.register_text}>
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
                <div className={classes.special_menu_div}>
                  <div className={classes.special_menu_sub_div}>
                    <Typography className={classes.special_typo}>
                      Today's special Menu
                    </Typography>
                  </div>
                  <div className={classes.special_menu}>
                    <div>
                      <img
                        src={special1}
                        alt="special1"
                        className={classes.special}
                      />
                      <Typography className={classes.menu_typo}>
                        Aloo Parata
                      </Typography>
                    </div>
                    <div>
                      <img
                        src={special2}
                        alt="special2"
                        className={classes.special}
                      />
                      <Typography className={classes.menu_typo}>
                        Chicken Biriyani
                      </Typography>
                    </div>
                    <div>
                      <img
                        src={special3}
                        alt="special3"
                        className={classes.special}
                      />
                      <Typography className={classes.menu_typo}>
                        Spicy Noodles
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.reg_form_div}>
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
                    <div className={classes.loaded_img_sec}>
                      <img
                        name="photo"
                        src={
                          imageUpload
                            ? URL.createObjectURL(imageUpload)
                            : user_icon
                        }
                        alt={imageUpload ? imageUpload.name : null}
                        className={classes.round_image}
                      />

                      <div className={classes.profile_pic_div}>
                        <label for="icon_img" className={classes.button1}>
                          <MonochromePhotosIcon />
                        </label>
                        <input
                          type="file"
                          id="icon_img"
                          onChange={(e) => {
                            setImageUpload(e.target.files[0]);
                          }}
                          name="photo"
                          className={classes.img_read}
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
                      inputProps={{
                        style: { color: "black" },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "black",
                          fontFamily: "cursive",
                          // fontFamily: Const.fontFamily,
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
                          // fontFamily: Const.fontFamily,
                          fontFamily: "cursive",
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
                          // fontFamily: Const.fontFamily,
                          fontFamily: "cursive",
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
                      label="Password"
                      name="password"
                      inputProps={{ style: { color: "black" } }}
                      InputLabelProps={{
                        style: {
                          color: "black",
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
  register_div: {
    backgroundColor: "#f6f6fdfa",
  },
  menu_typo: {
    fontFamily: Const.fontFamily,
    color: Const.appColor,
  },
  reg_form_div: {
    marginBottom: "80px",
    marginLeft: "100px",
    borderRadius: Const.borderRadius20,
  },
  register_text: {
    margin: "-800px 0px",
    marginLeft: "100px",
  },
  special_menu_div: {
    borderRadius: "10px",
    width: "600px",
    marginTop: "220px",
  },
  img_read: {
    display: "none",
    visibility: "none",
  },
  special: {
    height: "100px",
    width: "150px",
    borderRadius: "50%",
    height: "150px",
    width: "160px",
  },
  special_menu_sub_div: {
    fontSize: "40px",
    fontFamily: Const.fontFamily,
  },
  special_typo: {
    fontSize: "40px !important",
    fontFamily: Const.fontFamily,
    color: Const.appColor,
  },
  special_menu: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100px",
    width: "100%",
    marginTop: "100px",
  },
  plate_img: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginTop: "-218px",
    height: "100%",
    width: "100%",
  },
  loaded_img_sec: {
    width: "100px",
    height: "100px",
    margin: "auto",
  },
  round_image: {
    height: "100%",
    width: "100%",
    borderRadius: "50%",
    objectFit: "cover",
  },
  profile_pic_div: {
    marginTop: "-45px",
    marginLeft: "75px",
  },
  plate_img1: {
    display: "inline",
  },
  sideimg: {
    height: "1090px",
    width: "520px",
    objectFit: "fill",
  },
  signinLink: {
    color: "#410ff7",
    fontWeight: Const.fontWeight,
    fontFamily: Const.fontFamily,
  },
  fields: {
    fontFamily: Const.fontFamily,
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
    fontWeight: Const.fontWeight,
  },
  containers: {
    borderRadius: Const.borderRadius20,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
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
      // color: textLight,
      color: Const.whiteColor,
      fontWeight: Const.fontWeight,
    },
  },
  paper1: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    display: "flex",
    flexDirection: "column",
    borderRadius: Const.borderRadius20,
    alignItems: "center",
    boxShadow: ".2px .1px 4px 1px rgba(131,153,167,0.6)",
    "&:hover": {
      boxShadow: "0px 0px 6px 5px rgba(131,153,167,0.99)",
    },
  },
  button1: {
    border: "0px",
    padding: "14px 3px !important",
    fontSize: "4rem",
    fontFamily: "monospace",
    boxShadow: "0px 5px 10px rgba(darken(dodgerblue, 40%))",
    transition: "all 0.25s",
    cursor: "pointer",
    borderRadius: "5px",
    borderBottom: "4px solid lighten(gray, 70%) !important",
    fontSize: "20px",

    "&:hover": {
      boxShadow: "0px 15px 25px -5px rgba(darken(dodgerblue, 40%))",
      transform: "scale(1.03)",
    },

    "&:active": {
      transform: "scale(0.98)",
    },
  },
}));
