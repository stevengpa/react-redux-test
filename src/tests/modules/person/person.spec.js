import expect from 'expect';
import nock from 'nock';
import reduxMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import _ from 'lodash';

import TYPES from '../../../modules/person/constants';
import * as actions from '../../../modules/person/actions';
import store from '../../../modules/store';

const middlewares = [thunk];
const mockStore = reduxMockStore(middlewares);

describe('Person Modules', () => {
	afterEach(() => {
		nock.cleanAll();
	});

	describe('Person Store', () => {
		it('Check initial state', () => {

			const actual = _.get(store.getState(), 'person', {});
			const expected = {name: ''};

			expect(actual).toEqual(expected);
		});
	}); // End of Person Store

	describe('Person Reducer', () => {
		it('Set Name Action: Should contain the name ', () => {

			store.dispatch({
				type: TYPES.SET_NAME,
				payload: {name: 'Steven'}
			});

			const actual = _.get(store.getState(), 'person', {});
			const expected = {name: 'Steven'};

			expect(actual).toEqual(expected);
		});
	}); // End of Person Reducer

	describe('Person Action', () => {
		// Sync
		it('Check the return value of setName', () => {

			const actual = actions.setName('Pérez');
			const expected = {
				type: TYPES.SET_NAME,
				payload: {name: 'Pérez'}
			};

			expect(actual).toEqual(expected);
		});

		// Async
		it('Fetch Github Profile', () => {
			const url = 'http://api.github.com/users';
			const response = {
				login: 'StevenPerez',
				id: 10041338,
				avatar_url: 'https://avatars.githubusercontent.com/u/10041338?v=3'
			};

			nock(url)
				.get('/StevenPerez')
				.reply(200, response);

			const expectedActions = [
				{type: TYPES.FETCH_PERSON_REQUEST, payload: {busy: true, person: {}, error: {}} },
				{type: TYPES.FETCH_PERSON_SUCCESS, payload: {
					busy: false,
					person: response
				}}
			];

			const fakeStore = mockStore({ person: {name: ''} });

			return fakeStore.dispatch(actions.fetchPerson('StevenPerez'))
				.then(() => expect(fakeStore.getActions()).toEqual(expectedActions));

		});

	}); // End of Person Action

});
