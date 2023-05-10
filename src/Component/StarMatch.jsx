import Star from "./Star";
import Utils from "./Utils";
import { useState, useRef, useEffect } from "react";
import React from "react";
import Win from "./Win";
import Lose from "./Lose";
export const StarMatch = () => {
    const utils = Utils();
    const arrayOfNumbers = utils.range(1, 9);
    const [numbers, setNumbers] = useState(arrayOfNumbers);
    const [numberOfStarts, setNumberOfStarts] = useState(utils.randomSumIn(numbers, 9));
    const [clickedNumber, setClickedNumber] = useState([]);
    const [temp, setTemp] = useState([]);
    const [isEnd, setIsEnd] = useState(false);


    const numbersReferences = useRef([]);

    const [stars, setStars] = useState(utils.range(1, numberOfStarts));
    const [end, setEnd] = useState(false);
    const restartTheGame = () => {
        console.log("inside the restart game !");
        setNumbers(arrayOfNumbers);
        setNumberOfStarts(utils.randomSumIn(numbers, 9));
        setClickedNumber([]);
        setTemp([]);
        setStars(utils.range(1, numberOfStarts));
        setIsEnd(false);
    }
    useEffect(() => {
        setIsEnd(false);
    }, [end]);
    useEffect(() => {
        console.log('numbers  : ', numbers);
        setNumberOfStarts(utils.randomSumIn(numbers, Math.max(...numbers)));
        if (numbers.length === 0) {
            console.log('you win');
        }
    }, [numbers]);

    useEffect(() => {
        console.log('number of stars : ', numberOfStarts);
        setStars(utils.range(1, numberOfStarts));
    }, [numberOfStarts]);

    useEffect(() => {
        console.log('clickedNumber has been changed : ', clickedNumber);
    }, [clickedNumber]);

    const setColorByValue = (color, value) => {
        numbersReferences.current[value].setAttribute('style', `background-color:${color}`);
    }
    useEffect(() => {
        const setColor = (color) => {
            temp.forEach((value) => numbersReferences.current[value].setAttribute('style', `background-color:${color}`));
        }

        // clearTimeout() 
        // setTimeout(() => {

        // }, 10000);

        // setInterval(code)
        // return an interval id

        const sum = utils.sum(temp);
        if (sum === numberOfStarts) {
            console.log('correct');
            setColor(utils.colors.used);
            setClickedNumber((nums) => [...nums, ...temp]);

            setNumbers((nums) => {
                return nums.filter((element) => temp.indexOf(element) === -1);
            });
            setTemp([]);
            //turn all the temp into green and add them to the clickedNumber
        }
        else if (sum > numberOfStarts) {
            console.log('the sum is greater than the number of stars');
            setColor(utils.colors.wrong);
        }
        //turn all the temp into red 
        else {
            console.log('the sum is smaller than the number of stars');
            setColor(utils.colors.candidate);
        }
        // if sum < value make all temp into blue 


    }, [temp]);

    // setTimeout(() => {
    //     setEnd();
    // }, 10);

    const click = (event) => {
        const value = parseInt(event.target.innerHTML);

        if (clickedNumber.indexOf(value) === -1) {
            const index = temp.indexOf(value);
            if (index === -1) {
                //add it to temp 
                setTemp((numbers) => [value, ...numbers]);

            } else {
                setTemp((numbe) => {
                    numbe.splice(index, 1);
                    setColorByValue(utils.colors.available, value);
                    return numbe;
                });
                //remove it from temp and change the color to grey
                // also verify the three cases of the sum 
            }

        } else {
            console.log('already clicked');
        }
        // console.log(numbersReferences.current[value]);
        // const arr = utils.range(1, 9);
        // arr.splice(7, 1);
        // arr.splice(6, 1);
        // console.log(arr);
        // console.log(utils.randomSumIn(arr, Math.max(...arr)));

        // event.target.setAttribute('style', `background-color:${utils.colors.wrong}`);
    }

    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
            </div>
            <div className="body">
                <div className="left">
                    {/* restartTheGame */}
                    {isEnd ? <Lose restart={restartTheGame} /> : (stars.length !== 0 ? stars.map((e) => {
                        return <Star key={e} />
                    }) : <Win restart={restartTheGame} />)}
                </div>
                <div className="right">
                    {arrayOfNumbers.map((v) => <button key={v} className="number" ref={el => numbersReferences.current[v] = el} onClick={(e) => click(e)}>{v}</button>)}
                </div>
            </div>
            <div className="timer">Time Remaining: 10</div>
        </div>
    );
};