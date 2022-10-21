import React from "react";
import './mode.css';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';



const Modal_alert = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const navigate = useNavigate();

    const toLogin = () => {
        navigate('/login')
    }

    return (
        <div className={showHideClassName} style={{backgroundColor:'#999294c2'}}>

            <div className="modal-main-alert" aria-labelledby="contained-modal-title-vcenter"
                centered >
                <div className='modal_header-alert' style={{ padding: '20px', borderRadius: '20px 20px 0px 0px' }}>
                    <div style={{display:'inline-block', justifyContent:'end', alignItems:'center'}}>
                        <label className='xbutton-alert' onClick={handleClose} style={{ cursor: 'pointer', fontSize: '30px' }}>&times;</label>
                    </div>
                    <span className="bi bi-emoji-frown green-color-alert" style={{ color: '#6439ff', marginBottom:'20px' }}></span>

                </div>

                {children}


                <div style={{ color: 'blue', textAlign: 'center' }}>
                    <Button variant="contained" aria-label="outlined primary button group" type="button" onClick={toLogin} style={{ backgroundColor: '#6439ff', fontSize: '15px', color: 'white', borderRadius: '10px', cursor: 'pointer', marginTop: '-15px', marginBottom: '17px' }}>
                        Ok
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Modal_alert;