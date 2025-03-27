import './Home.css'
import { data } from './data'

export const Home = () => {
    return (
        <section className='home'>
            <h1>{data.title}</h1>
            <h2>{data.task}</h2>
            <p>{data.taskList}</p>
            <h2>{data.task1}</h2>
            <ul>
                {data.task1List.map((el, i) => {
                    return (
                        <li key={i}>{el}</li>
                    )
                })}
            </ul>
            <h2>{data.task2}</h2>
            <ul>
                {data.task2List.map((el, i) => {
                    return (
                        <li key={i}>{el}</li>
                    )
                })}
            </ul>
            <h2>{data.task3}</h2>
            <ul>
                {data.task3List.map((el, i) => {
                    return (
                        <li key={i}>{el}</li>
                    )
                })}
            </ul>
            <h2>{data.taskBonus}</h2>
            <ul>
                {data.taskBonusList.map((el, i) => {
                    return (
                        <li key={i}>{el}</li>
                    )
                })}
            </ul>
        </section>
    )
}