import { Link } from 'react-router-dom';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import './WorkshopComponent.css';

export function Workshop(props) {


  return (
    <div className="ws-card">
      <div className="card-row">
        <img
          src="data:image/png;base64,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"
          alt="workshop-img"
          className="workshopImage"
        />
        <div className="ws-info-board">
          <h2 className="ws-title">{props.name}</h2>
          <div className="ws-descrption">{props.description}</div>
          <div className="for-durandprice">
            <div className="ws-durr">
              <FontAwesomeIcon icon={faClock} />
              {props.duration} hrs
            </div>
            <div className="ws-price">
              <FontAwesomeIcon icon={faDollarSign} />
              {props.price}
            </div>
          </div>
        </div>

        <div className="for-wsbtn">
          <button className="btnws">
          <Link
            to={`/workshop/${props.id}`} 
            style={{ textDecoration: 'none', color: 'white' }}
            
          >
            View Workshop <FontAwesomeIcon icon={faArrowRight} />
          </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
