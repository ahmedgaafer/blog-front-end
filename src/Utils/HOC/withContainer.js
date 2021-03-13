/* eslint-disable no-useless-constructor */
import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    colors: {
        backgroundColor: "#393e46",
        color: "#eee",
        marginTop: "1vh",
        padding: "1vw"
    },
}))

export default function withContainer( WrappedComponent ){
    return function(props){

            const classes = useStyles();
            return (
                <React.Fragment className={classes.colors}>
                    
                    <Container className={classes.colors}>
                        <WrappedComponent {...props} />
                    </Container>
                </React.Fragment>
                )
        } 
    }