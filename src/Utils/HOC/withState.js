import React from "react";
import { connect } from "react-redux";

export default function withState(WrappedComponent) {
     function mapStateToProps(reduxState) {
       const state =  reduxState.authReducer;
       
        return {
            ...state ,
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
