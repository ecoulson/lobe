export interface InputComponentProps {
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
}
