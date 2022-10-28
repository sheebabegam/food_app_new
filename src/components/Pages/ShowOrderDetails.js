import React from "react";
import { useLocation } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Const } from "../../assets/styles/Constants";
// import "../style.css";

const useStyles = makeStyles({
  flex1: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  main_shadow: {
    width: "27.2%",
    boxShadow: "2px 4px 10px 1px rgb(201 201 201 / 47%)",
    margin: "20px 83px",
    padding: "10px 0px",
    marginTop: "50px",
    paddingBottom: "50px",
    borderRadius: "30px",
    fontFamily: Const.fontFamily,
  },
  order_detail: {
    color: Const.appColor,
    textAlign: "left",
    padding: " 0px 40px",
    marginLeft: "35px",
    paddingTop: "50px",
    fontWeight: Const.fontWeight,
  },
  orderid_p: {
    textAlign: "left",
    marginLeft: "80px",
    marginTop: "30px",
  },
  orderid_mark: {
    backgroundColor: "#b7a8f0",
    borderRadius: "10px",
  },
  noitems_para: {
    textAlign: "left",
    marginLeft: "80px",
  },
  menu_flex: {
    textAlign: "left",
    padding: "20px 30px",
    marginLeft: "50px",
    marginBottom: " 0px",
    paddingBottom: "0px",
    paddingTop: " 0px",
  },
  menu_flex_p: {
    display: "inline-block !important",
    width: "102px !important",
  },
  qty_h6: {
    fontSize: "12px",
    display: "inline-block",
    marginLeft: "20px",
    marginTop: "-7px",
  },
  item_price: {
    marginLeft: "-39px",
  },
  deli_fees_para: {
    width: "102px",
  },
  marLeft_96: {
    marginLeft: "96px",
  },
  total_p: {
    width: "100px",
  },
  label: {
    display: "flex",
    alignItems: "center",
  },
  marLeft_gst: {
    marginLeft: "166px",
  },
  marLeft_cgst: {
    marginLeft: "157px",
  },
});

function Show_Order_Details(props) {
  const classes = useStyles();
  console.log("PROPS -->", props);
  const location = useLocation();

  console.log("Location Orders are ====> ", location.state.id);
  const menu_length = location.state.id.menus;

  console.log(menu_length);
  return (
    <div className={classes.flex1}>
      <div className={classes.main_shadow}>
        <h4 className={classes.order_detail}>Order Details</h4>
        <p className={classes.orderid_p}>
          Order Id:{" "}
          <mark className={classes.orderid_mark}>
            {location.state.id.order_id}
          </mark>
        </p>
        <p className={classes.noitems_para}>
          {" "}
          No.of Items:
          {menu_length.length}
        </p>
        <br />

        <div className={classes.menu}>
          {location.state.id.menus.map((items) => {
            return (
              <div>
                <div className={classes.menu_flex}>
                  <label className={classes.label}>
                    <p className={classes.menu_flex_p}>{items.menu_name}</p>{" "}
                    <h6 className={classes.qty_h6}> &#x2715; &nbsp;</h6>{" "}
                    <p className={classes.menu_flex_p}> {items.quantity}</p>
                    <p className={classes.item_price}>
                      : Rs.
                      {items.menu_price * items.quantity}
                    </p>
                  </label>
                </div>
              </div>
            );
          })}
          <hr />
          <div className={classes.menu_flex}>
            <label className={classes.label}>
              <p className={classes.menu_flex_p}>Item Total</p>{" "}
              <p className={classes.marLeft_96}>
                : Rs.{location.state.id.totalPrice}
              </p>
            </label>{" "}
            <br />
            <label className={classes.label}>
              <p className={classes.deli_fees_para}>Delivery Fees</p>{" "}
              <p className={classes.marLeft_96}>
                : Rs.{location.state.id.delivery_fee}
              </p>
            </label>{" "}
            <br />
            <label className={classes.label}>
              <p>GST</p>{" "}
              <p className={classes.marLeft_gst}>
                : Rs.{location.state.id.tax[0].taxamount}
              </p>{" "}
            </label>{" "}
            <br />
            <label className={classes.label}>
              <p>CGST</p>{" "}
              <p className={classes.marLeft_cgst}>
                : Rs.{location.state.id.tax[1].taxamount}
              </p>{" "}
            </label>
          </div>

          <hr />

          <div className={classes.menu_flex}>
            <label className={classes.label}>
              <p className={classes.total_p}>Total amount</p>{" "}
              <p className={classes.marLeft_96}>
                : Rs.{location.state.id.clear_amount}
              </p>{" "}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Show_Order_Details;
