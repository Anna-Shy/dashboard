import { useState } from 'react';
import Switch from '@mui/material/Switch';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import './bigChartBox.scss';

interface Chart {
    month: string;
    dima: number;
    liza: number;
    eugen: number;
    kris: number;
}

export const BigChartBox = (
    { title, bigChartYearData, bigChartMonthData }:
        {
            title: string;
            bigChartYearData: Chart[];
            bigChartMonthData: Chart[];
        }) => {
    const [checked, setChecked] = useState(true);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    return (
        <div className="bigChartBox">
            <div className="bigChartBox-row">
                <h4>{title}</h4>

                <div className="bigChartBox-switch">
                    <p className="switch-text">Month</p>
                    <Switch checked={checked} onChange={handleChange} defaultChecked color="default" />
                    <p className="switch-text">Year</p>
                </div>


            </div>
            <div className="chart">
                <ResponsiveContainer width="99%" height="100%">
                    <AreaChart
                        data={checked ? bigChartYearData : bigChartMonthData}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="dima" stackId="1" stroke="#8884d8" fill="#8884d8" />
                        <Area type="monotone" dataKey="liza" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                        <Area type="monotone" dataKey="eugen" stackId="1" stroke="#ffc658" fill="#ffc658" />
                        <Area type="monotone" dataKey="kris" stackId="1" stroke="#f55658" fill="#f55658" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
