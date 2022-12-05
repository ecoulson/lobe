import { ButtonComponentProps } from './button-component-props';

export function ButtonComponent({ onClick, children }: ButtonComponentProps) {
    return <button onClick={onClick}>{children}</button>;
}
