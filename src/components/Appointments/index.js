// Write your code here
import './index.css'
import {v4} from 'uuid'
import {Component} from 'react'
import AppointmentItem from '../AppointmentItem/index'

class Appointments extends Component {
  state = {name: '', date: '', AppointmentList: [], isFavShown: false}

  getFavorite = id => {
    this.setState(prevState => ({
      AppointmentList: prevState.AppointmentList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isActive: !eachItem.isActive}
        }
        return eachItem
      }),
    }))
  }

  getStarred = () => {
    this.setState(prevState => ({isFavShown: !prevState.isFavShown}))
  }

  getFilteredAppointments = () => {
    const {isFavShown, AppointmentList} = this.state

    if (isFavShown === true) {
      return AppointmentList.filter(eachItem => eachItem.isActive === true)
    }
    return AppointmentList
  }

  onAddAppointment = event => {
    const {name, date} = this.state
    event.preventDefault()
    const newAppointment = {
      id: v4(),
      name,
      date,
      isActive: false,
    }

    this.setState(prevState => ({
      AppointmentList: [...prevState.AppointmentList, newAppointment],
      name: '',
      date: '',
    }))
  }

  getStarred = () => {
    const {isFavShown} = this.state
    this.setState({
      isFavShown: !isFavShown,
    })
  }

  onAddName = event => {
    this.setState({
      name: event.target.value,
    })
  }

  onAddDate = event => {
    this.setState({
      date: event.target.value,
    })
  }

  render() {
    const {name, date, isFavShown} = this.state
    const filteredAppointmentList = this.getFilteredAppointments()

    const StarredStyle = isFavShown ? 'act-button' : 'fav-button'

    return (
      <div className="bg-container">
        <div className="container">
          <div className="details-container">
            <div className="form-container">
              <h1 className="title">Add Appointment</h1>
              <form className="form" onSubmit={this.onAddAppointment}>
                <label htmlFor="text" className="form-label">
                  TITLE
                </label>
                <input
                  type="text"
                  className="input-form"
                  id="text"
                  placeholder="Title"
                  value={name}
                  onChange={this.onAddName}
                />
                <label htmlFor="date" className="form-label">
                  DATE
                </label>
                <input
                  type="date"
                  className="input-form"
                  id="date"
                  value={date}
                  onChange={this.onAddDate}
                />
                <button className="form-button" type="submit">
                  Add
                </button>
              </form>
            </div>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="form-image"
              />
            </div>
          </div>
          <div className="content-container">
            <div className="title-container">
              <h1 className="heading">Appointments</h1>
              <button
                className={`str-button ${StarredStyle}`}
                type="button"
                onClick={this.getStarred}
              >
                Starred
              </button>
            </div>
            <ul className="card-container">
              {filteredAppointmentList.map(eachAppointment => (
                <AppointmentItem
                  AppointmentDetails={eachAppointment}
                  key={eachAppointment.id}
                  getFavorite={this.getFavorite}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
