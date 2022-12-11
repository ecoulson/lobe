export class YearlyWealthProjection {
    public estimatedNetWorth: number;
    public estimatedNetWorthAfterTaxes: number;
    public year: number;

    constructor(props?: Partial<YearlyWealthProjection>) {
        const { estimatedNetWorth, estimatedNetWorthAfterTaxes, year } = {
            estimatedNetWorth: 0,
            estimatedNetWorthAfterTaxes: 0,
            year: 0,
            ...props,
        };
        this.estimatedNetWorth = estimatedNetWorth;
        this.estimatedNetWorthAfterTaxes = estimatedNetWorthAfterTaxes;
        this.year = year;
    }
}
