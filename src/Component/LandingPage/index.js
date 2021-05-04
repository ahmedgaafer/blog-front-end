import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";


const useStyle = makeStyles((theme) => ({
	root: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginTop: "50px",
	},
	header: {
		fontSize: "10vh",
		textAlign: "center",
        padding: "5px",
		"&:hover": {
			backgroundColor: "rgba(78, 204, 163,0.2)",
            cursor: "default",
            borderRadius: "5px",

		},
	},
	logo: {
		color: "#4ecca3",
	},
    body: {
        fontSize: "32px",
        marginTop: "8vh"
    },
    btnColor: {
        backgroundColor: "#39c697",
        color: "#eee",
        borderRadius: "5px",
        marginBottom: "5px",
        width: "100%",
        height: "5vh",
        "&:hover":{
            backgroundColor: "#393E46"
        }
        
    },
    parent:{
        marginTop:"8vh",
        width: "30%",
    },
    links: {
        textDecoration: "none",
    }
}));

export default  function LandingPage(){
    const classes = useStyle();
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <span className={classes.logo}>G</span>ossip
            </div>
            <div className={classes.body}>
                A new social media for sharing your thoughts
            </div>
            <div className={classes.parent}>
                <NavLink to="/user" className={classes.links}><Button className={classes.btnColor}>Join now</Button></NavLink> 
            </div>
        </div>
    )
}