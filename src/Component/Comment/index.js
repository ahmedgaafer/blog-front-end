import React from "react";
import Avatar from '@material-ui/core/Avatar';
import _ from "lodash";
import { NavLink } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import IconButton from "@material-ui/core/IconButton";
import API from "../../actions/API";


const useStyle = makeStyles(theme => ({
    root:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        //width:"100%",
    },
    newCommentRoot:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        width:"100%",
        //flexWrap: "",
        [theme.breakpoints.down("sm")]:{
            flexWrap: "wrap"
        },
        
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
        flexWrap: 'wrap'
        
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
    newCommentDivider:{
        height: 30,
        marginLeft: 20,
        marginTop: 13
    },
    newCommentDividerColor:{

        backgroundColor: "#4ecca3",
    },

    dividerColor:{
        backgroundColor: "#5b5d68",
    },
    comment:{
        borderTop: "1px solid #4ecca3",
        width:"90%",
        padding: " 10px 0",
        fontSize: "14px",
        marginBottom: "15px",
    },
    newComment:{
        marginBottom:"20px",
        margin: "0 auto",
        width: "90%",
        
    },
    flex:{
        display: "flex",
        flexDirection:"row", 
        alignItems: "center",
    },
	post: {
		margin: "30px 10px",
	},
	
    textInput:{
        color:"#eee",
    },
	input: {
        backgroundColor:"#232931",
        color:"#eee",
		marginLeft: theme.spacing(1),
        width:"1200px !important",
        [theme.breakpoints.down("lg")]:{
            width:"1150px !important"
        },
        [theme.breakpoints.down("md")]:{
            width:"850px !important"
        },
        [theme.breakpoints.down("sm")]:{
            width:"450px !important"
        },
        [theme.breakpoints.down(theme.breakpoints.values.xs+500)]:{
            width:"290px !important"
        },

        
	},

    commentInput:{
        backgroundColor:"#393E46",
        color:"#232931",
		marginLeft: theme.spacing(1),
        width:"1150px !important",
        [theme.breakpoints.down("lg")]:{
            width:"1150px !important"
        },
        [theme.breakpoints.down("md")]:{
            width:"850px !important"
        },
        [theme.breakpoints.down("sm")]:{
            width:"450px !important"
        },
        [theme.breakpoints.down(theme.breakpoints.values.xs+500)]:{
            width:"290px !important"
        },
    },

	iconButton: {
        color: "#4ecca3",
        flexGrow:0
	},
    commentField:{
        color: "#eee",
        borderColor:"#232931",
    },
    fieldColors:{
        color: "#eee",
        borderColor:"#4ecca3",
    },
    focused:{},
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

const NewComment = function ({postID}) {

	const classes = useStyle();
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer);
	const [value, setValue] = React.useState("");

	const handleChange = (event) => {
		setValue(event.target.value);
	};

    const handleSubmit = (event) => {
        event.preventDefault();
        const commentBody = value;
        const userID = user.id;
        const token = user.token;
        setValue("")
        
        API.Comments.createNewComment(commentBody, postID, userID, token)(dispatch)
        
    }
	return (
		<div className={classes.newComment}>
			<div>
				<ValidatorForm  
                    onSubmit={handleSubmit}
                >
                    <div className={classes.newCommentRoot}>
                        <TextValidator
                            multiline
                            className={classes.commentInput}
                            onChange={handleChange}
                            value={value}   
                            InputLabelProps={{
                                classes:{
                                    root:classes.commentField,
                                }
                            }}
                            InputProps={{
                                classes:{
                                    notchedOutline: classes.commentField,
                                    input: classes.commentField,
                                    focused: classes.commentField,
                                }
                            }}
                            variant="outlined"
                            label="Write a new comment"
                            validators={['required', 'minStringLength: 1']}
                            errorMessages={['This field is required', 'The comment must contain at least 1 character']}    
                        />
                        
                        <Divider
                            className={classes.newCommentDivider}
                            orientation="vertical"
                            classes={{root: classes.newCommentDividerColor}}
                        />
                        <IconButton
                            type="submit"
                            color="primary"
                            className={classes.iconButton}
                            aria-label="directions"
                        >
                            <SendRoundedIcon />
                        </IconButton>
                        
                    </div>
				</ValidatorForm>
			</div>
		</div>
	);
};

export default function Comment ({postID}){
    const classes = useStyle();
    let comments = useSelector(state => state.commentReducer.comments.map(comment => {
        if(comment.post === postID) return comment
        return undefined;
    })
    .filter(comment => comment !== undefined));

    comments = [...new Map(comments.map(item => [item._id, item])).values()]

    return (
        <div>
            <NewComment postID={postID}/>
            {
                (!comments || comments.length === 0 || _.some())? 
                "There are no comments yet! be the first one to comment": 
                (comments.map((comment, i) => {
                    
                    return  (
                        <React.Fragment key={comment._id}>
                            <CommentEntry  {...comment}/>
                            {(i < comments.length -1)?<Divider className={classes.divider} classes={{root:classes.dividerColor}}/>: ''}
                        </React.Fragment>
                    )
                }))
            }
        </div>
    )
}