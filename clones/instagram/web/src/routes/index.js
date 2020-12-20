import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

/**
 * Athentication Routes
 */
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Feed from '../pages/Feed';
import Post from '../pages/Post';

export default function Routes() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/register" component={SignUp} />

        <Route path="/feed" exact component={Feed} isPrivate />
        <Route path="/post" exact component={Post} isPrivate />
      </Switch>
    </>
  );
}
