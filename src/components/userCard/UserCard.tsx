import { useState } from 'react';

import { userInfoData } from '../../source/data/UserInfoData';

import './userCard.scss'

export const UserCard = () => {
    const [months, setMonths] = useState(0);
    const [years, setYears] = useState(0);


    return (
        <>
            {userInfoData.map(user => (
                <div className="box userInfo" key={user.id}>
                    <div className="userInfo-title">
                        <img className="icon" src={user.img} alt="icon" />
                        <h2 className="name">{user.username}</h2>
                    </div>

                    {years < 0 ?
                        <p className='userInfo-workData'> {months} mon</p> :
                        <p className='userInfo-workData'>  {years === 0 ? 'year' : 'years'} {months} mon</p>}

                    <div className="box-row">
                        <p className="userInfo-position">{user.position}</p>

                        <div className="userInfo-timeOfTask">
                            <span className="timeOfTask-color"
                                style={{ color: Number(user.timeOfTask) < 20 ? 'tomato' : 'limegreen' }}>
                                {user.timeOfTask}
                            </span>
                            <span className="timeOfTask-duration">this month</span>
                        </div>
                    </div>
                </div>
            ))
            }
        </>
    )
}
