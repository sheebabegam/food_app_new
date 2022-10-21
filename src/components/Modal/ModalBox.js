import React from "react";
import "./mymodal.css";
import close from "../../images/close.jfif";

const Modal_box = ({ handleClose1, show1, children }) => {
  const showHideClassName = show1
    ? "modal display-block-box"
    : "modal display-none-box";

  return (
    <div
      className={showHideClassName}
      //   style={{ backgroundColor: "rgba(153, 146, 148, 0.4)" }}
      style={{ opacity: "0.5", backgroundColor: "rgba(186, 173, 147, 0.2)" }} //background-color: #baad96;
    >
      <div className="modal-main-box">
        <div
          className="modal_header-box"
          style={{ borderRadius: "20px 20px 0px 0px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 20px",
            }}
          >
            <h2 style={{ color: "#6439ff", marginBottom: "20px" }}>
              <b>Menu Details</b>
            </h2>
            <img
              src={close}
              alt="close"
              className="xbutton-box"
              onClick={handleClose1}
              style={{
                height: "30px",
                width: "30px",
                cursor: "pointer",
                fontSize: "30px",
                marginTop: "-50px",
                marginRight: "-10px",
              }}
            />
          </div>
        </div>

        {children}

        <div
          style={{
            color: "blue",
            textAlign: "center",
            height: "40px",
            marginTop: "-25px",
          }}
        >
          <button
            variant="contained"
            aria-label="outlined primary button group"
            type="button"
            onClick={handleClose1}
            style={{
              padding: "8px",
              width: "60px",
              borderStyle: "none",
              backgroundColor: "#6439ff",
              fontSize: "20px",
              color: "white",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal_box;
