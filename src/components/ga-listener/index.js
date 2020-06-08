import React, { useEffect } from 'react';
import { Route, useLocation, useHistory } from 'react-router-dom';
import { pageView } from '../../utils/ga';

const GaListener = (props)=> {
    const location = useLocation();
    const history = useHistory();

    useEffect(()=> {
        pageView(location.pathname);
        history.listen((location=> pageView(location.pathname)));
    }, []);
    
    return props.children;
};

export { GaListener };