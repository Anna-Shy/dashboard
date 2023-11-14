import './userProjectList.scss';

interface Employee {
    id: number;
    username: string;
    projectTitle: string;
    statusProject: string;
}

export const UserProjectList = ({ userInfoData }: { userInfoData: Employee[] }) => {
    return (
        <div className="userProject">
            <div className="userProject-list">
                {userInfoData.map((user: any) => (
                    <div className="userProject-item" key={user.id}>
                        <p className="item-name">{user.username.substring(0, user.username.indexOf(' '))}</p>
                        <p className="item-project">{user.projectTitle}</p>
                        <p className="item-status" >{user.statusProject}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
