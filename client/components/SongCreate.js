import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import fetchSongsQuery from '../queries/fetchSongs';

class SongCreate extends Component {
  // You need to add this constructor function to add state to your
  // class based component.
  constructor(props) {
    super(props);

    this.state = { title: '' };
  }

  onSubmit(event) {
    event.preventDefault();

    // console.log(this.props);
    this.props
      .mutate({
        variables: { title: this.state.title },
        refetchQueries: [{ query: fetchSongsQuery }]
      })
      .then(() => hashHistory.push('/'));

    // console.log(this.props);
    // console.log(this.state);
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a new song.</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            onChange={event => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

// Write the mutation here;
const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
