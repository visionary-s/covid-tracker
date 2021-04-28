import React from 'react';
import './App.css';
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import headerImg from './manifest/header.png';

class App extends React.Component{

  state = {
    data: {},
    country: ""
  }

  async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({data : fetchedData});
  }

  handleCountryChange = async (country) => {
    // fetch data
    const fetchedCountryData = await fetchData(country);
    // set data
    this.setState({data : fetchedCountryData, country: country});
  }

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} alt="covid-19" src={headerImg} />
        <Cards data={data}/>
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
