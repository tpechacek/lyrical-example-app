import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSong from '../queries/fetchSong';

import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
  render() {
    // console.log(this.props);

    // Deconstruct song
    const { song } = this.props.data;

    // Not yet a song available. Query is still pending.
    if (!song) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back</Link>
        <h2>{song.title}</h2>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={this.props.params.id} />
      </div>
    );
  }
}

export default graphql(fetchSong, {
  options: props => {
    return { variables: { id: props.params.id } };
  }
})(SongDetail);

// One gotcha in here. we must stick an ID in here...
// How does the react router take from params object and stick it into the ID?
// No magic to push params.id into the fetchSong query. How do we get the variable into the
// query?

// We need to manually take this out of the this.props.params object and add it

// This behaves different than this.props.mutate() where you cna pass in query variables.
// This is very different than query

// Queries are executed automatically but mutations are called manually.
// So no clear place to pass query variables and stick them into a query when it's made.
