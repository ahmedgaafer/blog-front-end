import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../Login";
import LandingPage from "../LandingPage";
import TimeLine from "../TimeLine";

const Switcher = (props) => {
  return (
    <Switch>
      <Route exact path="/" >
        {props.isLogged ? <Redirect to="/timeline"/> : <LandingPage/>}
      </Route>
      <Route path="/user">
        {props.isLogged ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route path="/timeline">
      {props.isLogged ? <TimeLine/> : <Login />}
      </Route>
      <Route path="*" component={() => <div>404</div>} />
    </Switch>
  );
};

export default Switcher;
