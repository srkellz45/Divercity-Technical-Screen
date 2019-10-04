import React, { Component } from 'react';
import { connect } from 'react-redux';
import { performSearch } from '../../actions/search.actions';
import SearchModal from '../SearchModal';

class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchInput: '',
			isOpen: false,
			page: 1
		};
	}

	openModal = bool => this.setState({
		isOpen: bool
	});

	handleSearch = () => this.setState({
		isOpen:false
	}, () => this.props.performSearch(this.state.page, this.state.searchInput));

	handleSearchInput = evt => {
		evt.preventDefault();

		this.setState({
			searchInput: (evt.target.value)
		});
	}

	render() {
		return (
			<div className="header-search-input">
		      <button id="start-input" onClick={ () => this.openModal(true) } >Search Companies, Users or Jobs</button>

				<SearchModal
					show={ this.state.isOpen }
					onClose={ () => this.openModal(false) }
					className="SearchModal-Backdrop"
				>
					<form className="modal-search-input" onSubmit={this.handleSearch}>
						<input
							value={ this.state.description }
							placeholder="Search Companies, Users or Jobs"
							id="search-form"
							type="text"
							autoFocus={true}
							onChange={ this.handleSearchInput }
						/>
					</form>
				</SearchModal>
			</div>
		);
	}
}

export default connect(null, {performSearch})(Search);