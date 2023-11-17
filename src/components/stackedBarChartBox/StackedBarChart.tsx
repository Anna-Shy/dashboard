import {
    ResponsiveContainer,
    ComposedChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

import './stackedBarChart.scss';

interface Chart {
    nameMeeting: string;
    dima: number;
    liza: number;
    eugen: number;
    kris: number;
}

export const StackedBarChart = (
    {
        title,
        starkedBarChartData
    }
        :
        {
            title: string;
            starkedBarChartData: Chart[];
        }) => {
    return (
        <div className="starkedBarChart">
            <h4>{title}</h4>
            <div className="chart">
                <ResponsiveContainer width="99%" height="100%">
                    <ComposedChart
                        layout="vertical"
                        data={starkedBarChartData}
                        margin={{
                            top: 5,
                            right: 0,
                            bottom: 0,
                            left: 20
                        }}
                    >
                        <XAxis type="number" />
                        <YAxis dataKey="nameMeeting" type="category" />
                        <Tooltip />
                        <Bar dataKey="dima" stackId="a" fill="#8884d8" />
                        <Bar dataKey="liza" stackId="a" fill="#82ca9d" />
                        <Bar dataKey="eugen" stackId="a" fill="#ffc658" />
                        <Bar dataKey="kris" stackId="a" fill="#f55658" />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
