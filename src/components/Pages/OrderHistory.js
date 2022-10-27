import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style.css";
import Fetch_Data from "../../Fetch_Data";
import no_items from "../../images/no_items.jpg";
import { Typography } from "@mui/material";
import Fetch_Order from "../../Fetch_Order";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Const } from "../../assets/styles/Constants";

const useStyles = makeStyles({
  noitems_div: {
    marginTop: "100px",
  },
  no_items_img: {
    height: "300px",
    width: "300px",
  },
  no_items_para: {
    fontFamily: Const.fontFamily,
    fontSize: "35px",
    color: Const.appColor,
    fontWeight: Const.fontWeight,
    marginTop: "30px",
  },
  orderhist_div: {
    boxShadow: "2px 4px 10px 1px rgb(201 201 201 / 47%)",
    margin: "50px 83px",
    width: "90%",
    padding: "60px",
  },
  orderhist_h1: {
    color: Const.appColor,
    textAlign: "left",
    marginLeft: "35px",
    fontWeight: Const.fontWeight,
  },
  table_div: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  theads: {
    padding: "10px 30px",
  },
  trs: {
    color: Const.appColor,
    padding: "10px 30px",
    fontSize: "20px",
  },
  table_row: {
    boxShadow: "2px 4px 10px 1px rgb(201 201 201 / 47%)",
    backgroundColor: Const.whiteColor,
    padding: "20px 0px !important",
    marginBottom: "10px !important",
  },
  view_button: {
    backgroundColor: Const.whiteColor,
    fontFamily: Const.fontFamily,
    cursor: "pointer",
    color: Const.appColor,
    borderColor: Const.appColor,
    padding: "8px 20px",
  },
  tr: {
    padding: "10px !important",
    marginBottom: "10px",
  },
});

function Order_History() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [allOrderItem, setAllOrderItem] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await Fetch_Data.getAllData();
    console.log(data.docs);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  console.log("UUUUUUUUU  ----------->", users);

  var email1 = localStorage.getItem("email1", JSON.stringify(email1));
  var email_details = JSON.parse(email1);
  var firstname = localStorage.getItem("firstname", JSON.stringify(firstname));
  var firstname_details = JSON.parse(firstname);
  var contact = localStorage.getItem("contact", JSON.stringify(contact));
  var contact_details = JSON.parse(contact);

  useEffect(() => {
    getItems();
  }, []); // If empty Array, this dependency will run only one time

  const getItems = async () => {
    const data = await Fetch_Order.getAllItem();
    console.log(data.docs);
    setAllOrderItem(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  console.log("All order Items are", allOrderItem);

  const found = allOrderItem.find((element) => {
    return element.usercontact === contact_details;
  });

  console.log("Found is", found);

  console.log("All Orders --->", allOrderItem);

  return (
    <div>
      {found === undefined && (
        <div className={classes.noitems_div}>
          <img
            src={no_items}
            alt="No Items Found"
            className={classes.no_items_img}
          />
          <Typography className={classes.no_items_para}>
            No items found
          </Typography>
        </div>
      )}

      {found !== undefined && (
        <>
          <div className={classes.orderhist_div}>
            <h1 className={classes.orderhist_h1}>Order History</h1>

            <div className={classes.table_div}>
              <table
                style={{
                  borderCollapse: "separate",
                  borderSpacing: "0px 10px !important",
                  width: "95%",
                }}
                className="fixed-height fixed-width fixed-cell table-spacing"
              >
                <thead className={classes.theads}>
                  <tr className={classes.trs}>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Order details</th>
                  </tr>
                </thead>
                <tbody>
                  {allOrderItem &&
                    allOrderItem.map((item) => {
                      return (
                        <>
                          {item.orderitems.map((order, i) => {
                            if (
                              order?.customer_details?.customer_phone ===
                              contact_details
                            ) {
                              return (
                                <tr key={i} className={classes.table_row}>
                                  <td>{order?.order_id}</td>
                                  <td>{order?.date}</td>
                                  <td>{order?.time}</td>
                                  <td>
                                    <Link
                                      to={{ pathname: "/order_details" }}
                                      state={{ id: order }}
                                    >
                                      <button className={classes.view_button}>
                                        <b>View order</b>
                                      </button>
                                    </Link>
                                  </td>
                                </tr>
                              );
                            }
                          })}
                        </>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Order_History;
