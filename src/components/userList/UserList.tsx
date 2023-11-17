import './userList.scss';

interface Employee {
    id: number;
    username: string;
    country: string;
    color: string;
}

export const UserList = ({ userInfoData }: { userInfoData: Employee[] }) => {
    return (
        <div className="userMainInfo">
            <div className="userMainInfo-list">
                {userInfoData.map((user: any) => (
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
