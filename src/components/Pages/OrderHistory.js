import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../style.css";
import { useDispatch, useSelector } from "react-redux";
import Fetch_Data from "../../Fetch_Data";
import no_items from "../../images/no_items.jpg";
import { Typography } from "@mui/material";
import Fetch_Order from "../../Fetch_Order";

function Order_History() {
  // var cart = useSelector((state) => state.addToCart);
  // const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [allOrderItem, setAllOrderItem] = useState([]);
  useEffect(() => {
    getUsers();
  }, []); // If empty Array, this dependency will run only one time

  const getUsers = async () => {
    const data = await Fetch_Data.getAllData();
    console.log(data.docs);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  console.log("UUUUUUUUU  ----------->", users);

  const [orderedData, setOrderedData] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3012/orderData`).then((response) => {
      setOrderedData(response.data);
    });
  }, []);
  console.log("Ordered Data is ===>", orderedData);

  var email1 = localStorage.getItem("email1", JSON.stringify(email1));
  var email_details = JSON.parse(email1);
  var firstname = localStorage.getItem("firstname", JSON.stringify(firstname));
  var firstname_details = JSON.parse(firstname);
  var contact = localStorage.getItem("contact", JSON.stringify(contact));
  var contact_details = JSON.parse(contact);

  // useEffect(() => {
  // const order_count = orderedData.map((data) => {
  //     if (user_details.contact == data.orders.customer_details.customer_phone) {
  //         var arry= [];
  //         arry.push(data.orders.contact)
  //         return arry;
  //     }
  //     console.log('ORDER COUNT', arry);

  // })
  // })

  useEffect(() => {
    getItems();
  }, []); // If empty Array, this dependency will run only one time

  const getItems = async () => {
    const data = await Fetch_Order.getAllItem();
    console.log(data.docs);
    setAllOrderItem(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  console.log("All order Items are", allOrderItem);

  const notFound = allOrderItem.map((item) => {
    item.orderitems.map((orders) => {
      console.log("Contact", orders.customer_details.customer_phone);
      return orders.customer_details.customer_phone === contact_details;
    });
  });

  console.log(notFound);

  return (
    <div>
      {/* {allOrderItem.map((item) => {
        // item.orderitems.menus.map((orders) => {
        console.log("MENUSSSS", item.orderitems.menus);
        return (
          <div>
            <p>{item.orderitems.menus}</p>
          </div>
        );
        // });
      })} */}

      <div>
        {allOrderItem &&
          allOrderItem?.map((item) => {
            return (
              <>
                {item?.orderitems?.map((orders) => {
                  console.log(
                    "Custo-Contact",
                    orders?.customer_details?.customer_phone
                  );
                  return (
                    <>
                      {orders?.menus?.map((order) => {
                        console.log("MENU NAME", order?.menu_name);
                        return (
                          <div
                            className="menu_name"
                            style={{ marginTop: "300px" }}
                          >
                            <p style={{ marginTop: "200px" }}>
                              Menu Name :{order?.menu_name}
                            </p>
                          </div>
                        );
                      })}
                    </>
                  );
                })}
              </>
            );
          })}
      </div>
      <p>Menusss</p>
      {/* {allOrderItem.map((item) =>{
        console.log(item.orderitems.)
        return(
          <div>
            </div>
        )
      }} */}
      {/* <div> */}
      {/* {notFound === undefined && (
        <div style={{ marginTop: "100px" }}>
          <img
            src={no_items}
            alt="No Items Found"
            style={{ height: "300px", width: "300px" }}
          />
          <Typography
            style={{
              fontFamily: "cursive",
              fontSize: "35px",
              color: "#6439ff",
              fontWeight: "bold",
              marginTop: "30px",
            }}
          >
            No items found
          </Typography>
        </div>
      )} */}

      {/* {notFound !== undefined && (
        <div
          style={{
            boxShadow: "2px 4px 10px 1px rgb(201 201 201 / 47%)",
            marginLeft: "83px",
            width: "90%",
            padding: "60px",
          }}
        >
          <h1
            style={{
              color: "#6439ff",
              textAlign: "left",
              marginLeft: "35px",
            }}
          >
            Order History
          </h1>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <table
              style={{
                borderCollapse: "separate",
                borderSpacing: "0px 10px !important",
                width: "95%",
              }}
              className="fixed-height fixed-width fixed-cell table-spacing"
            >
              <thead style={{ padding: "10px 30px" }}>
                <tr style={{ color: "#6439ff", padding: "10px 30px" }}>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Order details</th>
                </tr>
              </thead>

              <tbody>
                {allOrderItem.map((item, i) => {
                  return (
                    <div>
                      {item.orderitems.map((orders) => {
                        console.log("Order id", orders.order_id);
                        console.log("Date", orders.date);
                        console.log("Time", orders.time);
                        if (
                          contact_details ===
                          orders.customer_details.customer_phone
                        ) {
                          orders.menus.map((order) => {
                            console.log("Order_id", item.orderitems.order_id);
                            return (
                              <tr
                                key={i}
                                style={{
                                  backgroundColor: "white",
                                  padding: "20px 0px",
                                }}
                                className="table_row"
                              >
                                <td>{orders?.order_id}</td>
                                <td>{orders?.date}</td>
                                <td>{orders?.time}</td>
                                <td>
                                  <Link
                                    to={{ pathname: "/order_details" }}
                                    state={{ id: orders }}
                                  >
                                    <button className="view_button">
                                      <b>View order</b>
                                    </button>
                                  </Link>
                                </td>
                              </tr>
                            );
                          });
                        }
                      })}
                    </div>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default Order_History;
