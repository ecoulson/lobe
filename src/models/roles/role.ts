import { Money } from '../funds/money';
import { Percentage } from '../statistics/percentage';

export class Role {
    public id: string;
    public level: string;
    public estimatedYearsSpentInPosition: number;
    public startAge: number;
    public endAge: number;
    public company: string;
    public state: string;
    public total401KContributions: Money;
    public matching401kPercentage: Percentage;
    public signOnBonus: Money;

    constructor(props?: Partial<Role>) {
        const {
            signOnBonus,
            id,
            level,
            estimatedYearsSpentInPosition,
            startAge,
            endAge,
            company,
            state,
            total401KContributions,
            matching401kPercentage,
        } = {
            signOnBonus: new Money(),
            id: '',
            level: '',
            estimatedYearsSpentInPosition: 1,
            startAge: 0,
            endAge: 0,
            company: '',
            state: '',
            total401KContributions: new Money(),
            matching401kPercentage: new Percentage(),
            ...props,
        };
        this.id = id;
        this.signOnBonus = signOnBonus;
        this.total401KContributions = total401KContributions;
        this.matching401kPercentage = matching401kPercentage;
        this.level = level;
        this.estimatedYearsSpentInPosition = estimatedYearsSpentInPosition;
        this.startAge = startAge;
        this.endAge = endAge;
        this.company = company;
        this.state = state;
    }
}
