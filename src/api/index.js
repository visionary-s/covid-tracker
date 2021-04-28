import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    const countryUrl = country? `${url}/countries/${country}` : url;
    try {
        const { data: {confirmed, deaths, recovered, lastUpdate} } = await axios.get(countryUrl);

        return { confirmed, deaths, recovered, lastUpdate };

    } catch (error) {
        console.log(error);
    }
};

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);

        const refactoredData = data.map((dailyData) => ({
            confirmed: dailyData.totalConfirmed,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }));

        return refactoredData;
    } catch (error) {
        console.log(error);
    }
};

export const fetchCountries = async () => {
    try {
        const { data: { countries }} = await axios.get(`${url}/countries`);
        
        return countries.map((country) => country.name);
    } catch (error) {
        console.log(error);
    }
};