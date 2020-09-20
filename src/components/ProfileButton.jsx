import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ProfileButton.css';

export default function ProfileButton(props) {
  const { content, dataTestId, link, onClick } = props;
  return (
    <div>
      <Link to={link}>
        <button
          data-testid={dataTestId}
          className="profile-button"
          onClick={onClick}
        >
          {content}
        </button>
      </Link>
    </div>
  );
}

ProfileButton.propTypes = {
  content: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

ProfileButton.defaultProps = {
  onClick: () => false,
};
