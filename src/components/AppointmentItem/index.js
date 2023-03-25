// Write your code here
import './index.css'

import {format} from 'date-fns'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsFavorite} = props
  const {title, isFavorite, id, date} = appointmentDetails

  const starImgUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickFavoriteIcon = () => {
    toggleIsFavorite(id)
  }

  return (
    <li>
      <div className="appointment-card">
        <div className="title-and-star">
          <p className="appointment-card-title">{title}</p>
          <button
            className="button"
            type="button"
            onClick={onClickFavoriteIcon}
            data-testid="star"
          >
            <img src={starImgUrl} alt="star" />
          </button>
        </div>
        <p className="card-date">
          {format(new Date(date), 'dd MMMM yyyy, EEEE')}
        </p>
      </div>
    </li>
  )
}

export default AppointmentItem
