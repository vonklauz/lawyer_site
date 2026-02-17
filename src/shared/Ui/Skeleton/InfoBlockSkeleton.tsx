import { Skeleton } from '.';
import styles from '../InfoBlock/InfoBlock.module.css';

export const InfoBlockSkeleton = () => (
    <div className={styles.item}>
        <Skeleton className={styles.skeleton} />
    </div>
)