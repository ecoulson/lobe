import { ButtonComponentProps } from './button-component-props';

export function ButtonComponent({ onClick, children }: ButtonComponentProps) {
    return (
        <button
            className="px-2 bg-gray-300 border-solid border-gray-400 border-2 box-border"
            onClick={onClick}
        >
            {children}
        </button>
    );
}
