import ReactGA from 'react-ga';
if (process.env.NODE_ENV === 'development') {
    ReactGA.initialize('uuuuuu');
} else {
    ReactGA.initialize('UA-166967746-1');
}


export default ReactGA;