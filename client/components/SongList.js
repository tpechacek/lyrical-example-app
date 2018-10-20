import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSongsQuery from '../queries/fetchSongs';

class SongList extends Component {
  onSongDelete(id) {
    this.props
      .mutate({ variables: { id: id } })
      // .refetch only works if the query is associated with the component itself.
      .then(() => this.props.data.refetch());
  }

  renderSongs() {
    return this.props.data.songs.map(song => {
      return (
        <li key={song.id} className="collection-item">
          {song.title}
          <i
            className="material-icons"
            onClick={() => this.onSongDelete(song.id)}
          >
            delete
          </i>
        </li>
      );
    });
  }

  render() {
    // GraphQL returns all the data the query below via the this.props.data object.
    // console.log(this.props);
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

// You have to make multiple function calls when dealing with multiple queries
// or mutations.
export default graphql(mutation)(graphql(fetchSongsQuery)(SongList));
