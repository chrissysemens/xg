import React from 'react';
import styles from './banner.module.scss';
import xg from "../../../public/assets/xg.png";
import Image from 'next/image'

const Banner = () => {
    return (
        <div className={styles.banner}>
            <div className={styles.logo}>
            <Image
                priority
                src={xg}
                alt="xg Logo"
                className={styles.spin}
                width={150}
    />
            </div>
            <div className={styles.nav}>

            </div>
            <div className={styles.profile}>

            </div>
        </div>
    )
}

export { Banner }