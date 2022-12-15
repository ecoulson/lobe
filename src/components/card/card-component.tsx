import { CardComponentHeaderType } from './card-component-header-type';
import { CardComponentProps } from './card-component-props';

export function CardComponent({
    title,
    icon = null,
    children,
    headerType = CardComponentHeaderType.None,
}: CardComponentProps) {
    function getHeaderColor() {
        switch (headerType) {
            case CardComponentHeaderType.Expenses:
                return 'bg-card-expenses';
            case CardComponentHeaderType.Income:
                return 'bg-card-income';
            case CardComponentHeaderType.None:
            default:
                return 'bg-beige';
        }
    }

    function getHeaderBorder() {
        switch (headerType) {
            case CardComponentHeaderType.Expenses:
                return 'border-t-2 border-x-2 border-x-card-expenses border-t-card-expenses';
            case CardComponentHeaderType.Income:
                return 'border-t-2 border-x-2 border-x-card-income border-t-card-income';
            case CardComponentHeaderType.None:
            default:
                return 'border-t-2 border-x-2 border-x-gray border-t-gray';
        }
    }

    function getHeaderTextColor() {
        switch (headerType) {
            case CardComponentHeaderType.Expenses:
            case CardComponentHeaderType.Income:
                return 'text-white';
            case CardComponentHeaderType.None:
            default:
                return 'text-accent';
        }
    }

    return (
        <div className="h-full box-content bg-beige rounded-2xl flex flex-col">
            <div
                className={`${getHeaderBorder()} py-2 px-4 rounded-t-2xl flex justify-between ${getHeaderColor()}`}
            >
                <div className={`font-bold text-2xl ${getHeaderTextColor()}`}>{title}</div>
                <div>{icon}</div>
            </div>
            <div className="p-4 flex-1 rounded-b-2xl border-x-2 border-b-2 border-x-gray border-b-gray">
                {children}
            </div>
        </div>
    );
}
