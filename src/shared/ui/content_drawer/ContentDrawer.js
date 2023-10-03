import React, {useState} from 'react'

import styles from './ContentDrawer.module.css'
export default function ContentDrawer({isExpand=false, onClose=f=>f, Body, isLeft=false, isRight=false}){

    return (
        <div className={`${styles.ContentDrawer} ${isExpand && styles['ContentDrawer--expanded']} ${isLeft && styles['ContentDrawer--left']}  ${isRight && styles['ContentDrawer--right']}`}>
            <div className={styles.ContentDrawer__close} onClick={onClose}>
                X
            </div>
            <div className={styles.ContentDrawer__body}>
                {Body}
            </div>
        </div>
    );
}
