import React, { useEffect } from "react";

import withState from "../../Utils/HOC/withState";
import withContainer from "../../Utils/HOC/withContainer";
import Post from "../Post";
import API from "../../actions/API";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const useStyle = makeStyles((theme) => ({
	root: {
		padding: "2px 4px",
		display: "flex",
        flexDirection:"row",
        justifyContent:"center",
		alignItems: "center",
		width: "100%",
        backgroundColor:"transparent",
        margin: "10px 0px",
	},
    flex:{
        display: "flex",
        flexDirection:"row", 
        alignItems: "center",
    },
	post: {
		margin: "30px 10px",
	},
	newPost: {
		padding: "10px",
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
	iconButton: {
        color: "#4ecca3",
        flexGrow:0
	},
	divider: {
		height: 30,
        marginLeft: 20,
        flexGrow:0
	},
    dividerColor:{
        backgroundColor: "#4ecca3",
    },
    fieldColors:{
        color: "#eee",
        borderColor:"#4ecca3",
    },
    focused:{},
}));

const NewPost = withContainer(function (props) {
	const choices = [
		"What's Up? 😎",
		"What are you thinking 🤔",
		"Do you want to share something... 🙄",
	];
	const classes = useStyle();

	const [value, setValue] = React.useState("");
	const [state] = React.useState(
		choices[Math.floor(Math.random() * choices.length)]
	);
	const handleChange = (event) => {
		setValue(event.target.value);
	};

    const handleSubmit = (event) => {
        event.preventDefault();
        const postBody = value;
        const userID = props.id;
        const token = props.token;
        console.table([postBody, userID, token])
        API.Post.createNewPost(userID, token, postBody)(props.dispatch);
    }
	return (
		<div className={classes.newPost}>
			<div>{state}</div>
			<div>
				<ValidatorForm  
                    onSubmit={handleSubmit}
                >
                    <div className={classes.root}>
                        <TextValidator
                            multiline
                            className={classes.input}
                            onChange={handleChange}
                            value={value}
                            
                            InputLabelProps={{
                                classes:{
                                    root:classes.fieldColors,
                                }
                            }}
                            InputProps={{
                                classes:{
                                    notchedOutline: classes.fieldColors,
                                    input: classes.fieldColors,
                                    focused: classes.fieldColors,
                                }
                            }}
                            variant="outlined"
                            label="Write a new post"
                            validators={['required', 'minStringLength: 10']}
                            errorMessages={['This field is required', 'This field must contain at least 10 characters']}    
                        />
                        
                        <Divider
                            className={classes.divider}
                            orientation="vertical"
                            classes={{root: classes.dividerColor}}
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
});

export default withState(function TimeLine(props) {
	useEffect(() => {
		API.Post.getAllPosts()(props.dispatch);
	}, [props.dispatch]);

	const classes = useStyle();
	return (
		<div>
			<NewPost {...props} />

			{props.posts.map((post) => (
				<div key={post._id} className={classes.post}>
					<Post
						{...post.user}
						postID={post._id}
						postContent={post.text}
					/>
				</div>
			))}
		</div>
	);
});
