import React from 'react';
import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import PlayersHotloaders from '../../components/hotloaders/PlayersHotloaders';
import { toArray } from '../../util/reshape';

const Reports = ({ players }) => {
  const attending =
    players &&
    Object.keys(players).length !== 0 &&
    toArray(players).filter(({ checkedin }) => checkedin === true);

  const notAttending =
    players &&
    Object.keys(players).length !== 0 &&
    toArray(players).filter(({ checkedin }) => checkedin === false);
  return (
    <div>
      <PlayersHotloaders />
      <div className="p-col-12 p-lg-6">
        <div className="card">
          <h1 style={{ fontSize: '16px' }}>Players Checked In</h1>
          <DataTable
            value={attending}
            style={{ marginBottom: '20px' }}
            responsive={true}
          >
            <Column field="firstname" header="First Name" sortable={true} />
            <Column field="lastname" header="Last Name" sortable={true} />
            <Column field="grade" header="Grade" sortable={true} />
            <Column field="team" header="Team" sortable={true} />
            <Column field="belongto" header="Plays For" sortable={true} />
          </DataTable>
        </div>
      </div>
      <div className="p-col-12 p-lg-6">
        <PlayersHotloaders />
        <div className="card">
          <h1 style={{ fontSize: '16px' }}>Players Not Checked In</h1>
          <DataTable
            value={notAttending}
            style={{ marginBottom: '20px' }}
            responsive={true}
          >
            <Column field="firstname" header="First Name" sortable={true} />
            <Column field="lastname" header="Last Name" sortable={true} />
            <Column field="grade" header="Grade" sortable={true} />
            <Column field="team" header="Team" sortable={true} />
            <Column field="belongto" header="Plays For" sortable={true} />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default connect(({ players }) => ({ players }))(Reports);
