import React from 'react';
import { Panel } from 'primereact/panel';
import { InputSwitch } from 'primereact/inputswitch';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { toArray } from '../../util/reshape';
import { connect } from 'react-redux';

const Players = ({ players }) => {
  const totalAttending =
    players &&
    Object.keys(players).length !== 0 &&
    toArray(players).filter(({ checkedin }) => checkedin === false).length;
  const inHousePlayersAttending =
    players &&
    Object.keys(players).length !== 0 &&
    toArray(players).filter(
      ({ checkedin, belongto }) => checkedin === true && belongto === 'INHOUSE'
    ).length;
  const travelPlayersAttending =
    players &&
    Object.keys(players).length !== 0 &&
    toArray(players).filter(
      ({ checkedin, belongto }) => checkedin === true && belongto === 'TRAVEL'
    ).length;
  const handleChange = event => {
    console.log(event.target.value);
  };

  const handleCheckin = event => {
    console.log(event.target.id);
  };
  return (
    <div className="p-grid p-fluid dashboard">
      <div className="p-col-12 p-lg-4">
        <div className="card summary">
          <span className="title">Attendence</span>
          <span className="detail">Players Checkedin</span>
          <span className="count visitors">{totalAttending}</span>
        </div>
      </div>
      <div className="p-col-12 p-md-6 p-xl-3">
        <div className="highlight-box">
          <div
            className="initials"
            style={{ backgroundColor: '#007be5', color: '#00448f' }}
          >
            <span>TRVL</span>
          </div>
          <div className="highlight-details ">
            <i className="pi pi-search" />
            <span>In Attendence</span>
            <span className="count">{travelPlayersAttending}</span>
          </div>
        </div>
      </div>
      <div className="p-col-12 p-md-6 p-xl-3">
        <div className="highlight-box">
          <div
            className="initials"
            style={{ backgroundColor: '#ef6262', color: '#a83d3b' }}
          >
            <span>INHO</span>
          </div>
          <div className="highlight-details ">
            <i className="pi pi-question-circle" />
            <span>In Attendence</span>
            <span className="count">{inHousePlayersAttending}</span>
          </div>
        </div>
      </div>
      <div className="p-col-12 p-lg-4 contacts">
        <div className="p-col-12 p-md-6">
          <div className="p-inputgroup">
            <InputText placeholder="Search" onChange={handleChange} />
            <Button icon="pi pi-search" />
          </div>
        </div>
        <Panel header="Players">
          <ul>
            {players &&
              Object.keys(players).length !== 0 &&
              toArray(players).map(
                ({ firstname, lastname, grade, team, checkedin, id }) => {
                  return (
                    <li>
                      <button className="p-link">
                        <InputSwitch
                          id={id}
                          checked={checkedin}
                          onChange={event => handleCheckin(event)}
                        />
                        <span className="name">
                          {firstname} {lastname}
                        </span>
                        <span className="email">
                          {grade} {team}
                        </span>
                      </button>
                    </li>
                  );
                }
              )}
          </ul>
        </Panel>
      </div>
    </div>
  );
};

export default connect(({ players }) => ({ players }))(Players);
