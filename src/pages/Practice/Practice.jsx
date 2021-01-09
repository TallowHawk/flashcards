import styles from './style.css'
import { useEffect, useState } from 'preact/hooks'
import { get } from 'idb-keyval'
import { useLocation } from 'wouter-preact'
import FlashCards from './FlashCards'

const Practice = ({ id }) => {
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

    return (
        <div class={styles.container}>
            {set && <FlashCards set={set} />}
        </div>
    )
}

export default Practice
