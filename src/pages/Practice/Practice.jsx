import styles from './style.css'
import { useEffect, useMemo, useState } from 'preact/hooks'
import { get } from 'idb-keyval'
import { useLocation } from 'wouter-preact'
import FlashCards from './FlashCards'

const Practice = ({ ids, starred = false }) => {
    const [, setLoc] = useLocation()
    const [cards, cardsSet] = useState(null)
    useEffect(async () => {
        const sets = await get('sets')
        if (sets === null) {
            setLoc('/')
        } else {
            const combinedSet = ids.split(',').flatMap((id) => sets[id].cards)
            cardsSet(combinedSet)
        }
    }, [])

    const filteredCards = useMemo(() => {
        if(!cards) {
            return null
        }

        let filteredCards = cards
        if (starred) {
            filteredCards = cards.filter((card) => card.starred)
        }
        if (filteredCards.length === 0) {
            filteredCards = cards
        }
        return filteredCards
    }, [cards])

    return (
        <div class={styles.container}>
            {cards && <FlashCards cards={filteredCards} />}
        </div>
    )
}

export default Practice
