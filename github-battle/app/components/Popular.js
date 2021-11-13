import React from 'react';
import PropTypes from 'prop-types';

function LanguagesNav ({ selected, onUpdateLanguage }) {
  const languages = ["all", "JavaScript", "Ruby", "Java", "CSS", "Phyton"];

  return(
    <ul className="flex-center">
    {languages.map(language => (
      <li key={ language }>
        <button
          className="btn-clear nav-link"
          style={ language === selected ? {color: 'rgb(187, 46, 31)'} : null}
          onClick={() => onUpdateLanguage(language)}
        >
            { language }
        </button>
      </li>
      ))}
  </ul>
  )
}

LanguagesNav.prototype = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
}

export default class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'all'
    }

    this.updatedLanguage = this.updatedLanguage.bind(this);
  }

  updatedLanguage (selectedLanguage) {
    this.setState({ selectedLanguage });
  }

  render(){

    const { selectedLanguage } = this.state;

    return(
      <React.Fragment>
        <LanguagesNav
          selected={ selectedLanguage }
          onUpdateLanguage={ this.updatedLanguage }
        />
      </React.Fragment>
    )
  }
}