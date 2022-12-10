import { GridComponentProps } from './grid-component-props';

export function GridComponent({ children, columns }: GridComponentProps) {
    return <div className={`grid grid-cols-${columns} gap-x-4 gap-y-4`}>{children}</div>;
}
