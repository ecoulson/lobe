import { GridComponentProps } from './grid-component-props';

export function GridComponent({ children, columns }: GridComponentProps) {
    return <div className={`grid grid-cols-${columns} gap-2`}>{children}</div>;
}
