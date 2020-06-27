import { fetch } from 'whatwg-fetch';

function checkUrl(urlString){
    if(urlString!=""){
        var reg=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
        if(!reg.test(urlString)){
            return false;
        }

        return true;
    }
}
// 检查url是否有效
const check = function(url) {
    return new Promise((resolve, reject)=> {
        if (!checkUrl(url)) {
            return resolve(false);
        }
        return resolve(true);
    });
};

const postForm = function(url, formData) {
    return fetch(url, {
        method: 'POST',
        // headers: {'Content-Type': 'multipart/form-data;' },
        body: formData
    }).then((response)=> response.json())
    .catch(function(ex) {
        console.log('parsing failed', ex);
    });
};

const postJson = function(url, json) {
    return fetch(url, {
        method: 'POST',  
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(json)
    })
    .then((response)=> response.json())
    .catch(function(ex) {
        console.log('parsing failed', ex);
    });
};

export { check, postForm, postJson };