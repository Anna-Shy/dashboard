import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import { bigChartData } from '../../source/data/BigChartData';

import './bigChartBox.scss';

export const BigChartBox = ({ title }: { title: string }) => {

    return (
        <div className="bigChartBox">
            <h1>{title}</h1>
            <div className="chart">
                <ResponsiveContainer width="99%" height="100%">
                    <AreaChart
                        data={bigChartData}
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
