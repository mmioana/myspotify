import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';

import Header from './components/Header';

import About from './pages/About';
import Categories from './pages/Categories';
import ErrorBoundary from './pages/ErrorBoundary';
import Login from './pages/Login';
import Playlists from './pages/Playlists';
import SpotifyCallback from './pages/SpotifyCallback';
import Tracks from './pages/Tracks';

function App() {

  return (
    <div className="App">
        <ErrorBoundary>
            <Header
            />
            <main>
                <Switch>
                    <Route
                        path="/"
                        exact={true}
                        render={() => (<div>Home page</div>)}
                    />
                    <Route
                        path="/about"
                        component={About}
                    />
                    <Route
                        path="/login"
                        component={Login}
                    />
                    <Route
                        path="/categories*"
                        component={Categories}
                    />
                    <Route
                        path="/playlists/:id"
                        component={Tracks}
                    />
                    <Route
                        path="/callback"
                        component={SpotifyCallback}
                    />
                </Switch>
            </main>
        </ErrorBoundary>
    </div>
  );
}

export default App;
