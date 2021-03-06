import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route,  Switch } from 'react-router-dom';

import { GaListener } from './components/ga-listener';
import Loading from './components/loading';
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
        <Suspense fallback={<Loading />}>
        <GaListener>
          <Switch>
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
          <Route path="*">
            <Home />
          </Route>
          </Switch>
          </GaListener>
        </Suspense>
      </Router>
    </UserContext.Provider>
  )
}

export default App;
