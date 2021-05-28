import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../Container";
import API from "../../actions/API";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { cleanNumberOfLoadedPosts } from "../../actions";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import PostLoader from "../PostLoader";

const useStyle = makeStyles((theme) => ({
	root: {
		padding: "2px 4px",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		backgroundColor: "transparent",
		margin: "10px 0px",
	},
	flex: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	newPost: {
		padding: "10px",
	},
	textInput: {
		color: "#eee",
	},
	input: {
		backgroundColor: "#232931",
		color: "#eee",
		marginLeft: theme.spacing(1),
		width: "1200px !important",
		[theme.breakpoints.down("lg")]: {
			width: "1150px !important",
		},
		[theme.breakpoints.down("md")]: {
			width: "850px !important",
		},
		[theme.breakpoints.down("sm")]: {
			width: "450px !important",
		},
		[theme.breakpoints.down(theme.breakpoints.values.xs + 500)]: {
			width: "290px !important",
		},
	},
	iconButton: {
		color: "#4ecca3",
		flexGrow: 0,
	},
	divider: {
		height: 30,
		marginLeft: 20,
		flexGrow: 0,
	},
	dividerColor: {
		backgroundColor: "#4ecca3",
	},
	fieldColors: {
		color: "#eee",
		borderColor: "#4ecca3",
	},
	focused: {},
}));

Element.prototype.hasScrollBars = function () {
	return {
		vertical: this.scrollHeight > this.style.height,
		horizontal: this.scrollWidth > this.style.width,
	};
};

const NewPost = function () {
	const choices = [
		"What's Up? 😎",
		"What are you thinking 🤔",
		"Do you want to share something... 🙄",
	];
	const classes = useStyle();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.authReducer);
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
		setValue("");

		API.Post.createNewPost(userID, token, postBody)(dispatch);
	};
	return (
		<Container className={classes.newPost}>
			<div>{state}</div>
			<div>
				<ValidatorForm onSubmit={handleSubmit}>
					<div className={classes.root}>
						<TextValidator
							multiline
							className={classes.input}
							onChange={handleChange}
							value={value}
							InputLabelProps={{
								classes: {
									root: classes.fieldColors,
								},
							}}
							InputProps={{
								classes: {
									notchedOutline: classes.fieldColors,
									input: classes.fieldColors,
									focused: classes.fieldColors,
								},
							}}
							variant="outlined"
							label="Write a new post"
							validators={["required", "minStringLength: 10"]}
							errorMessages={[
								"This field is required",
								"This field must contain at least 10 characters",
							]}
						/>

						<Divider
							className={classes.divider}
							orientation="vertical"
							classes={{ root: classes.dividerColor }}
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

const throttledReq = (loaded, dispatch, TIMEOUT) =>
	_.throttle((e) => {
		console.log("CALLED!");
		const bottomLimit =
			document.documentElement.offsetHeight - window.innerHeight;
		if (document.documentElement.scrollTop === bottomLimit) {
			API.Post.getAllPosts(loaded)(dispatch);
		}
	}, TIMEOUT);

export default function TimeLine({ id }) {
	const dispatch = useDispatch();
	let posts = useSelector((state) => state.postReducer.posts);
	let loaded = useSelector((state) => state.postReducer.loaded);
	const TIMEOUT = 1000;

	useEffect(() => {
		if (loaded === 0) {
			API.Post.getAllPosts(loaded)(dispatch);
		}

		if (loaded > 5) {
			if (loaded % 5 === 0)
				window.scrollTo(0, document.body.scrollHeight * 0.6);
		}

		const throttledEvent = throttledReq(loaded, dispatch, TIMEOUT);
		window.addEventListener("scroll", throttledEvent);

		return () => {
			window.removeEventListener("scroll", throttledEvent);
		};
	}, [loaded, dispatch, id]);

	useEffect(() => {
		dispatch(cleanNumberOfLoadedPosts());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			{!id ? <NewPost /> : false}
			<PostLoader posts={posts} />
		</div>
	);
}
