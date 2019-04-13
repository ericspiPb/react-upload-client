import React from 'react'
import PropTypes from 'prop-types'

const ProgressBar = ({percentage}) => {
  return (
    <div className="progress">
      <div className={`progress-bar progress-bar-striped bg-success ${percentage < 100 ? "progress-bar-animated" : ""}`} role="progressbar" style={{width: `${percentage}%`}}>{percentage}%</div>
    </div>
  )
}

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired
}

export default ProgressBar
