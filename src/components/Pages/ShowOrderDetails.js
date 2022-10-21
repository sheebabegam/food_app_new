import React, { useState, useEffect } from 'react';
import axios from 'axios';
import orderData from '../../api/orderData';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import '../style.css'

function Show_Order_Details(props) {
    console.log('PROPS -->', props);
    const location = useLocation()

    const [orderedData, setOrderedData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3010/orderData`)
            .then((response) => {
                setOrderedData(response.data);
            })
    }, []);
    console.log('Ordered Data is ===>', orderedData);

    const menu_length = location.state.id.orders.menus.length;

    console.log(menu_length)
    return (
        <div className='flex1'>
            <div className='main_shadow'>
                <h4 className='order_detail' style={{ color: '#6439ff', marginLeft: '35px', paddingTop:'50px' }}>Order Details</h4>
                <p style={{ textAlign: 'left', marginLeft: '80px', marginTop: '30px' }}>Order Id: <mark style={{backgroundColor:'#b7a8f0', borderRadius:'10px'}}>{location.state.id.orders.order_id}</mark></p>
                <p style={{ textAlign: 'left', marginLeft: '80px' }}> No.of Items: {menu_length}</p>
                <br />

                <div className='menu'>
                    {
                        location.state.id.orders.menus.map((items) => {
                            return (

                                <div >
                                    <div className='menu_flex'>
                                        <label><p>{items.menu_name}</p> <h6 style={{fontSize:12, display:'inline-block'}}> &#x2715;</h6> <p> {items.quantity}</p>  : Rs.{(items.menu_price) * (items.quantity)}</label>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {/* <div className='line'> */}
                    <hr />
                    {/* </div> */}
                    <div className='menu_flex'>
                        <label><p>Item Total</p>  <p style={{marginLeft:'83px'}}>: Rs.{location.state.id.orders.totalPrice}</p></label> <br />
                        <label><p style={{width:'100px'}}>Delivery Fees</p> <p style={{marginLeft:'62px'}}>: Rs.{location.state.id.orders.delivery_fee}</p></label> <br />
                        <label><p>GST</p> <p style={{marginLeft:'82px'}}>: Rs.{location.state.id.orders.tax[0].taxamount}</p> </label> <br />
                        <label><p>CGST</p> <p style={{marginLeft:'82px'}}>: Rs.{location.state.id.orders.tax[1].taxamount}</p> </label>
                    </div>

                    <hr />

                    <div className='menu_flex'>
                        <label><p style={{width:'100px'}}>Total amount</p> <p style={{marginLeft:'62px'}}>: Rs.{location.state.id.orders.clear_amount}</p> </label>
                    </div>

                </div>


            </div>
        </div>


    );
}

export default Show_Order_Details;