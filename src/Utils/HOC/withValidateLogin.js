/* eslint-disable no-useless-constructor */
import React from "react";
import { Redirect } from "react-router";

export default function withContainer(WrappedComponent) {
  return function (props) {
    return (
      <React.Fragment>
        {!props.isLogged ? (
          <WrappedComponent {...props} />
        ) : (
          <Redirect to="blog-front-end/user" />
        )}
      </React.Fragment>
    );
  };
}
