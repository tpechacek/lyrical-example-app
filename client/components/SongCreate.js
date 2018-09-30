import React, { Component } from 'react';

class SongCreate extends Component {
  // You need to add this constructor function to add state to your
  // class based component.
  constructor(props) {
    super(props);

    this.state = { title: '' };
  }

  render() {
    return (
      <div>
        <h3>Create a new song.</h3>
        <form>
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

export default SongCreate;
