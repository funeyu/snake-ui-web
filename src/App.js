import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { GaListener } from './components/ga-listener';

import UserContext from './contexts/user';

import UserInfoHook from './hooks/userInfoHook';
import './App.less';

const Home = lazy(()=> import('./pages/home'));
const Search = lazy(()=> import('./pages/search'));
const Yesterday = lazy(()=> import('./pages/yesterday'));
const Books = lazy(()=> import('./pages/books'));
const Blogs = lazy(()=> import('./pages/blogs'));
const Profile = lazy(()=> import('./pages/profile'));

const AdminBlogs = lazy(()=> import('./pages/admin/blogs'));
const AdminChecks = lazy(()=> import('./pages/admin/checks'));
const AdminBooks = lazy(()=> import('./pages/admin/books'));
const AdminUsers = lazy(()=> import('./pages/admin/users'));
const AdminYesterday = lazy(()=> import('./pages/admin/ychecks'));

function App() {
  const userInfo = UserInfoHook();

  return (
    <UserContext.Provider value={userInfo}>
      <Router>
        <Suspense fallback={<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>加载中......</div>}>
        <GaListener>
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
          </GaListener>
        </Suspense>
      </Router>
    </UserContext.Provider>
  )
}

export default App;
