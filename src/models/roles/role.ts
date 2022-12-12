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
    public maxMatched401KContributions: Money;
    public matching401kPercentage: Percentage;
    public signOnBonus: Money;
    public equity: Money;
    public vestingSchedule: Percentage[];
    public baseSalary: Money;

    constructor(props?: Partial<Role>) {
        const {
            equity,
            baseSalary,
            vestingSchedule,
            signOnBonus,
            id,
            level,
            estimatedYearsSpentInPosition,
            startAge,
            endAge,
            company,
            state,
            maxMatched401KContributions,
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
            maxMatched401KContributions: new Money(),
            matching401kPercentage: new Percentage(),
            equity: new Money(),
            vestingSchedule: [],
            baseSalary: new Money(),
            ...props,
        };
        this.id = id;
        this.baseSalary = baseSalary;
        this.equity = equity;
        this.vestingSchedule = vestingSchedule;
        this.signOnBonus = signOnBonus;
        this.maxMatched401KContributions = maxMatched401KContributions;
        this.matching401kPercentage = matching401kPercentage;
        this.level = level;
        this.estimatedYearsSpentInPosition = estimatedYearsSpentInPosition;
        this.startAge = startAge;
        this.endAge = endAge;
        this.company = company;
        this.state = state;
    }
}
