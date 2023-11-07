import { UserCard } from '../../components/userCard/UserCard'
import './home.scss'

const Home = () => {
    return (
        <div className='home'>
            <div className="box__top">
                <UserCard />
            </div>
            <div className="box__main"></div>
        </div>
    )
}

export default Home