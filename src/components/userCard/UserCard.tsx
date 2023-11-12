import { useState, useEffect } from 'react';
import moment from 'moment';

import './userCard.scss';

interface Employee {
  id: number;
  img: string;
  username: string;
  startWorkDate: string;
  position: string;
  timeOfTask: string;
  workDuration?: string;
}

export const UserCard = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    fetch('src/source/data/UserInfoData.json')
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.error('Error loading data:', error));
  }, []);

  const calculateWorkDuration = (startWorkDate: string): string => {
    const start = moment(startWorkDate);
    const today = moment();

    const duration = moment.duration(today.diff(start));

    const years = duration.years();
    const months = duration.months();
    const days = duration.days();

    if (years === 0) {
      return `${months} month ${days} days`;
    } else {
      return `${years} years ${months} month ${days} days`;
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setEmployees((employees: any) =>
        employees.map((user: any) => ({
          ...user,
          workDuration: calculateWorkDuration(user.startWorkDate),
        }))
      );
    }, 86400000); // 86400000 milisec in day

    return () => clearInterval(intervalId);
  }, [employees]);

  return (
    <>
      {employees.map(user => (
        <div className="box userInfo" key={user.id}>
          <div className="userInfo-title">
            <img className="icon" src={user.img} alt="icon" />
            <h2 className="name">{user.username}</h2>
          </div>

          <p className='userInfo-workData'>{calculateWorkDuration(user.startWorkDate)}</p>

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
