import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Category from '../components/Category';
import { checkAndReturnToken } from '../utils';
import Playlists from "./Playlists";

class Categories extends React.Component {

    state = {
        categories: []
    };

    componentDidMount() {

        // const token = localStorage.getItem('token');
        //
        // if (token === null || token === undefined) {
        //     if (this.props.history) {
        //         return this.props.history.push('/login');
        //     }
        // }
        // const parsedToken = JSON.parse(token);
        //
        // const date = new Date();
        // if ( parsedToken.expiration < date.getTime() ) {
        //     if (this.props.history) {
        //         return this.props.history.push('/login');
        //     }
        // }

        const token = checkAndReturnToken(this.props.history);

        if (token === null) {
            return;
        }


        fetch('https://api.spotify.com/v1/browse/categories', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(result => {
            console.log(result)
            return result.json();
        }).then(data => {
            const categories = data.categories.items.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    url: item.icons && item.icons.length > 0 ?
                        item.icons[0].url : ''
                }
            });

            this.setState({
                categories: categories
            })
        })
    }

    render() {

        return (
            <Switch>
                <Route
                    path={`${this.props.match.path}/:id`}
                    component={Playlists}
                />
                <Route
                    path={`${this.props.match.path}*`}
                >
                    {
                        this.state.categories.map(category => {
                            return (
                                <Category
                                    name={category.name}
                                    id={category.id}
                                    url={category.url}
                                />
                            )
                        })
                    }
                </Route>
            </Switch>
        );
    }
}

export default withRouter(Categories);
