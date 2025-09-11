import { Skeleton } from ".";
import formStyles from '../FormCustom/Form.module.css'

export const FormSkeleton = () => (
    <div className={formStyles.bankruptcyForm}>
        <Skeleton className={`${formStyles.form} h-screen`} style={{borderRadius: '1.25rem'}}/>
    </div>
)