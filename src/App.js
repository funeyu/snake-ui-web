import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/home';
import Search from './pages/search';
import BlogsNav from './pages/blogs-nav';
import Profile from './pages/profile';
import './App.css';

function App() {
  return <Router>
    <Route path='/' exact>
      <Home />
    </Route>
    <Route path='/search'>
      <Search />
    </Route>
    <Route path='/blogs-nav'>
      <BlogsNav />
    </Route>
    <Route path='/profile'>
      <Profile />
    </Route>
  </Router>
}

export default App;
