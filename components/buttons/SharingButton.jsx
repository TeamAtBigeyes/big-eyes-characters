import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'

const SharingButton = (props) => {
  const [asyncState, setAsyncState] = useState(null);

  const handleClick = async (...args) => {
    const clickHandler = props.onClick;
    if (typeof clickHandler === 'function') {
      setAsyncState('pending');

      const returnFn = clickHandler.apply(null, args);
      if (returnFn && typeof returnFn.then === 'function') {
        try {
          await returnFn
          setAsyncState('fulfilled');
        } catch (error) {
          setAsyncState('rejected');
          throw error;
        };
      } else {
        setAsyncState(null);
      }
    }
  }

  if (asyncState === 'fulfilled') {
    window.location.href = props.fullUrl
    setAsyncState('done');
  }

  return (
    <>
      <a
        style={{cursor: 'pointer'}}
        className={`react-sharing-button__link react-sharing-button--${props.type}`}
        // href={props.fullUrl}
        // href="#"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        {props.icon({ className: 'react-sharing-button__icon' })}
        <span className="react-sharing-button__text">
          {props.text}
        </span>
      </a>
    </>
  )
}

SharingButton.propTypes = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  fullUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

SharingButton.displayName = 'SharingButton';
export default SharingButton
