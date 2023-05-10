import React from 'react'
import Utils from './Utils'

export default function Win(props) {
    const playAgain = () => {
        props.restart();
    }
    return (
        <div>

            <h2 style={{ color: Utils().colors.used }}>
                You Win
            </h2>
            <button onClick={() => playAgain()} style={{ color: Utils().colors.candidate }}>Play Again</button>
        </div>
    )
}
