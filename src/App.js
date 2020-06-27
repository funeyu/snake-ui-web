import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { GaListener } from './components/ga-listener';

import UserContext from './contexts/user';

import UserInfoHook from './hooks/userInfoHook';
import './App.less';

const Home = lazy(()=> import('./pages/home'));
const Search = lazy(()=> import('./pages/search'));
const Yesterday = lazy(()=> import('./pages/yesterday'));
const Blogs = lazy(()=> import('./pages/blogs'));
const Profile = lazy(()=> import('./pages/profile'));

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
          <Route path='/profile'>
            <Profile />
          </Route>
          </GaListener>
        </Suspense>
      </Router>
    </UserContext.Provider>
  )
}

export default App;
