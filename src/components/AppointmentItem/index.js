// Write your code here
import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {AppointmentDetails, getFavorite} = props
  const {id, name, date, isActive} = AppointmentDetails
  const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
  const isFavorite = isActive
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onActiveId = () => {
    getFavorite(id)
  }
  return (
    <li className="card-item">
      <div className="details">
        <p className="session-name">{name}</p>
        <p className="session-date">{formattedDate}</p>
      </div>
      <button
        className="fav-btn"
        data-testid="star"
        type="button"
        onClick={onActiveId}
      >
        <img src={isFavorite} alt="star" className="icon" />
      </button>
    </li>
  )
}

export default AppointmentItem
