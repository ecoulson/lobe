import { InputComponentProps } from './input-component-props';

export function InputComponent({
    onChange,
    value,
    onBlur,
    onFocus,
    placeholder,
}: InputComponentProps) {
    return (
        <input
            value={value}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={placeholder}
            onChange={(event) => onChange(event.target.value)}
        />
    );
}
