import { DataComponentProps } from './data-component-props';
import { DataComponentSize } from './data-component-size';

export function DataComponent({
    label,
    data,
    size = DataComponentSize.DEFAULT,
}: DataComponentProps) {
    function getLabelSize() {
        switch (size) {
            case DataComponentSize.SMALL:
                return 'text-sm';
            case DataComponentSize.LARGE:
                return 'text-2xl';
            case DataComponentSize.DEFAULT:
            default:
                return 'text-lg';
        }
    }

    function getDataSize() {
        switch (size) {
            case DataComponentSize.SMALL:
                return 'text-sm';
            case DataComponentSize.LARGE:
                return 'text-3xl';
            case DataComponentSize.DEFAULT:
            default:
                return 'text-lg';
        }
    }

    function getTextStyle() {
        switch (size) {
            case DataComponentSize.LARGE:
                return 'font-bold';
            default:
                return 'italic';
        }
    }

    return (
        <div>
            <div className={getLabelSize()}>{label}</div>
            <div className={`${getTextStyle()} ${getDataSize()}`}>{data}</div>
        </div>
    );
}
