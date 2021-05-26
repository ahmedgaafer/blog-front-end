import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Container } from "../Container";
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import PostLoader from "../PostLoader";
import API from "../../actions/API";
import { useSelector } from "react-redux";
import { cleanNumberOfLoadedPosts } from "../../actions";
import _ from "lodash";

const useStyle = makeStyles((theme) => ({
	root: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginTop: "50px",
	},
	large: {
		bottom: "5vh",
		width: theme.spacing(15),
		height: theme.spacing(15),
		border: "2px solid #4ecca3",
		transition: "transform 0.15s ease-in-out",
		"&:hover": {
			transform: "scale(2)",
			cursor: "pointer",
		},
	},
	name: {
		fontSize: "23px",
		letterSpacing: theme.spacing(1.5),
	},
	divider: {
		width: "90%",
	},
	dividerColor: {
		backgroundColor: "#4ecca3",
	},
	socialInfo: {
		marginTop: "30px",
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		alignContent: "center",
	},
	infoDivider: {
		height: 100,
		width: 1,
	},
	infoBlock: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "center",
	},
	infoTitle: {
		fontSize: "24px",
		letterSpacing: theme.spacing(0.5),
		color: "#2caa81",
	},
}));

const throttledReq = (loaded, userID, dispatch, TIMEOUT) => () =>
	_.throttle((e) => {
		const bottomLimit =
			document.documentElement.offsetHeight - window.innerHeight;
		if (document.documentElement.scrollTop === bottomLimit) {
			API.Post.getUserPosts(loaded, userID)(dispatch);
		}
	}, TIMEOUT);

export default function Profile() {
	const classes = useStyle();
	const dispatch = useDispatch();
	const userID = window.location.href.split("/").pop();
	const loaded = useSelector((store) => store.postReducer.loaded);
	let posts = useSelector((state) => state.postReducer.profilePosts);
	const [user, setUser] = useState({
		name: "none",
		img: "none",
		followers: "none",
		following: "none",
		numberOfPosts: "none",
	});

	const TIMEOUT = 1000;

	useEffect(() => {
		if (loaded === 0) {
			API.Post.getUserPosts(loaded, userID)(dispatch);
			(async () => {
				const currentUser = await API.Auth.getUserById({ userID });
				setUser(currentUser);
			})();
		}

		if (loaded > 5) {
			if (loaded % 5 === 0)
				window.scrollTo(0, document.body.scrollHeight * 0.6);
		}

		window.addEventListener(
			"scroll",
			_.throttle((e) => {
				const bottomLimit =
					document.documentElement.offsetHeight - window.innerHeight;
				if (document.documentElement.scrollTop === bottomLimit) {
					API.Post.getUserPosts(loaded, userID)(dispatch);
				}
			}, TIMEOUT)
		);

		return function cleanup() {
			window.removeEventListener("scroll", _.throttle);
		};
	}, [loaded, dispatch, userID]);

	useEffect(() => {
		dispatch(cleanNumberOfLoadedPosts());
	}, [dispatch]);
	function handleImageClick(e) {
		window.open(e.target.src, "_blank").focus();
	}
	return (
		<div>
			<Container className={classes.root}>
				<Avatar
					alt={user.name}
					src={`https://www.gravatar.com/avatar/${user.img}?s=500`}
					className={classes.large}
					onClick={handleImageClick}
				/>
				<Typography className={classes.name}>
					{user.name.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
						return g1.toUpperCase() + g2.toLowerCase();
					})}
				</Typography>
				<Divider
					className={classes.divider}
					classes={{ root: classes.dividerColor }}
				/>
				<div className={classes.socialInfo}>
					<div className={classes.infoBlock}>
						<div className={classes.infoTitle}>Number Of Posts</div>
						<div>{user.numberOfPosts}</div>
					</div>
					<Divider
						className={classes.infoDivider}
						dir="vertical"
						classes={{ root: classes.dividerColor }}
					/>
					<div className={classes.infoBlock}>
						<div className={classes.infoTitle}>Followers</div>
						<div>{user.followers}</div>
					</div>
					<Divider
						className={classes.infoDivider}
						dir="vertical"
						classes={{ root: classes.dividerColor }}
					/>
					<div className={classes.infoBlock}>
						<div className={classes.infoTitle}>Following</div>
						<div>{user.following}</div>
					</div>
				</div>
			</Container>
			<PostLoader posts={posts} />
		</div>
	);
}
