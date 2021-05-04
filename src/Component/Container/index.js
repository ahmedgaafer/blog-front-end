/* eslint-disable no-useless-constructor */
import React from "react";
import { Container as MUIContainer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  colors: {
    backgroundColor: "#393e46",
    color: "#eee",
    marginTop: "2vw",
    padding: "1vw",
    borderRadius: "5px",
    
  },
}));

export const Container = ({children, className})=>{
  const classes = useStyles();
  return(
    <MUIContainer className={clsx(classes.colors, className)} fixed>
      {children}
    </MUIContainer>
  )  

}
