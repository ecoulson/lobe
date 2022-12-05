import { InputComponentProps } from './input-component-props';

export function InputComponent({ onChange, value }: InputComponentProps) {
    return <input value={value} onChange={(event) => onChange(event.target.value)} />;
}
