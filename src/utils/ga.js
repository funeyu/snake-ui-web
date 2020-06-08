import React from 'react';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-166967746-1');

export const traceEvent = function(category, action, label) {
    if (process.env.NODE_ENV !== 'development') {
        ReactGA.event({category, action, label});
    }
};

export const pageView = function(path) {
    if (process.env.NODE_ENV !== 'development') {
        ReactGA.set({page: path});
        ReactGA.pageview(path);
    }
};