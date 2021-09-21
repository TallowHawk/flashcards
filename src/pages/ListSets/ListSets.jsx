import { useEffect, useMemo, useState } from 'preact/hooks'
import { get } from 'idb-keyval'
import globalStyles from '../../styles.css'
import styles from './listSetsStyle.css'
import { useLocation } from 'wouter-preact'
import ImportSet from './ImportSet'
import { cx } from '../../util/styles'

const ListSets = () => {
    const [showImportModal, setShowImportModal] = useState(false)
    const [sets, setSets] = useState([])
    const [, setLoc] = useLocation()

    useEffect(async () => {
        const sets = await get('sets')
        sets && typeof sets === 'object' && setSets(sets)
    }, [])

    const goToSet = (ids, starred = false) => {
        setLoc(`/practice/${ids.join(',')}` + (starred ? '/starred' : ''))
    }

    const selectedItems = useMemo(() => sets.reduce((acc, set, index) => {
        if (set.selected) {
            acc.push(index)
        }
        return acc
    }, []), [sets])

    const downloadSet = () => {
        const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(sets))}`
        const a = document.createElement('a')
        a.href = dataStr
        a.download = 'flashcard-sets.json'
        a.click()
    }

    return (
        <div class={styles.container}>
            {showImportModal && (
                <ImportSet
                    onExit={() => setShowImportModal(false)}
                    onUpload={(data) => {
                        setSets(data)
                        setShowImportModal(false)
                    }}
                />
            )}
            <div class={styles.options}>
                <input class={globalStyles.button} type="button" value="Download sets" onClick={downloadSet}/>
                <input class={globalStyles.button} type="button" value="Import sets" onClick={() => setShowImportModal(true)}/>
                <input class={globalStyles.button} type="button" value="Add Set" onClick={() => setLoc('/create')} />
                {selectedItems.length > 1 && <input class={cx(globalStyles.button, styles.specialButton)} type="button" value="Study Multiple" onClick={() => goToSet(selectedItems)}/>}
            </div>
            {sets.length === 0 && (
                <p>Nothing yet :)</p>
            )}
            {sets.map((set, index) => (
                <div
                    class={cx(styles.template, styles.selectable, set.selected ? styles.selected : '')}
                    key={`Set-${index}`}
                    onClick={() => {
                        setSets(prevState => {
                            prevState[index].selected = !prevState[index].selected
                            return [...prevState]
                        })
                    }}
                >
                    <h4>{set.name}</h4>
                    <div class={styles.templateButtons}>
                        <input class={globalStyles.button} type="button" value="Edit" onClick={() => setLoc(`/edit/${index}`)}/>
                        <input
                            className={globalStyles.button}
                            type="button"
                            value="Study"
                            onClick={() => goToSet([index])}
                        />
                        <input
                            class={globalStyles.button}
                            type="button"
                            value="Study Starred"
                            onClick={() => goToSet([index], true)}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListSets