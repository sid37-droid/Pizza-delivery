import styles from "./style.module.scss"

function NotFoundBlock() {
    return ( 
        <div className={styles.root}>
            <h1 >
                <span>😕</span>
                <br/>
                Ничего не найдено
            </h1>
            <p className={styles.description}>
                К сожалению данная страница отсутсвует
            </p>
        </div>
     );
}

export default NotFoundBlock;