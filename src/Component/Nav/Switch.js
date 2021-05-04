import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../Login";
import LandingPage from "../LandingPage";
import TimeLine from "../TimeLine";

const Switcher = ({isLogged}) => {
  
  return (
    <Switch>
      <Route exact path="/" >
        {isLogged ? <Redirect to="/timeline"/> : <LandingPage/>}
      </Route>
      <Route path="/user">
        {isLogged ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route path="/timeline">
        {isLogged ? <TimeLine/> : <Login />}
      </Route>
      <Route path="*">
        {isLogged ? <Redirect to="/" /> : <Login />}
      </Route>
    </Switch>
  );
};

export default Switcher;
