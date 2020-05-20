const event = function(category, name, label) {
    if (process.env.NODE_ENV !== 'development') {
        window.ga('send', 'event', category, name, label);
    }
}

export default event;