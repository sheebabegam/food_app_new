import React, { useState, useEffect } from 'react';

function Map() {


    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');

    const change1 = (e) => {
        setLong(e.target.value)
    }

    const change2 = (e) => {
        setLat(e.target.value);
    }

    useEffect(() => {
        const iframeData = document.getElementById('iframeId');
        iframeData.src = `https://maps.google.com/maps?q=${long},${lat}&hl=es;&output=embed`
        console.log(iframeData.src)
    });

    const onSubmit = () => {
        const iframeData = document.getElementById('iframeId');
        iframeData.src = `https://maps.google.com/maps?q=${long},${lat}&hl=es;&output=embed`
    }
    return (
        <div>
            <label><b>Latitude</b></label>
            <input id='lat' type='text' onChange={(e) => { change1(e) }} />
            <label><b>Longitude</b></label>
            <input id='long' type='text' onChange={(e) => { change2(e) }} />
            {/* <button onClick={onSubmit}>Search</button> */}
            <iframe id='iframeId' height='500px' width='100%'></iframe>
        </div>
    );
}

export default Map;