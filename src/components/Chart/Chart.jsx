import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';


const Chart = ({ data, country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPIDaily = async () => {
            setDailyData(await fetchDailyData());
        };
        fetchAPIDaily();
    }, [setDailyData]);

    const lineChart = (
        dailyData.length ? (<Line
            data={
                {
                    labels: dailyData.map(({ date }) => date),
                    datasets: [
                        {
                            data: dailyData.map(({ confirmed }) => confirmed),
                            label: 'Infected',
                            borderColor: 'rgba(255, 255, 0, 0.5)',
                            fill: true
                        }, {
                            data: dailyData.map(({ deaths }) => deaths),
                            label: 'Deaths',
                            borderColor: 'red',
                            backgroundColor: 'rgba(255, 0, 0, 0.5)',
                            fill: true
                        }]
                }
            }
        />) : null
    );

    const barChart = (
        data.confirmed ? (
            <Bar 
                data={{
                    labels: ["Infected", "Recovered", "Deaths"],
                    datasets: [{
                        label: "Peaple",
                        backgroundColor: ["rgba(255, 255, 0, 0.5)", "rgba(0, 255, 0, 0.5)", "rgba(255, 0, 0, 0.5)"],
                        data: [data.confirmed.value, data.recovered.value, data.deaths.value]
                    }]
                }}
                options={{
                    legend: { display: false },
                    title: {
                        display: true,
                        text: `Current state in ${country}`
                    }
                }}
            />
        ) : null
    );

    return (
        <div className={styles.container}>
            {country? barChart : lineChart}
        </div>
    );
};

export default Chart;