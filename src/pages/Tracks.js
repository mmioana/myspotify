import React from 'react';
import { withRouter } from 'react-router-dom';

import Player from '../components/Player';
import Track from '../components/Track';

import { checkAndReturnToken } from '../utils';

import './Tracks.css';

class Tracks extends React.Component {

    state = {
        tracks: [],
        currentTrackId: null
    };

    componentDidMount() {

        const playlistId = this.props.match && this.props.match.params ?
            this.props.match.params.id : null;

        if (playlistId) {

            const token = checkAndReturnToken(this.props.history);

            if (token === null) {
                return;
            }

            fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=20`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(result => {
                console.log(result)
                return result.json();
            }).then(data => {
               const tracks = data.items.map(item => {

                   const track = item.track ? item.track : {};

                   return {
                       id: track.id,
                       name: track.name,
                       duration: track.duration_ms ?
                           track.duration_ms / 60000 : 0,
                       artists: track.artists ?
                           track.artists.map(artist => {
                               return artist.name;
                           }) : []
                   }
               });

               this.setState({
                   tracks: tracks
               });
            });
        }

    }

    onTrackClickedHandler = (id) => {
        this.setState({
            currentTrackId: id
        })
    };

    render() {

        const playlistName = this.props.location && this.props.location.state ?
            this.props.location.state.playlistName : 'Default';

        return (
            <div>
                <h1>
                    {
                        playlistName
                    }
                </h1>
                <section className="content__wrapper">
                    <section className="section__tracks">
                        <ul className="tracks__wrapper">
                        { this.state.tracks.map((track, index) => {

                            const isTrackPicked = track.id === this.state.currentTrackId;

                            return (
                                <Track
                                    key={`Track${track.id}${index}`}
                                    pickTrack={this.onTrackClickedHandler}
                                    id={track.id}
                                    name={track.name}
                                    artists={track.artists}
                                    duration={track.duration}
                                    isTrackPicked={isTrackPicked}
                                />
                            )
                        })}
                        </ul>
                    </section>
                    <section className="section__player">
                        <Player
                            trackId={this.state.currentTrackId}
                        />
                    </section>
                </section>
            </div>
        )
    }
}

export default withRouter(Tracks);