import { useActionState, useState } from 'react';
import styles from './Header.module.css';
import { Input } from '../Input';

export const SearchBar = () => {
    const [isRenderSearch, setRenderSearch] = useState(false);
    // const [error, submitSearch, isPending] = useActionState(
    //     async (previousState, formData: FormData) => {
    //         const error = formData.get("searchQuery");
    //         if (error) {
    //             return error;
    //         }
    //         console.log(formData)
    //         //   redirect("/path");
    //         return null;
    //     },
    //     null,
    // );

    const submitSearch = () => console.log('searching...')

    return (
        <>
            <div className={styles.headerSearch}>
                <button
                    className={`${styles.searchBtn} ${styles.iconSearch}`}
                    type="button"
                    onClick={() => setRenderSearch(!isRenderSearch)}
                />
            </div>
            <div className={`${styles.headerSearchWrapper} ${isRenderSearch ? styles.active : ''}`}>
                <form action={submitSearch}>
                    <Input name="searchQuery" label=''>
                        <button className={`${styles.searchBtn} link-action ${styles.iconSearch}`} type="submit" />
                    </Input>
                </form>
            </div>
        </>
    )
}