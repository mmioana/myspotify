import React from 'react';

import LabeledInput from '../LabeledInput';

class Login extends React.Component {

    state = {
        'client-id': '',
        'client-secret': ''
    };

    componentDidMount() {
        // fetch('https://jsonplaceholder.typicode.com/posts123')
        //     .then(result => {
        //
        //         if (result.status < 200 || result.status >= 300) {
        //             return Promise.reject(`Error encountered with status ${result.status}`);
        //         }
        //
        //         return result.json()
        //     })
        //     .then(data => {
        //         console.log(data)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })

        fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${btoa('098c664b47fd48b589b59e186f453a80:00d42f3cea8f496e8bddf5770fd1919a')}`
            }
        }).then( result => {
            console.log(result)
        })
    }

    onClickHandler = () => {

        const encodedAuth = btoa(this.state['client-id'] + ":" + this.state['client-secret']);

        fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${encodedAuth}`
            }
        }).then( result => {
            console.log(result)
        })
    };

    onChangeHandler = (id, value) => {

        const state = {...this.state};
        state[id] = value;

        this.setState(state);
    };

    render() {
        return (
            <div>
                <LabeledInput
                    id="client-id"
                    label="Client ID"
                    placeholder="Client ID"
                    change={this.onChangeHandler}
                />
                <LabeledInput
                    id="client-secret"
                    label="Client Secret"
                    placeholder="Client Secret"
                    change={this.onChangeHandler}
                />

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.onClickHandler}
                >
                    Login
                </button>
            </div>
        )
    }
}

export default Login;