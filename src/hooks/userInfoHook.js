import React, { useState, useEffect } from 'react';
import { fetch } from 'whatwg-fetch';

export default ()=> {
    const [info, updateInfo] = useState({});
    useEffect(function(){
        fetch(`/api/snake/user/info`)
        .then((response)=> response.json())
        .then(function(res) {
            console.log("userInfo", res);
            updateInfo(res);
        }).catch(function(ex) {
            console.log('parsing failed', ex);
        });
    }, []);

    return info;
}