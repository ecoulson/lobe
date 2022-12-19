import { BudgetDashboardNavigationLinkComponentProps } from './budget-dashboard-navigation-link-component-props';

export function BudgetDashboardNavigationLinkComponent({
    active,
    text,
    setActive,
}: BudgetDashboardNavigationLinkComponentProps) {
    if (active) {
        return (
            <div
                className="px-2 py-1 flex items-center bg-accent text-beige hover:cursor-pointer rounded-xl"
                onClick={() => setActive(text)}
            >
                <p className="text-xl">{text}</p>
            </div>
        );
    }

    return (
        <div
            className="px-2 py-1 flex items-center text-accent hover:cursor-pointer rounded-xl hover:bg-accent hover:text-beige"
            onClick={() => setActive(text)}
        >
            <p onClick={() => setActive(text)} className="text-xl ">
                {text}
            </p>
        </div>
    );
}
