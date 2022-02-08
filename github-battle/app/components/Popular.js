import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularApi } from '.././utils/api';
import { FaUserAlt, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa';

function LanguagesNav ({ selected, onUpdateLanguage }) {
  const languages = ["all", "JavaScript", "Ruby", "Java", "CSS", "Python"];

  return(
    <ul className="filter flex-center">
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


function Grid ({ selected }){
  return(
    <div className="box-wrapper">
      {selected.map((info, index) => {
        const { name, owner, stargazers_count, forks_count, open_issues } = info;
        const { avatar_url, login } = owner;
        return(
          <div className="box" key={index}>
            <div className="box-content">
              <h1 className="box-header">#{index+1}</h1>
              <img src={avatar_url} alt="name" className="box-image" />
              <h3 className="box-subtitle">{name}</h3>
              <div className="box-list">
                <div className="box-item">
                  <FaUserAlt className="box-icon" color="ffc072"/>
                  <p>{login}</p>
                </div>
                <div className="box-item">
                  <FaStar className="box-icon" color="fed609"/>
                  <p>{stargazers_count}</p>
                </div>
                <div className="box-item">
                  <FaCodeBranch className="box-icon" color="bcd9f4"/>
                  <p>{forks_count}</p>
                </div>
                <div className="box-item">
                  <FaExclamationTriangle className="box-icon" color="f48b96"/>
                  <p>{open_issues}</p>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

Grid.propTypes = {
  selected: PropTypes.array.isRequired
}
export default class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'all',
      repos: {},
      error: null
    }

    this.updatedLanguage = this.updatedLanguage.bind(this);
  }

  updatedLanguage (selectedLanguage) {
    this.setState({
      selectedLanguage,
      error: null
    });

    if(!this.state.repos[selectedLanguage]){

      fetchPopularApi(selectedLanguage)
      .then(data => {
        this.setState(({repos}) => ({
          repos:{
            ...repos,
            [selectedLanguage]: data
          }
        }))
      })
      .catch(error => {
        console.warn('error fetching repos', error);

        this.setState({
          error: 'There was an error fetching popular api repositories.'
        });

      })
    }
  }

  componentDidMount(){
    this.updatedLanguage(this.state.selectedLanguage);
  }

  isLoading = () => {
    const { selectedLanguage, repos, error } = this.state;
    return !repos[selectedLanguage] && error === null;
  }

  render(){

    const { selectedLanguage, repos, error } = this.state;

    return(
      <React.Fragment>
        <LanguagesNav
          selected={ selectedLanguage }
          onUpdateLanguage={ this.updatedLanguage }
        />

        { this.isLoading() && <p>Loading...</p>}

        { error && <p>{error}</p>}

        { repos[selectedLanguage] && <Grid selected={ repos[selectedLanguage] }/> }

      </React.Fragment>
    )
  }
}