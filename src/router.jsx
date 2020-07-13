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
import BasicList from './containers/example/BasicList.tsx';
import AxiosList from './containers/example/AxiosList.tsx';
import OptionList from './containers/example/OptionList.tsx';
import List from './containers/example/List.tsx';

const Routers = () => {
  return (
    <Router history={history()}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/basicList" component={BasicList} />
        <Route path="/axiosList" component={AxiosList} />
        <Route path="/optionsList" component={OptionList} />
        <Route path="/list" component={List} />
      </Switch>
    </Router>
  );
};
export default Routers;