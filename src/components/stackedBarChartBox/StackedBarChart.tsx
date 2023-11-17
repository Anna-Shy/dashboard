import { useState, useEffect } from 'react';
import { ComposedChart, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts';

import './stackedBarChart.scss';

interface Chart {
    nameMeeting: string;
    Kristina: number;
    Eugen: number;
    Alex: number;
    Ivan: number;
}

const colors = ['#f55658', '#8884d8', '#82ca9d', '#ffc658'];

export const StackedBarChart = ({ title }: { title: string }) => {
    const [userData, setUserData] = useState<Chart[]>([]);

    useEffect(() => {
        fetch('http://localhost:4000/meeting')
            .then(response => response.json())
            .then(data => setUserData(data))
            .catch(error => console.error('Error loading data:', error));
    }, []);

    // Ensure that userData is not empty before using it
    if (userData.length === 0) {
        return <p>Loading...</p>;
    }

    const stackedBarData = userData.map(item => {
        const { nameMeeting, ...rest } = item;
        return { nameMeeting, ...rest };
    });

    const keys = Object.keys(userData[0]).filter(key => key !== 'nameMeeting');

    return (
        <div className="starkedBarChart">
            <h4>{title}</h4>
            <div className="chart">
                <ResponsiveContainer width="99%" height="100%">
                    <ComposedChart
                        layout="vertical"
                        data={stackedBarData}
                        margin={{ top: 5, right: 0, bottom: 0, left: 20 }}
                    >
                        <XAxis type="number" />
                        <YAxis dataKey="nameMeeting" type="category" />
                        <Tooltip />

                        {keys.map((key, index) => (
                            <Bar key={key} dataKey={key} stackId="a" fill={colors[index % colors.length]} />
                        ))}
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
