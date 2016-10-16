import TYPES from '../constants';

const initialState = {
	name: ''
};

export function person(state = initialState, {type, payload}) {

	switch (type) {
		case TYPES.SET_NAME:
		case TYPES.FETCH_PERSON_REQUEST:
		case TYPES.FETCH_PERSON_SUCCESS:
		case TYPES.FETCH_PERSON_FAILURE:
			return {
				...state,
				...payload
			};
		default:
			return state;
	}
}
