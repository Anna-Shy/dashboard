import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { userColors } from '../../source/data/MainData';
import { UpdateModal } from '../updateModal/UpdateModal';

import { months } from '../../source/data/MainData';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

import './bigChartBox.scss';

interface Chart {
    id: number;
    userName: string;
    month: string;
    week1: number;
    week2: number;
    week3: number;
    week4: number;
    [key: string]: any;
}

const incidentTotals = {
    week1: 0,
    week2: 0,
    week3: 0,
    week4: 0,
};

const ScrollspyItem = ({ id, isActive }: { id: string; label: string; isActive: boolean }) => (
    <li className='list-item'>
        <a className={`item-link ${isActive ? 'active' : ''}`} href={`#${id}`}>
            <div className={`item-circle ${isActive ? 'active' : ''}`}></div>
        </a>
    </li>
);

export const BigChartBox = ({ title }: { title: string }) => {
    const [userData, setUserData] = useState<Chart[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const scrollspyRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        fetch('http://localhost:4000/incident')
            .then((response) => response.json())
            .then((data) => setUserData(data))
            .catch((error) =>
                console.error('Error loading data:', error)
            );
    }, []);

    const handleScroll = () => {
        if (scrollspyRef.current) {
            const scrollY = window.scrollY || document.documentElement.scrollTop;

            const sectionOffsets = months.map((month) => ({
                id: month,
                offset: (scrollspyRef.current?.getBoundingClientRect().top || 0) + window.scrollY,
            }));

            let newActiveSection: string | null = null;

            for (const section of sectionOffsets) {
                if (
                    scrollY >= section.offset &&
                    scrollY < (section.offset + (scrollspyRef.current?.clientHeight || 0))
                ) {
                    newActiveSection = section.id;
                    break;
                }
            }

            setActiveSection(newActiveSection);
        }
        console.log('handleScroll is called!');
    };


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleClick = async (e: any, userId: number) => {
        e.preventDefault();
        setOpenAlert(true);

        try {
            await axios.put(`http://localhost:4000/incident`, userData.find(user => user.id === userId));
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e: any, index: number) => {
        const { name, value } = e.target;

        setUserData((prev) => {
            const updatedUserData = [...prev];
            updatedUserData[index] = {
                ...updatedUserData[index],
                [name]: Number(value),
            };
            return updatedUserData;
        });
    };

    userData.reduce(
        (totals, user) => {
            totals.week1 += user.week1;
            totals.week2 += user.week2;
            totals.week3 += user.week3;
            totals.week4 += user.week4;
            return totals;
        },
        { week1: 0, week2: 0, week3: 0, week4: 0 }
    );

    const handleMouseDownModal = (
        event: React.KeyboardEvent | React.MouseEvent
    ) => {
        if (event.altKey || event.detail === 3) {
            setOpenModal(true);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    // Ensure that userData is not empty before using it
    if (userData.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <div className="bigChartBox" onMouseDown={handleMouseDownModal}>
            <UpdateModal
                open={openModal}
                onClose={handleCloseModal}
                userData={userData}
                title={'Update amount of incident'}
                handleChange={handleChange}
                handleClick={handleClick}
                openAlert={openAlert}
                setOpenAlert={setOpenAlert}
                scroll={true}
            />

            <div className="bigChartBox-row" ref={scrollspyRef}>
                <div className="bigChartBox-charts">
                    {months.map((month, index) => {
                        const monthlyUserData = userData.filter(
                            (user) => user.currentMonth === month
                        );

                        const monthlyData = Object.keys(incidentTotals).map((incident) => ({
                            weeks: incident,
                            ...Object.fromEntries(
                                monthlyUserData.map((user) => [user.userName, user[incident]])
                            ),
                        }));

                        const keys = Object.keys(monthlyData[0]).filter(
                            (key) => key !== 'weeks'
                        );

                        return (
                            <div className="charts-area" id={month} key={index}>
                                <h4 className="charts-title">{title} ({month})</h4>

                                <ResponsiveContainer
                                    className="charts-chart"
                                    width="99%"
                                    height="100%"
                                >
                                    <AreaChart
                                        data={monthlyData}
                                        margin={{
                                            top: 10,
                                            right: 30,
                                            left: 0,
                                            bottom: 0,
                                        }}
                                    >
                                        <XAxis dataKey="weeks" />
                                        <YAxis />
                                        <Tooltip />
                                        {keys.map((key, index) => (
                                            <Area
                                                key={key}
                                                dataKey={key}
                                                type="monotone"
                                                stackId="1"
                                                stroke={userColors[index % userColors.length]}
                                                fill={userColors[index % userColors.length]}
                                            />
                                        ))}
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        );
                    })}
                </div>

                <nav className='bigChartBox-menu'>
                    <ul className='bigChartBox-list'>
                        {months.map((month) => (
                            <ScrollspyItem
                                key={month}
                                id={month}
                                label={`(${month})`}
                                isActive={month === activeSection}
                            />
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};
