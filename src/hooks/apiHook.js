import React, { useState, useEffect } from 'react';
import { fetch } from 'whatwg-fetch';

const api =  {
    Get: (url)=> {
        const [data, updateData] = useState();
        useEffect(function(){
            fetch(url)
            .then((response)=> response.json())
            .then(function(res) {
                updateData(res.data);
            }).catch(function(ex) {
                console.log('parsing failed', ex);
            });
        }, []);
        return data;
    },
    PostJson: (url, json)=> {
        const [data, updateData] = useState();
        useEffect(function(){
            fetch(url, {
                method: 'POST',  
                headers: {'Content-Type': 'application/json'},
                body: json
            })
            .then((response)=> response.json())
            .then(function(res) {
                updateData(res.data);
            }).catch(function(ex) {
                console.log('parsing failed', ex);
            });
        }, [url, json]);
        return data;
    },
    PostForm: (url, formData)=> {
        const [data, updateData] = useState();
        useEffect(function(){
            fetch(url, {
                method: 'POST',
                body: formData
            }).then((response)=> response.json())
            .then(function(res) {
                updateData(res.data);
            }).catch(function(ex) {
                console.log('parsing failed', ex);
            });
        }, []);

        return data;
    }
};

export default api;