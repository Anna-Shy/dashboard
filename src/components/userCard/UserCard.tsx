import { useState, useEffect } from 'react';
import moment from 'moment';

import './userCard.scss';

interface Employee {
  id: number;
  image: string;
  userName: string;
  startWorkDate: string;
  position: string;
  timeDayWork: object | any;
  workDuration?: string;
  goToOffice: number;
}

const TWENTY_TWO = 22;

export const UserCard = ({ userInfoData }: { userInfoData: Employee[] }) => {
  const [userData, setUserData] = useState<Employee[]>(userInfoData);

  useEffect(() => {
    setUserData(userInfoData);
  });

  const calculateWorkDuration = (startWorkDate: string): string => {
    const start = moment(startWorkDate);
    const today = moment();

    const years = today.diff(start, 'years');
    const months = today.diff(start, 'months') % 12;
    const days = today.diff(start, 'days') % 30;

    if (years === 0) {
      return `${months} month ${days} days`;
    } else {
      return `${years} years ${months} month ${days} days`;
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setUserData((employees) =>
        employees.map((user) => ({
          ...user,
          workDuration: calculateWorkDuration(user.startWorkDate),
        }))
      );
    }, 86400000); // 86400000 ms in a day

    return () => clearInterval(intervalId);
  }, [userInfoData]);

  const getStatusColor = (goToOffice: number): string => {
    const defaultColor = "#757D8B";

    if (goToOffice >= 15) {
      return "limegreen" || defaultColor;
    } else if (goToOffice < 15 && goToOffice >= 10) {
      return "orange" || defaultColor;
    } else if (goToOffice < 10 && goToOffice >= 5) {
      return "yellow" || defaultColor;
    } else {
      return "tomato" || defaultColor;
    }
  };

  return (
    <>
      {userData.map((user, key) => (
        <div className="box userInfo" key={key}>
          <div className="userInfo-title">
            <img className="icon" src={user.image} alt="icon" />
            <h2 className="name">{user.userName}</h2>
          </div>

          <div className="box-row">
            <div className="userInfo-aboutWork">
              <p className='userInfo-workData'>{calculateWorkDuration(user.startWorkDate)}</p>
              <p className="userInfo-position">{user.position}</p>
            </div>

            <div className="userInfo-goToOffice">
              <span className='goToOffice-span' style={{
                color: getStatusColor(user.goToOffice),
              }}>
                {(user.goToOffice >= 0) ? user.goToOffice : 0}
              </span> / <span className='goToOffice-span-normal'>{TWENTY_TWO}</span>
            </div>
          </div>
        </div>
      )
      )
      }
    </>
  )
}
