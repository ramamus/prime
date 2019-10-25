import React, { Component } from 'react';
import {connect} from 'react-redux';
import { CarService } from '../service/CarService';
import { Panel } from 'primereact/panel';
import { InputSwitch } from 'primereact/inputswitch';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import PlayersHotloaders from '../components/hotloaders/PlayersHotloaders';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: '',
      tasks: [],
      city: null,
      selectedCar: null,
      lineData: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July'
        ],
        datasets: [
          {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: '#007be5'
          },
          {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderColor: '#20d077'
          }
        ]
      },
      cities: [
        { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } },
        { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
        { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
        { label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } },
        { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } }
      ],
      fullcalendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        defaultDate: '2017-02-01',
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        editable: true
      },
      events: [
        {
          id: 1,
          title: 'All Day Event',
          start: '2017-02-01'
        },
        {
          id: 2,
          title: 'Long Event',
          start: '2017-02-07',
          end: '2017-02-10'
        },
        {
          id: 3,
          title: 'Repeating Event',
          start: '2017-02-09T16:00:00'
        },
        {
          id: 4,
          title: 'Repeating Event',
          start: '2017-02-16T16:00:00'
        },
        {
          id: 5,
          title: 'Conference',
          start: '2017-02-11',
          end: '2017-02-13'
        },
        {
          id: 6,
          title: 'Meeting',
          start: '2017-02-12T10:30:00',
          end: '2017-02-12T12:30:00'
        },
        {
          id: 7,
          title: 'Lunch',
          start: '2017-02-12T12:00:00'
        },
        {
          id: 8,
          title: 'Meeting',
          start: '2017-02-12T14:30:00'
        },
        {
          id: 9,
          title: 'Happy Hour',
          start: '2017-02-12T17:30:00'
        },
        {
          id: 10,
          title: 'Dinner',
          start: '2017-02-12T20:00:00'
        },
        {
          id: 11,
          title: 'Birthday Party',
          start: '2017-02-13T07:00:00'
        },
        {
          id: 12,
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2017-02-28'
        }
      ]
    };

    this.onTaskChange = this.onTaskChange.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
    this.carservice = new CarService();
  }

  onTaskChange(e) {
    let selectedTasks = [...this.state.tasks];
    if (e.checked) selectedTasks.push(e.value);
    else selectedTasks.splice(selectedTasks.indexOf(e.value), 1);

    this.setState({ tasks: selectedTasks });
  }

  onCityChange(e) {
    this.setState({ city: e.value });
  }

  componentDidMount() {
    this.carservice.getCarsSmall().then(data => this.setState({ cars: data }));
  }

  handleChange(event) {
    console.log(event.target.value);
  }

  handleCheckin(event) {
    console.log(event.target.id);
  }

  render() {
    const { players } = this.props;
    const totalAttending =
      players &&
      Object.keys(players).length !== 0 &&
      players.filter(({ checkedin }) => checkedin === false).length;
    console.log(this.props);

    const inHousePlayersAttending =
      players &&
      Object.keys(players).length !== 0 &&
      players.filter(
        ({ checkedin, belongto }) =>
          checkedin === true && belongto === 'INHOUSE'
      ).length;
    const travelPlayersAttending =
      players &&
      Object.keys(players).length !== 0 &&
      players.filter(
        ({ checkedin, belongto }) => checkedin === true && belongto === 'TRAVEL'
      ).length;

    return (
      <div className="p-grid p-fluid dashboard">
        <div className="p-col-12 p-lg-4">
          <div className="card summary">
            <span className="title">Attendence</span>
            <span className="detail">Players Checkedin</span>
            <span className="count visitors">{totalAttending}</span>
          </div>
        </div>
        <PlayersHotloaders />
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
              <InputText placeholder="Search" onChange={this.handleChange} />
              <Button icon="pi pi-search" />
            </div>
          </div>
          <Panel header="Players">
            <ul>
              {data.map(
                ({ firstname, lastname, grade, team, checkedin, id }) => {
                  return (
                    <li>
                      <button className="p-link">
                        <InputSwitch
                          id={id}
                          checked={checkedin}
                          onChange={event => this.handleCheckin(event)}
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
  }
}
export default connect(state => {
  console.log('hello');
  return {
    players: state.players
  };
})(Dashboard);

const data = [
  {
    id: 1,
    lastname: 'Anderson',
    firstname: 'Clara',
    grade: 4,
    team: 'Black',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    id: 2,
    lastname: 'Anslinger',
    firstname: 'Addison',
    grade: 4,
    team: 'Black',
    checkedin: true,
    belongto: 'TRAVEL'
  },
  {
    id: 3,
    lastname: 'Archuleta',
    firstname: 'Sidney',
    grade: 4,
    team: 'Black',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    id: 4,
    lastname: 'August',
    firstname: 'Ashlyn',
    grade: 4,
    team: 'Black',
    checkedin: false,
    belongto: 'TRAVEL'
  },
  {
    id: 5,
    lastname: 'Gernes',
    firstname: 'Abigail',
    grade: 4,
    team: 'Black',
    checkedin: true,
    belongto: 'TRAVEL'
  },
  {
    id: 6,
    lastname: 'Haugen',
    firstname: 'Sadie',
    grade: 4,
    team: 'Black',
    checkedin: false,
    belongto: 'TRAVEL'
  }
];
