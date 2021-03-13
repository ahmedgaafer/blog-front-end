/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    colors: {
        backgroundColor: "#393e46",
        color: "#eee",
        marginTop: "1vh",
        padding: "1vw"
    },
}))

export default function withContainer( WrappedComponent ){
    return function(){

            const classes = useStyles();
            return (
                <React.Fragment className={classes.colors}>
                    
                    <Container className={classes.colors}>
                        <WrappedComponent />
                    </Container>
                </React.Fragment>
                )
        } 
    }