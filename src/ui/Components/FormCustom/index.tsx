import type { FormAction } from '~/Models'
import { FormItem, type IFormItemProps } from './FormItem'
import { FormWrapper } from './FormWrapper'

interface IFormProps extends IFormItemProps {
    action: FormAction;
}

export const FormCustom = (props: IFormProps) => {
    return (
        <FormWrapper {...props}>
            <FormItem {...props}>
                {props.children}
            </FormItem>
        </FormWrapper>
    )
}