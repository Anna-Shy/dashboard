import { userColors } from '../../source/data/MainData';

import './userList.scss';

interface User {
    id: number;
    userName: string;
    country: string;
    color: string;
}

export const UserList = ({ userInfoData }: { userInfoData: User[] }) => {
    return (
        <div className="userMainInfo">
            <div className="userMainInfo-list">
                {userInfoData.map((user: any, key) => (
                    <div className="userMainInfo-item" key={user.id}>
                        <p className="item-name">{user.userName}
                            <span className='item-country'> <sup>{user.country}</sup></span>
                        </p>

                        <div className="item-color" style={{ backgroundColor: userColors[key % userColors.length] }}></div>
                    </div>
                ))}
            </div>
        </div>
    )
}
