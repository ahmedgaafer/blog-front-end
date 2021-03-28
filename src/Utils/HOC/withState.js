import React, { useEffect } from "react";
import { connect } from "react-redux";

export default function withState(WrappedComponent) {
  function mapStateToProps(reduxState) {
    let state = {};
    for(let t of Object.entries(reduxState)) {
      state = {...state, ...t[1]}
    }
    
    return {
      ...state,
    };
  }

  return connect(
    mapStateToProps,
    null
  )(function (props) {

    useEffect(() => {}, [props.posts, props.comments])
    return (
      <React.Fragment>
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  });
}
