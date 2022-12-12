import { DataComponentProps } from './data-component-props';
import { DataComponentSize } from './data-component-size';

export function DataComponent({
    label,
    data,
    size = DataComponentSize.DEFAULT,
}: DataComponentProps) {
    function getTextSize() {
        switch (size) {
            case DataComponentSize.SMALL:
                return 'text-sm';
            case DataComponentSize.LARGE:
                return 'text-md';
            case DataComponentSize.DEFAULT:
            default:
                return 'text-lg';
        }
    }
    return (
        <div>
            <p className={getTextSize()}>{label}</p>
            <div className={`italic ${getTextSize()}`}>{data}</div>
        </div>
    );
}
