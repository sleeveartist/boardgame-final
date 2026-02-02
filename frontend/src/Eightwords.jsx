import eightwords from "./assets/tasks/eightwords";
import { useState, useEffect } from "react";
import "./index.css"
import { useNavigate, Link } from "react-router-dom"

function Eightwords() {
    const [wordsArray, setWordsArray] = useState([])
    const [isActive, setIsActive] = useState(false)
    const [count, setCount] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        const getRandomWords = () => {
            const shuffled = [...eightwords].sort(() => Math.random() - 0.5)
            return shuffled.slice(0, 10)
        }
        setWordsArray(getRandomWords())
        
    }, [])

    function startGame() {
        if(!isActive) {
            setIsActive(true)
            const wordcontainer = document.querySelector(".wordContainer")
            wordcontainer.innerHTML = wordsArray[count]
            console.log(wordsArray)
            console.log(count)
            setCount(prevCount => prevCount + 1)
        }
    }

    function nextWord() {
        if(count < 10 && isActive) {
            setCount(prevCount => prevCount + 1)
            const wordcontainer = document.querySelector(".wordContainer")
            wordcontainer.innerHTML = wordsArray[count]
            console.log(count)
        }
        if(count == 9) {
            setIsActive(false)
            console.log(count)
        }
    }

    return (
        <div>
            <button id="back-to-main" onClick={() => navigate("/")}>НА ГЛАВНУЮ</button>
            <h1 className="wordContainer">По готовности жми НАЧАТЬ</h1>
            <div className="ewBtnContainer">
                <button className="ewBtn" onClick={startGame}>НАЧАТЬ</button>
                <button className="ewBtn" onClick={nextWord}>ДАЛЬШЕ</button>
            </div>
        </div>
    )
}

export default Eightwords