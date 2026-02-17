interface SkeletonProps {
    className?: string;
    style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', style = {} }) => {
    const baseClasses = 'w-full h-[50px] bg-gray-200 rounded-xl animate-pulse';

    return (
        <div
            className={`${baseClasses} ${className}`}
            style={style}
        />
    );
};