import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/home';
import Search from './pages/search';
import Book from './pages/book';
import BlogsNav from './pages/blogs-nav';
import Profile from './pages/profile';
import './App.less';

function App() {
  return (
    <Router>
      <Route path='/' exact>
        <Home />
      </Route>
      <Route path='/search'>
        <Search />
      </Route>
      <Route path='/book'>
        <Book />
      </Route>
      <Route path='/blogs-nav'>
        <BlogsNav />
      </Route>
      <Route path='/profile'>
        <Profile />
      </Route>
    </Router>
  )
}

export default App;
