import React, { useEffect }  from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../Container";
import Post from "../Post";
import API from "../../actions/API";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { cleanNumberOfLoadedPosts } from '../../actions'
import _ from 'lodash';


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

Element.prototype.hasScrollBars = function() {
    return {"vertical": this.scrollHeight > this.style.height, "horizontal": this.scrollWidth > this.style.width};
}

const NewPost = function () {
	const choices = [
		"What's Up? 😎",
		"What are you thinking 🤔",
		"Do you want to share something... 🙄",
	];
	const classes = useStyle();
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer);
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
        const userID = user.id;
        const token = user.token;
        setValue("")
        
        API.Post.createNewPost(userID, token, postBody)(dispatch);
    }
	return (
		<Container className={classes.newPost}>
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
		</Container>
	);
};

export default function TimeLine({id}) {
    const dispatch = useDispatch();
    let mainPagePost = useSelector(state => state.postReducer.posts);
    let profilePosts = useSelector(state => state.postReducer.profilePosts);
    const posts = (!id)? mainPagePost : profilePosts;
    let loaded = useSelector(state => state.postReducer.loaded);
    const TIMEOUT = 1000;


    useEffect(()=> {
        if(loaded === 0){
            if(id){
                API.Post.getUserPosts(loaded, id)(dispatch)
            }
            else{
                API.Post.getAllPosts(loaded)(dispatch);
            }
        }
    
        if(loaded > 5){
            if(loaded % 5 === 0) window.scrollTo(0, document.body.scrollHeight * 0.6)
            
        }


        window.addEventListener('scroll',  _.throttle(e => {
            const bottomLimit = document.documentElement.offsetHeight - window.innerHeight;
            if(document.documentElement.scrollTop === bottomLimit){
                if(id){

                    API.Post.getUserPosts(loaded, id)(dispatch)
                }
                else{
                    API.Post.getAllPosts(loaded)(dispatch);
                }
            }
        }, TIMEOUT))

    }, [loaded, dispatch, id])

    useEffect(() => {

        dispatch(cleanNumberOfLoadedPosts())
    }, [dispatch]);
	const classes = useStyle();
	return (
		<div>
			{(!id)?<NewPost  /> : false}

			{(posts && posts.length > 0)?posts.map((post, index) => (
				<div key={post._id} className={classes.post}>
					<Post
                        currentIndex={index}
						{...post.user}
                        dispatch={dispatch}
						postID={post._id}
						postContent={post.text}
					/>
				</div>
			)): false}
		</div>
	);
};
