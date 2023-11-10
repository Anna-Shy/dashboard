import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

import { pieChartData } from "../../source/data/PieChartData";

import './pieChartBox.scss'

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ value, cx, cy, midAngle, innerRadius, outerRadius }:
    {
        value: number, cx: any, cy: any, midAngle: any, innerRadius: any, outerRadius: any
    }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) + 5;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) - 5;

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${value}`}
        </text>
    );
};

export const PieChartBox = ({ title }: { title: string }) => {
    return (
        <div className="pieChartBox">
            <h4>{title}</h4>
            <div className="chart">
                <ResponsiveContainer width="99%" height="99%">
                    <PieChart>
                        <Pie
                            data={pieChartData}
                            cx={100}
                            cy={130}
                            startAngle={180}
                            endAngle={0}
                            innerRadius={40}
                            outerRadius={100}
                            fill="#8884d8"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {pieChartData.map((item) => (
                                <Cell key={item.name} fill={item.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
