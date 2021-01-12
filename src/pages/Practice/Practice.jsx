import styles from './style.css'
import { useEffect, useMemo, useState } from 'preact/hooks'
import { get } from 'idb-keyval'
import { useLocation } from 'wouter-preact'
import FlashCards from './FlashCards'

const Practice = ({ id, starred = false }) => {
    const [, setLoc] = useLocation()
    const [set, setSet] = useState(null)
    useEffect(async () => {
        const sets = await get('sets')
        if (sets === null) {
            setLoc('/')
        } else {
            setSet(sets[id])
        }
    }, [])

    const filteredSet = useMemo(() => {
        if(!set) {
            return null
        }

        let filteredCards = set.cards
        if (starred) {
            filteredCards = set.cards.filter((card) => card.starred)
        }
        if (filteredCards.length === 0) {
            filteredCards = set.cards
        }
        set.cards = filteredCards
        return set
    }, [set])

    return (
        <div class={styles.container}>
            {set && <FlashCards set={filteredSet} />}
        </div>
    )
}

export default Practice
