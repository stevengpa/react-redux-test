import TYPES from '../constants';
import axios from 'axios';

function fetchGitHubUser(username) {
	const url = `http://api.github.com/users/${username}`;
	return axios.get(url)
		.then(({data}) => {
			return data;
		});
}

function fetchPersonRequest() {
	return {
		type: TYPES.FETCH_PERSON_REQUEST,
		payload: {
			busy: true,
			person: {},
			error: {}
		}
	};
}

function fetchPersonSuccess(person) {
	return {
		type: TYPES.FETCH_PERSON_SUCCESS,
		payload: {
			busy: false,
			person
		}
	};
}

function fetchPersonFailure(error) {
	return {
		type: TYPES.FETCH_PERSON_FAILURE,
		payload: {
			busy: false,
			error
		}
	};
}

export function fetchPerson(username) {
	return (dispatch) => {

		dispatch(fetchPersonRequest());

		return fetchGitHubUser(username)
			.then((result) => dispatch(fetchPersonSuccess(result)))
			.catch((err) => dispatch(fetchPersonFailure(err)));
	};
}

export function setName(name) {
	return {
		type: TYPES.SET_NAME,
		payload: {name}
	};
}
