import { ArrayInputComponentProps } from './array-input-component-props';

export function ArrayInputComponent<T>({
    values,
    onChange,
    renderInput,
}: ArrayInputComponentProps<T>) {
    function handleInputChange() {}
    return <div className='flex'>{values.map((value, i) => renderInput(value, handleInputChange))}</div>;
}
