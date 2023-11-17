import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import './pieChartBox.scss'

interface Chart {
    userName: string;
    mistake: number;
    color: string;
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ value, cx, cy, midAngle, innerRadius, outerRadius }:
    {
        value: number, cx: any, cy: any, midAngle: any, innerRadius: any, outerRadius: any
    }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${value}`}
        </text>
    );
};

export const PieChartBox = ({ title }: { title: string }) => {
    const [userData, setUserData] = useState<Chart[]>([]);

    useEffect(() => {
        fetch('http://localhost:4000/mistake')
            .then(response => response.json())
            .then(data => setUserData(data))
            .catch(error => console.error('Error loading data:', error));
    }, []);

    // Ensure that userData is not empty before using it
    if (userData.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <div className="pieChartBox">
            <h4>{title}</h4>
            <div className="chart">
                <ResponsiveContainer width="99%" height="99%">
                    <PieChart>
                        <Pie
                            data={userData}
                            dataKey="mistake"
                            cx={150}
                            cy={110}
                            startAngle={180}
                            endAngle={0}
                            innerRadius={40}
                            outerRadius={100}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            paddingAngle={5}
                        >
                            {userData.map((item) => (
                                <Cell key={item.userName} stroke={item.color} fill={item.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
