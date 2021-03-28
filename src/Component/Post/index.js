import React, {useState} from "react";
import withContainer from "../../Utils/HOC/withContainer";
import withState from "../../Utils/HOC/withState";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import Comment from "../Comment";
import _ from "lodash";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import API from "../../actions/API";


const useStyle = makeStyles(theme => ({
    root:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
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
    post:{
        borderTop: "1px solid #4ecca3",
        padding: " 10px 0",
        fontSize: "18px"
    },
    comments:{
        fontSize: "16px"
    },
    commentSection:{
        backgroundColor: "#232931",
        color: "#eee !important"
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

export default withState(withContainer(function Post ({username, profileImageUrl, postID, postContent, dispatch}){
    const classes = useStyle();
    const [state, setState] = useState(true);
    function handleCommentEvent(e){
        if(state){
            API.Comments.getAllPostComments(postID)(dispatch)
            setState(!state);
        }
        else{
            setState(!state);
        }
    }
    return (
        <div className={classes.root}> 
            <div className={classes.header}>
                <Avatar alt={username} className={classes.profileImage} src={`https://www.gravatar.com/avatar/${profileImageUrl}`}></Avatar> <NavLink to="/" className={classes.link}>{_.startCase(_.toLower(username))}</NavLink>
            </div>
            <div className={classes.post}>
                {postContent}
            </div>
            <div className={classes.comment}>
            <Accordion className={classes.commentSection} onClick={handleCommentEvent} >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon  style={{color:'#eee'}}/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography >Comments</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <Comment postID={postID}/>
                    </div>
                </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )
}))