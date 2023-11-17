import { useState, useEffect } from 'react'

import { UserCard } from '../../components/userCard/UserCard'
import { BigChartBox } from '../../components/BigChartBox/BigChartBox'
import { PieChartBox } from '../../components/pieChartBox/PieChartBox'
import { StackedBarChart } from '../../components/stackedBarChartBox/StackedBarChart'
import { UserList } from '../../components/userList/UserList'
import { UserProjectList } from '../../components/userProjectList/UserProjectList'

import { bigChartYearData, bigChartMonthData } from '../../source/data/BigChartData';
import { starkedBarChart } from "../../source/data/StackedBarChart";

import './home.scss'

const Home = () => {
    const [userInfoData, setUserInfoData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/userinfo')
            .then(response => response.json())
            .then(data => setUserInfoData(data))
            .catch(error => console.error('Error loading data:', error));
    }, []);

    return (
        <div className='home'>
            <div className="box__top">
                <UserCard userInfoData={userInfoData} />
            </div>
            <div className="box__main">
                <div className="box box1">
                    <UserList userInfoData={userInfoData} />
                </div>
                <div className="box box2">
                    <BigChartBox title={'Amount of Incident'} bigChartMonthData={bigChartMonthData} bigChartYearData={bigChartYearData} />
                </div>
                <div className="box box3">
                    <UserProjectList userInfoData={userInfoData} />
                </div>
                <div className="box box4">
                    <StackedBarChart title={'Amount of Meeting'} starkedBarChartData={starkedBarChart} />
                </div>
                <div className="box box5">
                    <PieChartBox title={'Amount of Mistake'} />
                </div>
            </div>
        </div>
    )
}

export default Home