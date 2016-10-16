import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import ReactTestUtils from 'react-addons-test-utils';

expect.extend(expectJSX);

// Using named export according to the Redux Writing Tests Documentation
// Reference: https://github.com/reactjs/redux/blob/master/docs/recipes/WritingTests.md#connected-components
import {Person} from '../../../components/person/person';

describe('Person Component', () => {
	it('Should display the name', () => {

		const renderer = ReactTestUtils.createRenderer();
		renderer.render(<Person name="Steven" setName={() => {}}/>);

		const actual = renderer.getRenderOutput();
		const expected = (
			<h1>Steven</h1>
		);

		expect(actual).toIncludeJSX(expected);
	});

});
