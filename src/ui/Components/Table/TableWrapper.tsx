export const TableWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='overflow-x-scroll md:overflow-x-auto'>
            {children}
        </div>
    );
};
