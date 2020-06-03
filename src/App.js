import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/home';
import Search from './pages/search';
import Yesterday from './pages/yesterday';
import Books from './pages/books';
import Blogs from './pages/blogs';
import Profile from './pages/profile';

import AdminBlogs from './pages/admin/blogs';
import AdminChecks from './pages/admin/checks';
import AdminBooks from './pages/admin/books';
import AdminUsers from './pages/admin/users';
import AdminYesterday from './pages/admin/ychecks';

import UserContext from './contexts/user';

import UserInfoHook from './hooks/userInfoHook';

import './App.less';

function App() {
  const userInfo = UserInfoHook();
  return (
    <UserContext.Provider value={userInfo}>
    <Router>
      <Route path='/' exact>
        <Home />
      </Route>
      <Route path='/search'>
        <Search />
      </Route>
      <Route path='/yesterday'>
        <Yesterday />
      </Route>
      <Route path='/blogs'>
        <Blogs />
      </Route>
      <Route path='/books'>
        <Books />
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
      <Route path='/admin/users'>
        <AdminUsers />
      </Route>
      <Route path='/admin/yesterday'>
        <AdminYesterday />
      </Route>
    </Router>
    </UserContext.Provider>
  )
}

export default App;
