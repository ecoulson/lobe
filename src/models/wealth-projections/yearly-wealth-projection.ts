export class TemporalWealthProjection {
    public estimatedNetWorth: number;
    public estimatedNetWorthAfterTaxes: number;
    public date: Date;

    constructor(props?: Partial<TemporalWealthProjection>) {
        const { estimatedNetWorth, estimatedNetWorthAfterTaxes, date } = {
            estimatedNetWorth: 0,
            estimatedNetWorthAfterTaxes: 0,
            date: new Date(),
            ...props,
        };
        this.estimatedNetWorth = estimatedNetWorth;
        this.estimatedNetWorthAfterTaxes = estimatedNetWorthAfterTaxes;
        this.date = date;
    }
}
