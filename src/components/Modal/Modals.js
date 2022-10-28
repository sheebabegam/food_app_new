import React from "react";
import "./modal.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import green_tic from "../../images/green_tic.png";
import close from "../../images/close.jfif";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Const } from "../../assets/styles/Constants";

const useStyles = makeStyles({
  modal_main: {
    position: "absolute",
    background: Const.whiteColor,
    top: "0px",
    width: "33%",
    bottom: "0px",
    left: "0px",
    right: "0px",
    margin: "auto",
    height: "390px",
    borderRadius: Const.borderRadius20,
    boxShadow: "2px 4px 10px 1px rgb(201 201 201 / 47%)",
  },
  modal_header: {
    display: "flex",
    padding: "30px",
  },
  greenTick: {
    height: "100px",
    width: "100px",
    fontSize: "90px",
    marginLeft: "230px",
    marginTop: "-80px",
    borderRadius: "70%",
    backgroundColor: "green",
  },
  closeButton: {
    marginLeft: "228px",
    marginTop: "-20px",
    height: "30px",
    width: "30px",
    cursor: "pointer",
    fontSize: "30px",
  },
  button2_div: {
    textAlign: "center",
  },
  button2: {
    fontFamily: Const.fontFamily,
    backgroundColor: Const.appColor,
    height: "55px",
    width: "130px",
    fontSize: "20px !important",
    color: Const.whiteColor,
    borderRadius: "10px !important",
    cursor: "pointer",
    marginTop: "-15px",
    marginBottom: "17px",
  },
});

const Modals = ({ handleClose, show, children }) => {
  const classes = useStyles();
  const cart = useSelector((state) => state);
  const dispatch = useDispatch();

  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const navigate = useNavigate();

  const toHome = (product, data) => {
    navigate("/");
    dispatch({ type: "STORE_NAME_RESET", payload: product });
    localStorage.setItem("cart", JSON.stringify([]));
    localStorage.setItem("myproduct", JSON.stringify([]));
    localStorage.setItem("restaurant_data", JSON.stringify([]));
  };

  return (
    <div
      className={showHideClassName}
      style={{ backgroundColor: "rgba(153, 146, 148, 0.6)" }}
    >
      <div className={classes.modal_main}>
        <div className={classes.modal_header}>
          <img src={green_tic} alt="tick" className={classes.greenTick} />

          <img
            src={close}
            alt="close"
            className={classes.closeButton}
            onClick={handleClose}
          />
        </div>

        {children}

        <div className={classes.button2_div}>
          <Button
            variant="contained"
            aria-label="outlined primary button group"
            type="button"
            onClick={toHome}
            className={classes.button2}
          >
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modals;
