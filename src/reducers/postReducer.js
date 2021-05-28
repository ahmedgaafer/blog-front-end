import _ from "lodash";
import {
	SET_POSTS,
	CREATE_NEW_POST,
	DELETE_USER_POST,
	UPDATE_USER_POST,
	SET_USER_POSTS,
	CLEAN_NUMBER_OF_LOADED_POST,
} from "../actions";

const initialState = {
	posts: [],
	profilePosts: [],
	loaded: 0,
};

export default function postReducer(state = initialState, action) {
	switch (action.type) {
		case SET_POSTS: {
			let newPosts = [...state.posts, ...action.posts];
			let ids = newPosts.map((o) => o._id);
			let filtered = newPosts
				.filter(({ _id }, index) => !ids.includes(_id, index + 1))
				.sort((a, b) =>
					a.createdAt > b.createdAt
						? -1
						: b.createdAt > a.createdAt
						? 1
						: 0
				);
			return {
				...state,
				posts: filtered,
				loaded: filtered.length,
			};
		}
		case CREATE_NEW_POST:
			const posts = [action.post, ...state.posts];
			return {
				...state,
				posts,
			};
		case DELETE_USER_POST:
			let newPosts = [...state.posts];
			_.remove(newPosts, (post) => post._id === action.id);

			return {
				...state,
				posts: newPosts,
			};
		case UPDATE_USER_POST: {
			let newPosts = [...state.posts];
			newPosts[action.payload.index].text = action.payload.text;

			return {
				...state,
				posts: newPosts,
			};
		}
		case SET_USER_POSTS: {
			let newPosts = [...state.profilePosts, ...action.payload.posts];
			//let ids = newPosts.map((o) => o._id);

			// let filtered = newPosts
			// 	.filter(
			// 		({ user, _id }, index) =>
			// 			user._id === action.payload.userID &&
			// 			!ids.includes(_id, index + 1)
			// 	)
			// 	.sort((a, b) =>
			// 		a.createdAt > b.createdAt
			// 			? -1
			// 			: b.createdAt > a.createdAt
			// 			? 1
			// 			: 0
			// 	);
			return {
				...state,
				profilePosts: newPosts,
				loaded: newPosts.length,
			};
		}
		case CLEAN_NUMBER_OF_LOADED_POST:
			return {
				...state,
				loaded: 0,
				profilePosts: [],
				posts: [],
			};
		default:
			return state;
	}
}
