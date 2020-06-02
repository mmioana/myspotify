import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import BounceLoader from "react-spinners/BounceLoader";

import Category from '../components/Category';
import Playlists from "./Playlists";

import { checkAndReturnToken } from '../utils';

class Categories extends React.Component {

    state = {
        categories: [],
        isLoading: false
    };

    async componentDidMount() {

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

        try {
            const token = checkAndReturnToken(this.props.history);

            if (token === null) {
                return;
            }

            this.setState({
                isLoading: true
            });

            const result = await fetch('https://api.spotify.com/v1/browse/categories', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // await new Promise(resolve => {
            //     setTimeout(() => resolve(), 3000);
            // });

            const data = await result.json();

            const categories = data.categories.items.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    url: item.icons && item.icons.length > 0 ?
                        item.icons[0].url : ''
                }
            });

            this.setState({
                categories: categories,
                isLoading: false
            })
        } catch (error) {
            console.log(error)
            throw new Error('Failed to fetch data');
        } finally {
            console.log('I am finally here')
            this.setState({
                isLoading: false
            })
        }

        // fetch('https://api.spotify.com/v1/browse/categories', {
        //     method: 'GET',
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     }
        // }).then(result => {
        //     console.log(result)
        //     return result.json();
        // }).then(data => {
        //     const categories = data.categories.items.map(item => {
        //         return {
        //             id: item.id,
        //             name: item.name,
        //             url: item.icons && item.icons.length > 0 ?
        //                 item.icons[0].url : ''
        //         }
        //     });
        //
        //     this.setState({
        //         categories: categories,
        //         isLoading: false
        //     })
        // })
    }

    render() {

        let categoriesSection = null;

        if (this.state.isLoading) {
            categoriesSection = (
                <BounceLoader
                    color="#21D4FD"
                    css={{
                        margin: '0 auto'
                    }}
                />
            );
        } else if (this.state.categories && this.state.categories.length > 0) {
            categoriesSection =  this.state.categories
                .map(category => {
                    return (
                        <Category
                            key={`Category${category.id}`}
                            name={category.name}
                            id={category.id}
                            url={category.url}
                        />
                    )
                });
        } else {
            categoriesSection = 'Nicio categorie gasita.';
        }

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
                        categoriesSection
                    }
                </Route>
            </Switch>
        );
    }
}

export default withRouter(Categories);
