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

export { check };