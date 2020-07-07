import React, {
  // Component,
} from 'react';
import {
  Router,
  Route,
  Switch,
} from 'react-router-dom';

import history from './history.ts';
import App from './App';
import Home from './containers/example/Home.tsx';
import Tab1 from './containers/example/TabOne.tsx';
import Tab2 from './containers/example/TabTwo.tsx';
import List from './containers/example/List.tsx';

const Routers = () => {
  return (
    <Router history={history()}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/home" component={Home} />
        <Route path="/tab1" component={Tab1} />
        <Route path="/tab2" component={Tab2} />
        <Route path="/list" component={List} />
      </Switch>
    </Router>
  );
};
export default Routers;