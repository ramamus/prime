import React from 'react';
import { connect } from 'react-redux';
import { requestPlayers } from '../../ducks/players';

class PlayersHotloader extends React.Component {
  render() {
    const { _requestPlayers } = this.props;
    _requestPlayers();
    return null;
  }
}

export default connect(
  null,
  dispatch => ({
    _requestPlayers: () => dispatch(requestPlayers())
  })
)(PlayersHotloader);
