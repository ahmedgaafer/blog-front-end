import React from "react";
import Post from "../Post";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
	post: {
		margin: "30px 10px",
	},
}));

export default function PostLoader({ posts }) {
	const classes = useStyle();

	return (
		<div>
			{posts && posts.length > 0
				? posts.map((post, index) => (
						<div
							key={`${post._id}${index}`}
							className={classes.post}
						>
							<Post
								currentIndex={index}
								{...post.user}
								postID={post._id}
								postContent={post.text}
							/>
						</div>
				  ))
				: false}
		</div>
	);
}
