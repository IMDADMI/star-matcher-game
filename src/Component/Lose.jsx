import React from 'react'
import Utils from './Utils'

export default function Lose(props) {
    const playAgain = () => {
        console.log(props);
        props.restart();
    }
    return (
        <div>

            <h2 style={{ color: Utils().colors.wrong }}>
                You Lose
            </h2>
            <button onClick={() => playAgain()} style={{ color: Utils().colors.candidate }}>Play Again</button>
        </div>
    )
}
