import { UserCard } from '../../components/userCard/UserCard'
import './home.scss'

const Home = () => {
    return (
        <div className='home'>
            <div className="box__top">
                <UserCard />
            </div>
            <div className="box__main">
                <div className="box box1">1</div>
                <div className="box box2">2</div>
                <div className="box box3">3</div>
                <div className="box box4">4</div>
                <div className="box box5">5</div>
            </div>
        </div>
    )
}

export default Home