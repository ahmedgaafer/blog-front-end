import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import { Container } from '../Container';
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import { useLocation } from "react-router";
import TimeLine from "../TimeLine";


const useStyle = makeStyles((theme) => ({
	root: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginTop: "50px",
	},
    large:{
        bottom: "5vh",
        width: theme.spacing(15),
        height: theme.spacing(15),
        border: '2px solid #4ecca3',
        transition: "transform 0.15s ease-in-out",
        "&:hover":{
            transform:"scale(2)",
            cursor:"pointer",
        }
    },
    name:{
        fontSize:'23px',    
        letterSpacing:theme.spacing(1.5)
    },
    divider:{
        width: "90%"
    },
    dividerColor:{
        backgroundColor: "#4ecca3",
    },
    socialInfo:{
        marginTop: "30px",
        width:"100%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-around',
        alignContent: 'center',
    },
    infoDivider:{
        height: 100,
        width: 1
    },
    infoBlock:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems: 'center',
    },
    infoTitle:{
        fontSize: "24px",
        letterSpacing: theme.spacing(0.5),
        color:"#2caa81",
    }


}));


export default  function Profile(){
    const classes = useStyle();
    let location = useLocation();
    const owner = useSelector(state => {return {name: state.authReducer.username, img: state.authReducer.profileImageUrl, id: state.authReducer.id}})
    let other = owner;
    let user = (location.state.id === owner.id)? owner : other; 
    function handleImageClick(e){
        window.open(e.target.src, '_blank').focus();
    }
    return (
        <div>
            <Container className={classes.root}>
                <Avatar alt={user.name} src={`https://www.gravatar.com/avatar/${user.img}?s=500`} className={classes.large} onClick={handleImageClick}/>
                <Typography className={classes.name}>{user.name.replace(/(\w)(\w*)/g,function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();})}</Typography>
                <Divider 
                    className={classes.divider}
                    classes={{root: classes.dividerColor}}
                />
                <div className={classes.socialInfo}>
                    <div className={classes.infoBlock}>
                        <div className={classes.infoTitle}>Number Of Posts</div>
                        <div>50</div>
                    </div>
                    <Divider
                        className={classes.infoDivider}
                        dir="vertical"
                        classes={{root: classes.dividerColor}}
                    />
                    <div className={classes.infoBlock}>
                        <div className={classes.infoTitle}>Followers</div>
                        <div>50</div>
                    </div>
                    <Divider
                        className={classes.infoDivider}
                        dir="vertical"
                        classes={{root: classes.dividerColor}}
                    />
                    <div className={classes.infoBlock}>
                        <div className={classes.infoTitle}>Following</div>
                        <div>50</div>
                    </div>
                </div>
            </Container>
            <TimeLine id={location.state.id}/>
        </div>
        
    )
}