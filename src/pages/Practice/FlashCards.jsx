import { useEffect, useState } from 'preact/hooks'
import style from './style.css'

const FlashCards = ({ set }) => {
    const [currentCard, setCurrentCard] = useState(0)
    const [showingTerm, setShowingTerm] = useState(true)

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
    })

    const stepCards = (amount) => {
        setShowingTerm(true)
        setCurrentCard(prevCurrentCard => {
            const newState = prevCurrentCard + amount
            return newState < 0 ? 0 :
                newState === set.cards.length ? set.cards.length - 1 :
                newState
        })
    }

    const card = set.cards[currentCard]

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