import { CListGroup, CListGroupItem, CBadge } from '@coreui/react'

import { UserCard } from '../../components/userCard/UserCard'

import { userInfoData } from '../../source/data/UserInfoData'

import './home.scss'
import BigChartBox from '../../components/BigChartBox/BigChartBox'


const Home = () => {
    return (
        <div className='home'>
            <div className="box__top">
                <UserCard />
            </div>
            <div className="box__main">
                <div className="box box1">
                    {/* {userInfoData.map(user => (
                        <div className="userList" key={user.id}>
                            <p className="userList-name">{user.username}</p>
                        </div>
                    ))} */}

                    <CListGroup>
                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                            Cras justo odio
                            <CBadge color="primary" shape="rounded-pill">
                                14
                            </CBadge>
                        </CListGroupItem>
                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                            Dapibus ac facilisis in
                            <CBadge color="primary" shape="rounded-pill">
                                2
                            </CBadge>
                        </CListGroupItem>
                        <CListGroupItem className="d-flex justify-content-between align-items-center">
                            Morbi leo risus
                            <CBadge color="primary" shape="rounded-pill">
                                1
                            </CBadge>
                        </CListGroupItem>
                    </CListGroup>

                </div>
                <div className="box box2">
                  <BigChartBox />
                </div>
                <div className="box box3">3</div>
                <div className="box box4">4</div>
                <div className="box box5">5</div>
            </div>
        </div>
    )
}

export default Home