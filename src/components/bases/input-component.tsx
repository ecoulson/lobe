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
            className="bg-transparent border-b-accent border-b-2"
            value={value}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={placeholder}
            onChange={(event) => onChange(event.target.value)}
        />
    );
}
