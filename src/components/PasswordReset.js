import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './../actions/actionCreators';

class PasswordReset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            password: ''
        };
        this.setToken = this.setToken.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.submitPassword = this.submitPassword.bind(this);
    }
    componentDidMount() {
        this.setToken();
    }
    setToken() {
        let rawQuery = '';
        let token = '';
        if (this.props.location) {
            rawQuery = this.props.location.search;
            const firstIndex = rawQuery.indexOf('=');
            const lastIndex = rawQuery.indexOf('&');
            token = rawQuery.slice(firstIndex + 1, lastIndex);
        }
        if (this.state.token.length === 0 && token.length === 20) {
            this.setState({ token });
            console.log('setting token');
        } else {
            console.log('error, invalid token');
        }
    }
    handleFormChange(e) {
        const { target: { name, value } } = e;
        this.setState({ [name]: value });
    }
    submitPassword(e) {
        e.preventDefault();
        this.props.pwReset(this.state.token, this.state.password);
    }
    render() {
        return (
            <div>
                <h3 style={{ textAlign: 'center' }} > Password Reset Landing Page</h3>
                <h4 style={{ textAlign: 'center' }} >token: {this.state.token}</h4>
                <form>
                    <input
                      style={{ margin: '10rem 0 10rem 50rem' }}
                      value={this.state.password}
                      type="password"
                      name="password"
                      autoComplete="password"
                      onChange={this.handleFormChange}
                      id="password"
                      placeholder="Password"
                    />
                    <span onClick={e => this.submitPassword(e)} role="button" style={{ cursor: 'pointer', backgroundColor: 'grey' }} >submit</span>
                </form>
            </div>
        );
    }
}

PasswordReset.propTypes = {
    pwReset: PropTypes.func.isRequired,
    location: PropTypes.shape({
        search: PropTypes.string.isRequired
    }).isRequired
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => (bindActionCreators(actionCreators, dispatch));


export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
