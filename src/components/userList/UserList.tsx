import { userInfoData } from '../../source/data/UserInfoData'

import './userList.scss';

export const UserList = () => {
    return (
        <div className="userMainInfo">
            <div className="userMainInfo-list">
                {userInfoData.map(user => (
                    <div className="userMainInfo-item" key={user.id}>
                        <p className="item-name">{user.username}
                            <span className='item-country'> <sup>{user.country}</sup></span>
                        </p>

                        <div className="item-color" style={{ backgroundColor: user.color }}></div>
                    </div>
                ))}
            </div>
        </div>
    )
}
