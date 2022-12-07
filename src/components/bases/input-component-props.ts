export interface InputComponentProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    onBlur?: () => void;
    onFocus?: () => void;
}
