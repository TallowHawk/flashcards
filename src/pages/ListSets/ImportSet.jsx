import { set } from 'idb-keyval'
import styles from './importSetStyles.css'

const ImportSet = ({ onUpload, onExit }) => {
    const importFile = async (e) => {
        const file = e.currentTarget.files[0]
        if (file) {
            const data = await new Response(file).json()
            await set('sets', data)
            onUpload(data)
        }
    }

    return (
        <div onClick={() => onExit() } class={styles.container}>
            <div class={styles.modal} onClick={(e) => e.stopPropagation() }>
                <input type="file" onChange={importFile} />
            </div>
        </div>
    )
}

export default ImportSet
