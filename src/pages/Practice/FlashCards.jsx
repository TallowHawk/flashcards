import { useEffect, useMemo, useState } from 'preact/hooks'
import style from './style.css'

// Fisher - Yates shuffle https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
    let currentIndex = array.length

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        let temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const FlashCards = ({ set }) => {
    const [currentCard, setCurrentCard] = useState(0)
    const [showingTerm, setShowingTerm] = useState(true)
    const cards = useMemo(() => shuffle(set.cards), [set])

    useEffect(() => {
        const keyDown = (e) => {
            switch (e.key) {
                case 'ArrowRight': {
                    stepCards(1)
                    break;
                }
                case 'ArrowLeft': {
                    stepCards(-1)
                    break;
                }
                case 'ArrowDown':
                case 'ArrowUp':
                case ' ': {
                    setShowingTerm(prevState => !prevState)
                    break;
                }
            }
        }

        document.addEventListener('keydown', keyDown)
        return () => {
            document.removeEventListener('keydown', keyDown)
        }
    }, [setShowingTerm])

    const stepCards = (amount) => {
        setShowingTerm(true)
        setCurrentCard(prevCurrentCard => {
            const newState = prevCurrentCard + amount
            return newState < 0 ? 0 :
                newState === set.cards.length ? set.cards.length - 1 :
                newState
        })
    }

    const card = cards[currentCard]

    return (
        <div class={style.flexColumn}>
            <div class={style.display}>
                {showingTerm ? (
                    <h3>{card.term}</h3>
                ) : (
                    <p>{card.definition}</p>
                )}
            </div>
            <div class={style.controls}>
                <button onClick={() => stepCards(-1)}>Backward</button>
                <button onClick={() => setShowingTerm(prev => !prev)}>Flip</button>
                <button onClick={() => stepCards(1)}>Forward</button>
            </div>
        </div>
    )
}

export default FlashCards