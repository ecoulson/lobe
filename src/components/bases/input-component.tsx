import { InputComponentProps } from './input-component-props';

export function InputComponent({ onChange, value, onBlur }: InputComponentProps) {
    return (
        <input value={value} onBlur={onBlur} onChange={(event) => onChange(event.target.value)} />
    );
}
