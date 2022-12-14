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
            className="bg-transparent border-b-gray hover:border-b-accent focus:border-b-accent outline-none border-b-2 rounded-none w-full"
            value={value}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={placeholder}
            onChange={(event) => onChange(event.target.value)}
        />
    );
}
