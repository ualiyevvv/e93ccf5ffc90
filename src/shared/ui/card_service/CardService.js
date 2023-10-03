import React from 'react';

import styles from './cardService.module.css'

export default function CardService({children, onClick=f=>f, width, event}){

    const style = {
        width
    }

    return (
        <div className={styles['card-service']} onClick={onClick} style={style}>
            {/*<div className={styles["card-service__header"]}>*/}
            {/*</div>*/}
            {/*<div className={styles["card-service__body"]}>*/}

            {/*</div>*/}
            {/*<div className={styles["card-service__footer"]}>*/}

            {/*</div>*/}
            {children}
        </div>
    );
}

