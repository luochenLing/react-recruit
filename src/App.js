import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Register from "./containers/register/register";
import Login from "./containers/login/login";
import Main from "./containers/main/main";
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route path="/register" component={Register}></Route>
          <Route path="/login" component={Login}></Route>
          <Route component={Main}></Route>
        </Switch>
      </HashRouter>
    </Provider>
  );
}

export default App;
