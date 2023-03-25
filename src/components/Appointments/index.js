// Write your code here
import {Component} from 'react'

import {v4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  toggleIsFavorite = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isFavorite: !eachItem.isFavorite}
        }
        return eachItem
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: dateInput,
      isFavorite: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onClickSelectedItems = () => {
    const {isFilterActive} = this.state
    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onChangeTitleInput = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onChangeDateInput = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  getFilteredAppointmentList = () => {
    const {appointmentsList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentsList.filter(eachItem => eachItem.isFavorite === true)
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput} = this.state
    const filteredAppointmentList = this.getFilteredAppointmentList()
    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="image-and-text-container">
            <div>
              <h1 className="main-heading">Add Appointment</h1>

              <form onSubmit={this.onAddAppointment}>
                <div className="input-and-text">
                  <label className="text-label" htmlFor="Title">
                    TITLE
                  </label>
                  <input
                    className="input-text"
                    id="Title"
                    type="text"
                    placeholder="Title"
                    value={titleInput}
                    onChange={this.onChangeTitleInput}
                  />
                </div>

                <div className="input-and-text">
                  <label className="text-label" htmlFor="date">
                    DATE
                  </label>
                  <input
                    className="input-text"
                    id="date"
                    type="date"
                    value={dateInput}
                    onChange={this.onChangeDateInput}
                  />
                </div>
                <button className="add-button" type="submit">
                  ADD
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-image"
            />
          </div>
          <hr />
          <div className="appointment-and-button">
            <h1 className="appointment-name">Appointments</h1>

            <button
              onClick={this.onClickSelectedItems}
              className="starred-button"
              type="button"
            >
              starred
            </button>
          </div>
          <ul className="appointment-cards-list">
            {filteredAppointmentList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleIsFavorite={this.toggleIsFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
