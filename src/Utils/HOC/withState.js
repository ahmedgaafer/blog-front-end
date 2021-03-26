import React from "react";
import { connect } from "react-redux";

export default function withState(WrappedComponent) {
  function mapStateToProps(reduxState) {
    let state = {};
    for(let [k, v] of Object.entries(reduxState)) {
      state = {...state, ...v}
    }
    
    return {
      ...state,
    };
  }

  return connect(
    mapStateToProps,
    null
  )(function (props) {
    return (
      <React.Fragment>
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  });
}
