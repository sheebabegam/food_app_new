import React from "react";
import "./mode.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Const } from "../../assets/styles/Constants";
import close from "../../images/close.jfif";

const useStyles = makeStyles({
  modal_main_alert: {
    position: "absolute",
    background: Const.whiteColor,
    top: "50%",
    left: "50%",
    width: "30%",
    top: "0px",
    bottom: "0px",
    left: "0px",
    right: "0px",
    margin: "auto",
    height: "253px",
    borderRadius: Const.borderRadius20,
    boxShadow: "2px 4px 10px 1px rgb(201 201 201 / 47%)",
  },
  modal_header_alert: {
    padding: "20px",
    borderRadius: "20px 20px 0px 0px",
  },
  modal_header_alert1: {
    display: "inline-block",
    justifyContent: "end",
    alignItems: "center",
  },
  button_div: {
    color: "blue",
    textAlign: "center",
  },
  button: {
    backgroundColor: Const.appColor,
    fontSize: "15px",
    color: "white",
    borderRadius: "10px !important",
    cursor: "pointer",
    marginTop: "-15px",
    marginBottom: "17px",
  },
  xbutton: {
    height: "30px",
    width: "30px",
    cursor: "pointer",
    fontSize: "30px",
    marginLeft: "512px",
    marginTop: "-18px",
  },
});

const Modal_alert = ({ handleClose, show, children }) => {
  const classes = useStyles();
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const navigate = useNavigate();

  const toLogin = () => {
    navigate("/login");
  };

  return (
    <div className={showHideClassName} style={{ backgroundColor: "#999294c2" }}>
      <div
        className={classes.modal_main_alert}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className={classes.modal_header_alert}>
          <div className={classes.modal_header_alert1}>
            <img
              src={close}
              alt="close"
              className={classes.xbutton}
              onClick={handleClose}
            />
          </div>
          <span className="bi bi-emoji-frown green-color-alert"></span>
        </div>

        {children}

        <div className={classes.button_div}>
          <Button
            variant="contained"
            aria-label="outlined primary button group"
            type="button"
            onClick={toLogin}
            className={classes.button}
          >
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal_alert;
