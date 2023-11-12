import { useState, useEffect } from 'react';
import moment from 'moment';

import './userCard.scss';

interface Employee {
  id: number;
  img: string;
  username: string;
  startWorkDate: string;
  position: string;
  timeDayWork: object | any;
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

          <div className="box-row">
            <div className="userInfo-aboutWork">
              <p className='userInfo-workData'>{calculateWorkDuration(user.startWorkDate)}</p>
              <p className="userInfo-position">{user.position}</p>
            </div>

            <div className="userInfo-timeDayWork">
              {user.timeDayWork.map((time: number, index: number) => (
                <span key={index} className="timeDayWork-color">
                  {time}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))
      }
    </>
  )
}
