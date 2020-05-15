const query = function(location) {
    const splits = location.search.split('?');
    let query;
    if (splits.length > 1) {
        query = splits[1].split('&').reduce((pre, next)=> {
        let ss = next.split('=');
        if (ss.length === 2) {
            pre[ss[0]] = ss[1];
        }
        return pre;
        }, {});
    }
    return query;
};

export default query;

