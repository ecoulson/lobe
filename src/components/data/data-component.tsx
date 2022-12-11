import { DataComponentProps } from './data-component-props';

export function DataComponent({ label, data }: DataComponentProps) {
    return (
        <div>
            <p className="text-sm">{label}</p>
            <div className="italic text-sm">{data}</div>
        </div>
    );
}
