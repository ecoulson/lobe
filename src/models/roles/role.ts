import { Money } from '../funds/money';
import { Percentage } from '../statistics/percentage';

export class Role {
    public id: string;
    public budgetId: string;
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
    public totalCompensation: Money;
    public startYear: number;
    public endYear: number;
    public bonusTarget: Percentage;
    public companyLogo: string;

    constructor(props?: Partial<Role>) {
        const {
            companyLogo,
            bonusTarget,
            totalCompensation,
            equity,
            budgetId,
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
            startYear,
            endYear,
        } = {
            budgetId: '',
            bonusTarget: new Percentage(),
            totalCompensation: new Money(),
            signOnBonus: new Money(),
            id: '',
            level: '',
            estimatedYearsSpentInPosition: 1,
            startAge: 0,
            startYear: 0,
            endAge: 0,
            endYear: 0,
            company: '',
            companyLogo: 'default-company.png',
            state: '',
            maxMatched401KContributions: new Money(),
            matching401kPercentage: new Percentage(),
            equity: new Money(),
            vestingSchedule: [
                new Percentage({ value: 25 }),
                new Percentage({ value: 25 }),
                new Percentage({ value: 25 }),
                new Percentage({ value: 25 }),
            ],
            baseSalary: new Money(),
            ...props,
        };
        this.endYear = endYear;
        this.startYear = startYear;
        this.totalCompensation = totalCompensation;
        this.id = id;
        this.budgetId = budgetId;
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
        this.bonusTarget = bonusTarget;
        this.companyLogo = companyLogo;
    }
}
