import { InputComponentProps } from './input-component-props';

export function InputComponent({ onChange, value, onBlur, onFocus }: InputComponentProps) {
    return (
        <input
            value={value}
            onBlur={onBlur}
            onFocus={onFocus}
            onChange={(event) => onChange(event.target.value)}
        />
    );
}
