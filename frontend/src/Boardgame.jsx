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
import superThree from "./assets/pics/superthree.png"
import superFive from "./assets/pics/superfive.png"
import darkBeer from "./assets/pics/darkbeer.png"
import lightBeer from "./assets/pics/lightbeer.png"
import book1 from "./assets/pics/book.png"
import book2 from "./assets/pics/book-borderless.png"
import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import Stopwatch from "./Stopwatch"

export default function Boardgame() {
    const [diceImage, setDiceImage] = useState(diceOne)
    const [taskData, setTaskData] = useState({name: "", description: "", showStopwatch: false})
    const [isDarkTheme, setIsDarkTheme] = useState(false)
    const [players, setPlayers] = useState([])
    const navigate = useNavigate()

    const API_URL = process.env.NODE_ENV === "production" 
        ? "https://boardgame-final.onrender.com"
        : "http://localhost:3001";

    useEffect(() => {
        fetchPlayers();
    }, []);

    const fetchPlayers = async () => {
        try {
            
            const response = await axios.get(`${API_URL}/api/players`);
            setPlayers(response.data);
        } catch (error) {
            console.error(error);
        } 
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("preferredTheme")
        if (savedTheme) {
            setIsDarkTheme(savedTheme === "dark")
            document.body.classList.toggle("dark-theme", savedTheme === "dark")
        }
    }, [])

    function toggleTheme() {
        const newTheme = !isDarkTheme
        setIsDarkTheme(newTheme)
        document.body.classList.toggle("dark-theme", newTheme)
        localStorage.setItem("preferredTheme", newTheme ? "dark" : "light")
    }

    function goToRules() {
        navigate("/rules")
    }
    
    function rollDice() {
        fetchPlayers()
        const dice = Math.floor(Math.random() * 19) + 1;

        let newDiceImage;
        let taskArray;

        if (dice > 0 && dice < 4) {
            newDiceImage = diceOne;
            taskArray = oneTasks;
        } else if (dice > 3 && dice < 7) {
            newDiceImage = diceTwo;
            taskArray = twoThreeTasks;
        } else if (dice > 6 && dice < 10) {
            newDiceImage = diceThree;
            taskArray = twoThreeTasks;
        } else if (dice > 9 && dice < 13) {
            newDiceImage = diceFour;
            taskArray = fourTasks;
        } else if (dice > 12 && dice < 16) {
            newDiceImage = diceFive;
            taskArray = fiveSixTasks;
        } else if (dice > 15 && dice < 19) {
            newDiceImage = diceSix;
            taskArray = fiveSixTasks;
        } else if (dice === 19) {
            const randomTask = extraTasks[Math.floor(Math.random() * extraTasks.length)];
            if(randomTask.taskName === "Казино рояль") {
                newDiceImage = superThree;
            } else {
                newDiceImage = superFive;
            }
            taskArray = [randomTask];
        }

        setDiceImage(newDiceImage)

        if (taskArray) {
            const randomTask = taskArray[Math.floor(Math.random() * taskArray.length)];
            setTimeout(() => {
                setTaskData({name: randomTask.taskName, description: randomTask.taskDescription, showStopwatch: randomTask.stopwatch || false})
            }, 500)
        }
    }

    return (
        <>
        <div id="boardgame-container">
            <div id="buttons-container">
                <button id="dark-light-theme" onClick={toggleTheme}><img src={isDarkTheme ? lightBeer : darkBeer}/></button>
                <button id="rolldice" onClick={() => rollDice()}>БРОСИТЬ КУБИК</button>
                <button id="rules" onClick={goToRules}><img src={book1}/></button>
            </div>
            <div id="players-container">
                {players.map((player) => (
                    <p>{player.player}: {player.points}; </p>
                ))}
            </div>
            <div id="dice-container">
                <img src={diceImage}/>
            </div>
            <div id="task-name">{taskData.name}</div>
            <div id="task-description">{taskData.description}</div>
            {taskData.showStopwatch && <Stopwatch />}
        </div>
        </>
    )

}


