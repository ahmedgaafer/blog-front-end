import React from "react";
import withState from "../../Utils/HOC/withState";
import Avatar from '@material-ui/core/Avatar';
import _ from "lodash";
import { NavLink } from "react-router-dom";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import IconButton from "@material-ui/core/IconButton";

const useStyle = makeStyles(theme => ({
    root:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        width:"100%",
    },
    link:{
        textDecoration: "none",
        color: "#eee",
        marginLeft: "20px",
        alignSelf:"center",
        "&:hover":{
            textDecoration: "underline",
            fontWeight: 500,
        }
    },
    header:{
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        marginBottom: "10px",
        
        
    },
    profileImage:{
        animation: `$shrink 1000ms ${theme.transitions.easing.easeInOut} both`,
        "&:hover":{
            animation: `$zoom 1000ms ${theme.transitions.easing.easeInOut} both`,
        }
    },
    divider: {
		width: "63vw",
        height: 3,
        marginBottom: 30,
        flexGrow:0,

	},
    dividerColor:{
        backgroundColor: "#5b5d68",
    },
    comment:{
        borderTop: "1px solid #4ecca3",
        width:"100%",
        padding: " 10px 0",
        fontSize: "14px",
        marginBottom: "15px"
    },
    newComment:{
        marginBottom:"20px"
    },
    "@keyframes zoom":{
        "0%":{
            transform: "scale(1)"
        },
        "100%":{
            transform: "scale(2)"
        }
    },
    "@keyframes shrink":{
        "0%":{
            transform: "scale(2)"
        },
        "100%":{
            transform: "scale(1)"
        }
    }
}))

function CommentEntry({_id,text, user }){
    const classes = useStyle();

    return (
    <div className={classes.root}> 
        <div className={classes.header}>
                <Avatar alt={user.username} className={classes.profileImage} src={`https://www.gravatar.com/avatar/${user.profileImageUrl}`}></Avatar> 
                <NavLink to="/" className={classes.link}>{_.startCase(_.toLower(user.username))}</NavLink>
        </div>
        <div className={classes.comment}>
            {text}
        </div>       
    </div>
    )

}

export default withState(function Comment (props){
    const classes = useStyle();
    const comments = props.comments[props.postID];

    return (
        <div>
            <div className={classes.newComment}>
                {`<Add another`}
            </div>
            {
                (!comments || comments.length === 0)? 
                "There are no comments yet! be the first one to comment": 
                (comments.map((comment, i) => {
                    
                    return  (
                        <React.Fragment>
                            <CommentEntry key={comment._id} {...comment}/>
                            {(i < comments.length -1)?<Divider className={classes.divider} classes={{root:classes.dividerColor}}/>: ''}
                        </React.Fragment>
                    )
                }))
            }
        </div>
    )
})