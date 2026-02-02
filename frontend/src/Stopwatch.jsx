import {useState, useEffect, useRef} from "react";
import "./index.css"

function Stopwatch() {
    const [seconds, setSeconds] = useState(0);
    const [decimalSeconds, setDecimalSeconds] = useState(0);
    const [hundredths, setHundredths] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        if (isActive) {
            timerRef.current = setInterval(() => {
                setHundredths(prevHundredths => {
                    if (prevHundredths < 9) {
                        return prevHundredths + 1;
                    } else {
                        setDecimalSeconds(prevDecimalSeconds => {
                            if (prevDecimalSeconds < 9) {
                                return prevDecimalSeconds + 1;
                            } else {
                                setSeconds(prevSeconds => prevSeconds + 1);
                                return 0;
                            }
                        });
                        return 0;
                    }
                });
            }, 10);
        } else if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        // Cleanup function
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isActive]);

    const resetTime = () => {
        setSeconds(0);
        setDecimalSeconds(0);
        setHundredths(0);
    }

    const startTime = () => {
        setIsActive(true);
    }

    const stopTime = () => {
        setIsActive(false);
    }

    return (
        <div>
            <h1 className="swDigits">{seconds}:{decimalSeconds}{hundredths}</h1>
            <button className="swBtn" onClick={startTime} disabled={isActive}>СТАРТ</button>
            <button className="swBtn" onClick={stopTime} disabled={!isActive}>СТОП</button>
            <button className="swBtn" onClick={resetTime} disabled={isActive}>СБРОС</button>
        </div>
    );
}

export default Stopwatch