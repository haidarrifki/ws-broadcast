var React = require('react');

const Rooms = React.createClass({

  getInitialState: function() {
    return { rooms: [] };
  },

  componentDidMount: function() {
    this.client = new WebSocket('ws://' + window.location.host);
    this.client.addEventListener('message', function (event) {
      var rooms = JSON.parse(event.data);
      this.setState({ rooms: rooms });
    }.bind(this));
  },

  componentWillUnmount: function() {
    if (this.client) {
      this.client.close();
    }
  },

  render: function () {
    var keys = Object.keys(this.state.rooms);

    if (keys.length === 0) {
      return (
        <div className="list-group-item">
          <em>No client connected currently</em>
        </div>
      );
    }

    return (
      <div>
        {keys.map(function (name) {
          return (
            <li key={name} className="list-group-item">
              <span>{name}</span>
              <span className="badge">{this.state.rooms[name]}</span>
            </li>
          );
        }.bind(this))}
      </div>
    );
  }
});

module.exports = Rooms;