import {
	PostActionTypes,
	PostIntialStateTypes
} from '../../Types/ReducerTypes/postTypes';

import {
	REQUEST_CREATE_POST,
	SUCCESS_CREATE_POST,
	FAILURE_CREATE_POST,
	REQUEST_DELETE_POST,
	SUCCESS_DELETE_POST,
	FAILURE_DELETE_POST,
	REQUEST_UPDATE_POST,
	SUCCESS_UPDATE_POST,
	FAILURE_UPDATE_POST,
	REQUEST_GET_POSTS
} from './actionNames';

export const intialState: PostIntialStateTypes = {
	posts: []
};

const postReducer = (state = intialState, action: PostActionTypes) => {
	const myStorage = window.localStorage;
	switch (action.type) {
		case REQUEST_GET_POSTS: {
			const myPosts = myStorage.getItem('posts');
			if (myPosts) {
				return {
					...state,
					posts: JSON.parse(myPosts)
				};
			} else {
				return {
					...state
				};
			}
		}
		case REQUEST_CREATE_POST: {
			const test = {
				id: state.posts.length,
				done: false,
				liked: false,
				...action.data
			};
			const myPosts = myStorage.getItem('posts');
			if (myPosts) {
				const parse = JSON.parse(myPosts);
				parse.push(test);
				myStorage.setItem('posts', JSON.stringify(parse));
			} else {
				myStorage.setItem('posts', JSON.stringify([test]));
			}

			return {
				...state,
				posts: [test, ...state.posts]
			};
		}
		case SUCCESS_CREATE_POST: {
			return {
				...state
			};
		}
		case FAILURE_CREATE_POST: {
			return {
				...state
			};
		}
		case REQUEST_DELETE_POST: {
			const id = action.data.id;
			const filteredPosts = state.posts.filter((post) => post.id !== id);
			myStorage.setItem('posts', JSON.stringify(filteredPosts));
			return {
				...state,
				posts: filteredPosts
			};
		}
		case SUCCESS_DELETE_POST: {
			return {
				...state
			};
		}
		case FAILURE_DELETE_POST: {
			return {
				...state
			};
		}
		case REQUEST_UPDATE_POST: {
			const postIndex = state.posts.findIndex((p) => p.id === action.data.id);
			const post = state.posts[postIndex];
			if (action.data.text) {
				post.text = action.data.text;
			}
			const posts = [...state.posts];
			posts[postIndex] = post;
			myStorage.setItem('posts', JSON.stringify(posts));
			return {
				...state,
				posts
			};
		}
		case SUCCESS_UPDATE_POST: {
			return {
				...state
			};
		}
		case FAILURE_UPDATE_POST: {
			return {
				...state
			};
		}
		default: {
			return state;
		}
	}
};

export default postReducer;
