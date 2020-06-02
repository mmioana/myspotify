import React from 'react';
import { faHome, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './LabeledInput.css';

class LabeledInput extends React.Component {

    state = { };

    constructor(props) {
        super(props);

        this.state.value = this.props.defaultValue;

        console.log(`LabeledInput - Inside constructor`);
    }

    static getDerivedStateFromProps(props, state) {
        console.log(`LabeledInput - Inside getDerivedStateFromProps`, props, state);

        return null;
    }

    componentDidMount() {
        console.log(`LabeledInput - Inside componentDidMount`);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(`LabeledInput - Inside shouldComponentUpdate`, nextProps, nextState);
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log(`LabeledInput - Inside getSnapshotBeforeUpdate`, prevProps, prevState);
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(`LabeledInput - Inside componentDidUpdate`, prevProps, prevState, snapshot);
    }

    componentWillUnmount() {
        console.log(`LabeledInput - Inside componentWillUnmount`);
    }

    onChangeHandler = e => {
        console.log(e.target.value);
        const value = e.target.value

        this.props.change(this.props.id, value)

        this.setState({
            value: value
        });
    };

    render() {

        console.log(`LabeledInput - Inside render`);

        const style = {
            marginBottom: '10px',
            color: '#929292',
            fontSize: '18px',
            fontFamily: 'Roboto'
        };

        return (
            <div className="input-group labeled-input">
                <label
                    htmlFor={this.props.id}
                    style={style}
                >
                    {this.props.label}
                </label>
                <input
                    type="text"
                    placeholder={this.props.placeholder}
                    id={this.props.id}
                    value={this.state.value || ''}
                    onChange={this.onChangeHandler}
                    className="form-control"
                />
            </div>
        );

    }
}

export default LabeledInput;