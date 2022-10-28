import React from "react";
import "./mymodal.css";
import close from "../../images/close.jfif";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Const } from "../../assets/styles/Constants";

const useStyles = makeStyles({
  modal_main_box: {
    position: "absolute",
    background: Const.whiteColor,
    fontFamily: Const.fontFamily,
    top: "50%",
    left: "50%",
    top: "0px",
    bottom: "0px",
    left: "0px",
    right: "0px",
    width: "30%",
    margin: "auto",
    height: "440px",
    borderRadius: Const.borderRadius20,
    boxShadow: "2px 4px 10px 1px rgb(201 201 201 / 47%)",
  },
  modal_header_box: {
    borderRadius: "20px 20px 0px 0px",
  },
  menu_details_div: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 20px",
  },
  menu_details_h2: {
    color: Const.appColor,
    marginBottom: "20px",
  },
  xbutton_box: {
    height: "30px",
    width: "30px",
    cursor: "pointer",
    fontSize: "30px",
    marginTop: "-50px",
    marginRight: "-10px",
  },
  button_divs: {
    color: "blue",
    textAlign: "center",
    height: "40px",
    marginTop: "-25px",
  },
  button1: {
    padding: "8px",
    width: "60px",
    borderStyle: "none",
    backgroundColor: Const.appColor,
    fontSize: "20px",
    color: Const.whiteColor,
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: Const.fontWeight,
  },
});

const Modal_box = ({ handleClose1, show1, children }) => {
  const classes = useStyles();
  const showHideClassName = show1
    ? "modal display-block"
    : "modal display-none";

  return (
    <div
      className={showHideClassName}
      style={{ opacity: "0.5", backgroundColor: "rgba(186, 173, 147, 0.2)" }}
    >
      <div className={classes.modal_main_box}>
        <div className={classes.modal_header_box}>
          <div className={classes.menu_details_div}>
            <h2 className={classes.menu_details_h2}>
              <b>Menu Details</b>
            </h2>
            <img
              src={close}
              alt="close"
              className={classes.xbutton_box}
              onClick={handleClose1}
            />
          </div>
        </div>

        {children}

        <div className={classes.button_divs}>
          <button
            variant="contained"
            aria-label="outlined primary button group"
            type="button"
            onClick={handleClose1}
            className={classes.button1}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal_box;
