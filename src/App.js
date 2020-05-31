import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/home';
import Search from './pages/search';
import Books from './pages/books';
import Blogs from './pages/blogs';
import Profile from './pages/profile';

import AdminBlogs from './pages/admin/blogs';
import AdminChecks from './pages/admin/checks';
import AdminBooks from './pages/admin/books';
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
      <Route path='/books'>
        <Books />
      </Route>
      <Route path='/blogs'>
        <Blogs />
      </Route>
      <Route path='/profile'>
        <Profile />
      </Route>
      <Route path='/admin/blogs'>
        <AdminBlogs />
      </Route>
      <Route path='/admin/checks'>
        <AdminChecks />
      </Route>
      <Route path='/admin/books'>
        <AdminBooks />
      </Route>
    </Router>
  )
}

export default App;
