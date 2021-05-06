import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import { Container } from "../Container";
import Comment from "../Comment";
import _ from "lodash";
import API from "../../actions/API";
import { TextField } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignContent: "center",
	},
	link: {
		textDecoration: "none",
		color: "#eee",
		marginLeft: "20px",
		alignSelf: "center",
		"&:hover": {
			textDecoration: "underline",
			fontWeight: 500,
		},
	},
    colors: {
        backgroundColor: "#393e46",
        color: "#eee",
    },
	header: {
		display: "flex",
		flexDirection: "row",
		alignContent: "center",
		marginBottom: "10px",
	},
    ownerMenu:{
        display: "flex",
        justifyContent: "flex-end",
        width:"100%",
    },
	profileImage: {
		animation: `$shrink 1000ms ${theme.transitions.easing.easeInOut} both`,
		"&:hover": {
			animation: `$zoom 1000ms ${theme.transitions.easing.easeInOut} both`,
		},
	},
	post: {
		borderTop: "1px solid #4ecca3",
		padding: " 10px 0",
		fontSize: "18px",
	},
	comments: {
		fontSize: "16px",
	},
	commentSection: {
		backgroundColor: "#232931",
		color: "#eee !important",
	},
	"@keyframes zoom": {
		"0%": {
			transform: "scale(1)",
		},
		"100%": {
			transform: "scale(2)",
		},
	},
	"@keyframes shrink": {
		"0%": {
			transform: "scale(2)",
		},
		"100%": {
			transform: "scale(1)",
		},
	},
}));


function PostOwner({postID, userID, dispatch, currentIndex}){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
	const [postBody, setPostBody] = React.useState('');

    const classes = useStyle();
	const Token = localStorage.getItem('userToken');

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

    const handleClickOpen = () => {
        setOpen(true);
        setAnchorEl(null);
    };

    const handleConfirmClose = (value) => {
        setOpen(false);

		if(value === 'Yes'){
		
			API.Post.deleteUserPost(postID, userID, Token)(dispatch);
		}
    
    };


	const handleEditOpen = () => {
		setOpenEdit(true);
		setAnchorEl(null);
	}

	const handleEditChange = (e) => {
		setPostBody(e.target.value)
	}

	const handleConfirmCloseEdit = (value) => {
		setOpenEdit(false);
		API.Post.editPost(value, postID, userID, Token)(dispatch, currentIndex);
	}

    return(
        <div className={classes.ownerMenu}>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}

            >
                <MoreVertIcon style={{color: 'white'}}/>
            </IconButton>

            <Menu
                classes={{ paper: classes.colors }}
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <MenuItem onClick={handleEditOpen}>Edit</MenuItem>
                <MenuItem style={{color: "red"}} onClick={handleClickOpen}>Delete</MenuItem>
            </Menu>

			<Dialog onClose={handleConfirmCloseEdit} aria-labelledby="post-edit" open={openEdit}>
				<DialogTitle  id="post-edit">What is the new Post Content?</DialogTitle>
				<TextField value={postBody} onChange={handleEditChange}></TextField>
				<List >
					{['Confirm Edit', 'Discard changes'].map(option => {
						return <ListItem button onClick={() => {handleConfirmCloseEdit(postBody)}} key={option}>
									<ListItemText  primary={option}/>
								</ListItem>
					})}
				</List>
			</Dialog>
            <Dialog onClose={handleConfirmClose} aria-labelledby="post-delete" open={open}>
                <DialogTitle  id="post-delete">Are you sure you want to delete the post?</DialogTitle>
                <List >
                    {['Yes', 'No'].map(option => {
                        return <ListItem button onClick={() => {handleConfirmClose(option)}} key={option}>
                                    <ListItemText  primary={option}/>
                                </ListItem>
                    })}
                </List>
            </Dialog>
        </div>
    )
}


export default function Post({
	username,
	profileImageUrl,
	postID,
	postContent,
	currentIndex,
    _id,
	dispatch,
}) {
	const classes = useStyle();
	const [state, setState] = useState(true);
	const ID = _id;
    const userID = localStorage.getItem('userID');
    
    
	function handleCommentEvent(e) {
		if (state) {
			API.Comments.getAllPostComments(postID)(dispatch);
			setState(!state);
		} else {
			setState(!state);
		}
	}

	return (
		<Container className={classes.root}>
			<div className={classes.header}>
				<Avatar
					alt={username}
					className={classes.profileImage}
					src={`https://www.gravatar.com/avatar/${profileImageUrl}`}
				></Avatar>{" "}
				<NavLink to={{
					pathname:"/profile",
					state:{id:_id}
				}} className={classes.link}>
					{_.startCase(_.toLower(username))}
				</NavLink>
                {
                    ID === userID? <PostOwner currentIndex={currentIndex} postID={postID} userID={userID} dispatch={dispatch}/>: false
                }
                
			</div>
			<div className={classes.post}>{postContent}</div>
			<div className={classes.comment}>
				<Accordion
					className={classes.commentSection}
					onClick={handleCommentEvent}
				>
					<AccordionSummary
						expandIcon={
							<ExpandMoreIcon style={{ color: "#eee" }} />
						}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography>Comments</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<div>
							<Comment postID={postID} />
						</div>
					</AccordionDetails>
				</Accordion>
			</div>
		</Container>
	);
}
