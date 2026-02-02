import { useNavigate } from "react-router-dom"
import "./index.css"
import oneTasks from "./assets/tasks/oneTasks"
import twoThreeTasks from "./assets/tasks/twoThreeTasks"
import fourTasks from "./assets/tasks/fourTasks"
import fiveSixTasks from "./assets/tasks/fiveSixTasks.jsx"
import extraTasks from "./assets/tasks/extraTasks"
import diceOne from "./assets/pics/one.png"
import diceTwo from "./assets/pics/two.png"
import diceThree from "./assets/pics/three.png"
import diceFour from "./assets/pics/four.png"
import diceFive from "./assets/pics/five.png"
import diceSix from "./assets/pics/six.png"

export default function Rules() {
    const navigate = useNavigate()

    return (
        <div id="rules-container">
            <button id="back-to-main" onClick={() => navigate("/")}>НА ГЛАВНУЮ</button>
            <div id="rules-content">
                <div id="img-container">
                    <img src={diceOne} alt="" />
                </div>
                {oneTasks.map((task) => (
                    <div key={task.id}>
                        <h3>{task.taskName}</h3>
                        <p>{task.taskDescription}</p>
                    </div>
                ))}
                <div id="img-container">
                    <img src={diceTwo} alt="" />
                    <img src={diceThree} alt="" />
                </div>
                {twoThreeTasks.map((task) => (
                    <div key={task.id}>
                        <h3>{task.taskName}</h3>
                        <p>{task.taskDescription}</p>
                    </div>
                ))}
                <div id="img-container">
                    <img src={diceFour} alt="" />
                </div>
                {fourTasks.map((task) => (
                    <div key={task.id}>
                        <h3>{task.taskName}</h3>
                        <p>{task.taskDescription}</p>
                    </div>
                ))}
                <div id="img-container">
                    <img src={diceFive} alt="" />
                    <img src={diceSix} alt="" />
                </div>
                {fiveSixTasks.map((task) => (
                    <div key={task.id}>
                        <h3>{task.taskName}</h3>
                        <p>{task.taskDescription}</p>
                    </div>
                ))}
            </div>
        <button onClick={() => navigate("/admin")}>Admin</button>
        </div>
    )
}