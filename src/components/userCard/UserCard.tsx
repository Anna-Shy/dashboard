import { useState, useEffect } from 'react';
import moment from 'moment';

import { userinfoData } from '../../source/data/userinfo';

import './userCard.scss';

interface Employee {
  id: number;
  image: string;
  userName: string;
  startWorkDate: string;
  position: string;
  timeDayWork: object | any;
  workDuration?: string;
  shift: number;
}

const TWENTY_TWO = 22;

export const UserCard = () => {
  // const [userData, setUserData] = useState<Employee[]>();
  const [userData, setUserData] = useState<Employee[]>([]);

  // useEffect(() => {
  //   setUserData(userInfoData);
  // });

  useEffect(() => {
    const userInfo = userinfoData.map(item => ({
      id: Number(item.id),
      image: item.image,
      userName: item.userName,
      position: item.position,
      startWorkDate: item.startWorkDate,
      timeDayWork: Object(item.timeDayWork),
      shift: Number(item.shift),
    }));

    setUserData(userInfo);
  }, []);

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
  }, [userData]);

  const getStatusColor = (shift: number): string => {
    const defaultColor = "#757D8B";

    if (shift >= 15) {
      return "limegreen" || defaultColor;
    } else if (shift < 15 && shift >= 10) {
      return "orange" || defaultColor;
    } else if (shift < 10 && shift >= 5) {
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
                color: getStatusColor(user.shift),
              }}>
                {(user.shift >= 0) ? user.shift : 0}
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
