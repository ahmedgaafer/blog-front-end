import Paper from "@material-ui/core/Paper";
import React from "react";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import _ from "lodash";
import { NavLink } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
	root: {
		backgroundColor: "black",
	},
	element: {
		backgroundColor: "inherit",
		color: "white",
		margin: "10px",
	},
	divider: {
		height: 3,
		marginBottom: 30,
		marginTop: 30,
	},
	dividerColor: {
		backgroundColor: "#5FE2B7",
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
	header: {
		display: "flex",
		flexDirection: "row",
		alignContent: "center",
		marginBottom: "10px",
		flexWrap: "wrap",
	},
	profileImage: {
		animation: `$shrink 1000ms ${theme.transitions.easing.easeInOut} both`,
		"&:hover": {
			animation: `$zoom 1000ms ${theme.transitions.easing.easeInOut} both`,
		},
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

function UserLink({ id, name, email, img }) {
	const classes = useStyle();
	return (
		<div className={classes.header}>
			<Avatar
				alt={name}
				className={classes.profileImage}
				src={`https://www.gravatar.com/avatar/${img}`}
			></Avatar>
			<NavLink to={`/profile/${id}`} className={classes.link}>
				{_.startCase(_.toLower(name))} ({`${email}`})
			</NavLink>
		</div>
	);
}

export default function SearchWindow({ users }) {
	const classes = useStyle();

	return (
		<Paper
			elevation={3}
			style={{
				backgroundColor: "#232931",
				minWidth: "33vw",
				padding: 30,
				border: "1px solid #5FE2B7",
			}}
		>
			{users.map((user, i) => {
				return (
					<React.Fragment key={user.email}>
						<UserLink {...user} />
						{i < users.length - 1 ? (
							<Divider
								className={classes.divider}
								classes={{ root: classes.dividerColor }}
							/>
						) : (
							""
						)}
					</React.Fragment>
				);
			})}
		</Paper>
	);
}
