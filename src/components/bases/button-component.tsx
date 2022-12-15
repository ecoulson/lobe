import { ButtonComponentProps } from './button-component-props';

export function ButtonComponent({ onClick, children }: ButtonComponentProps) {
    return (
        <button
            className="px-5 bg-transparent border-solid text-md border-accent border-2 box-border hover:text-beige hover:bg-accent rounded-lg text-md py-2"
            onClick={onClick}
        >
            {children}
        </button>
    );
}
