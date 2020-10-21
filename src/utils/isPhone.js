const isPhone = function() {
    var sUserAgent = navigator.userAgent;
    if (sUserAgent.indexOf('Android') > -1 || sUserAgent.indexOf('iPhone') > -1){
      return true;
    }

    return false;
};

export default isPhone;