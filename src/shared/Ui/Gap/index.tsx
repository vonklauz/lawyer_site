import styles from './Gap.module.css';

type GapProps = {
    size: 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32;
};

export const Gap = ({ size }: GapProps) => {
    return <div className={styles[`gap-${size}`]} />;
};
