import { useEffect, useState } from 'preact/hooks'
import closeIcon from '../../assets/images/close.svg'
import globalStyles from '../../styles.css'
import styles from './styles.css'
import { set, get, del } from 'idb-keyval'
import { useLocation } from 'wouter-preact'

const Create = ({ id }) => {
    const [, setLoc] = useLocation()
    const [cardSetName, setCardSetName] = useState('')
    const [cards, setCards] = useState([{
        term: '',
        definition: '',
    }])

    useEffect(async () => {
        let cards
        if (id) {
            const flashCardSet = (await get('sets'))[id]
            cards = flashCardSet.cards
            setCardSetName(flashCardSet.name)
        } else {
            cards = await get('temp')
        }
        console.log(cards)
        cards && setCards(cards)
    }, [])

    useEffect(async () => {
        if (!id) {
            await set('temp', cards)
        }
    }, [cards])

    const updateCard = (index, type, value) => {
        setCards((prevState) => {
            const newState = prevState.slice()
            newState[index][type] = value
            return newState
        })
    }

    const addCard = () => {
        setCards((prevState) => [
            ...prevState,
            {
                term: '',
                definition: '',
            }
        ])
    }

    const removeCard = (index) => {
        setCards(prevState => {
            prevState.splice(index, 1)
            return prevState.slice()
        })
    }

    const addSetToStorage = async () => {
        const sets = await get('sets') || []
        const flashCardSet = {
            name: cardSetName,
            cards: cards,
        }
        if (id) {
            sets[id] = flashCardSet
        } else {
            sets.push({
                name: cardSetName,
                cards: cards,
            })
        }
        await set('sets', sets)
        await del('temp')
        setLoc('/')
    }

    return (
        <div class={styles.container}>
            <h2 class={styles.pageTitle}>{id ? 'Edit Set' : 'Create Set'}</h2>
            <div class={styles.setName}>
                <h3>Set Name</h3>
                <input
                    type="text"
                    value={cardSetName}
                    placeholder="SetName"
                    onInput={(e) => setCardSetName(e.currentTarget.value)}
                    tabIndex={1}
                />
            </div>
            <div class={styles.cards}>
                {cards.map((card, index) => {
                    const tabIndex = (num) => (3 * (index + 1)) + num + 1
                    return (
                        <div class={styles.addCardTemplate}>
                            <label class={styles.label} htmlFor="term">Term</label>
                            <input
                                id="term"
                                type="text"
                                class={styles.term}
                                placeholder="Term"
                                value={card.term}
                                tabIndex={tabIndex(1)}
                                onInput={(e) => updateCard(index, 'term', e.currentTarget.value)}
                            />
                            <label class={styles.label} htmlFor="definition">Definition</label>
                            <textarea
                                id="definition"
                                placeholder="Definition"
                                class={styles.definition}
                                tabIndex={(tabIndex(2))}
                                onInput={(e) => updateCard(index, 'definition', e.currentTarget.value)}
                            >
                            {card.definition}
                        </textarea>
                            <div
                                class={styles.delete}
                                role="button"
                                aria-roledescription="Deletes current card"
                                tabIndex={tabIndex(3)}
                                onClick={() => removeCard(index)}
                            />
                        </div>
                    )
                })}
            </div>
            <div class={styles.actionContainer}>
                <input class={globalStyles.button} type="button" role="button" value="Add Card" onClick={addCard} />
                <input className={globalStyles.button} type="button" role="submit" value="Save" onClick={addSetToStorage}/>
            </div>
        </div>
    )
}

export default Create
