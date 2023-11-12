import { UserCard } from '../../components/userCard/UserCard'
import { BigChartBox } from '../../components/BigChartBox/BigChartBox'
import { PieChartBox } from '../../components/pieChartBox/PieChartBox'
import { StackedBarChart } from '../../components/stackedBarChartBox/StackedBarChart'
import { UserList } from '../../components/userList/UserList'

import './home.scss'

const Home = () => {
    return (
        <div className='home'>
            <div className="box__top">
                <UserCard />
            </div>
            <div className="box__main">
                <div className="box box1">
                    <UserList />
                </div>
                <div className="box box2">
                    <BigChartBox title={'Amount of Incident'} />
                </div>
                <div className="box box3">3</div>
                <div className="box box4">
                    <StackedBarChart title={'Amount of Meeting'} />
                </div>
                <div className="box box5">
                    <PieChartBox title={'Amount of Mistake'} />
                </div>
            </div>
        </div>
    )
}

export default Home