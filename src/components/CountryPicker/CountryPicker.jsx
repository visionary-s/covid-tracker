import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl} from '@material-ui/core';
import styles from './CountryPicker.module.css';
import { fetchCountries } from '../../api';


const CountryPicker = ({ handleCountryChange }) => {
    const [countryData, setCountryData] = useState([]);

    useEffect(() => {
        const fetchCountryData = async () => {
            setCountryData(await fetchCountries());
        };
        fetchCountryData();
    }, [setCountryData]);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(event) => handleCountryChange(event.target.value)}>
                <option value="">Global</option>
                {countryData.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    );
};

export default CountryPicker;