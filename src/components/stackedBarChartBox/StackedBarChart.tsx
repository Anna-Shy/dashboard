import { useState, useEffect } from 'react';
import { ComposedChart, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts';

import './stackedBarChart.scss';

interface Chart {
    id: number;
    userName: string;
    oneOnone: number;
    weekly: number;
    training: number;
    [key: string]: any;
}

const meetingTotals = {
    'oneOnone': 0,
    'weekly': 0,
    'training': 0,
};

const colors = ['#f55658', '#8884d8', '#82ca9d', '#ffc658'];

export const StackedBarChart = ({ title }: { title: string }) => {
    const [userData, setUserData] = useState<Chart[]>([]);

    useEffect(() => {
        fetch('http://localhost:4000/meeting')
            .then(response => response.json())
            .then(data => setUserData(data))
            .catch(error => console.error('Error loading data:', error));
    }, []);

    userData.reduce(
        (totals, user) => {
            totals.oneOnone += user.oneOnone;
            totals.weekly += user.weekly;
            totals.training += user.training;
            return totals;
        },
        { oneOnone: 0, weekly: 0, training: 0 }
    );

    const stackedBarData = Object.keys(meetingTotals).map(meeting => ({
        nameMeeting: meeting,
        ...Object.fromEntries(
            userData.map(user => [user.userName, user[meeting]])
        ),
    }));

    const keys = Object.keys(stackedBarData[0]).filter(key => key !== 'nameMeeting');

    // Ensure that userData is not empty before using it
    if (userData.length === 0) {
        return <p>Loading...</p>;
    }

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
