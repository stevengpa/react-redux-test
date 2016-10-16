import React from 'react';
import {connect} from 'react-redux';
import {setName} from '../../modules/person/actions';

export const Person = React.createClass({
	propTypes: {
		name: React.PropTypes.string.isRequired,
		setName: React.PropTypes.func.isRequired
	},
	render() {
		return(
			<div>
				<h1>{this.props.name}</h1>
				<button onClick={() => this.props.setName('ABC')}>Set Name</button>
			</div>
		);
	}
});

const mapStateToProps = (state) => {
	return {
		name: state.person.name
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setName: (name) => {
			dispatch(setName(name));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Person);
