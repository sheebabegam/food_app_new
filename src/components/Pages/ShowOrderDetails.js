import React from "react";
import { useLocation } from "react-router-dom";
import "../style.css";

function Show_Order_Details(props) {
  console.log("PROPS -->", props);
  const location = useLocation();

  console.log("Location Orders are ====> ", location.state.id);
  const menu_length = location.state.id.menus;

  console.log(menu_length);
  return (
    <div className="flex1">
      <div className="main_shadow">
        <h4 className="order_detail">Order Details</h4>
        <p className="orderid_p">
          Order Id:{" "}
          <mark className="orderid_mark">{location.state.id.order_id}</mark>
        </p>
        <p className="noitems_para">
          {" "}
          No.of Items:
          {menu_length.length}
        </p>
        <br />

        <div className="menu">
          {location.state.id.menus.map((items) => {
            return (
              <div>
                <div className="menu_flex">
                  <label>
                    <p>{items.menu_name}</p>{" "}
                    <h6 className="qty_h6"> &#x2715;</h6>{" "}
                    <p> {items.quantity}</p>
                    <p className="item_price">
                      : Rs.
                      {items.menu_price * items.quantity}
                    </p>
                  </label>
                </div>
              </div>
            );
          })}
          <hr />
          <div className="menu_flex">
            <label>
              <p>Item Total</p>{" "}
              <p className="price_para">: Rs.{location.state.id.totalPrice}</p>
            </label>{" "}
            <br />
            <label>
              <p className="deli_fees_para">Delivery Fees</p>{" "}
              <p className="del_fee">: Rs.{location.state.id.delivery_fee}</p>
            </label>{" "}
            <br />
            <label>
              <p>GST</p>{" "}
              <p className="gst_p">: Rs.{location.state.id.tax[0].taxamount}</p>{" "}
            </label>{" "}
            <br />
            <label>
              <p>CGST</p>{" "}
              <p className="cgst_p">
                : Rs.{location.state.id.tax[1].taxamount}
              </p>{" "}
            </label>
          </div>

          <hr />

          <div className="menu_flex">
            <label>
              <p className="total_p">Total amount</p>{" "}
              <p className="amount_p">: Rs.{location.state.id.clear_amount}</p>{" "}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Show_Order_Details;
