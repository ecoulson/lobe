import { RoleProps } from './role-props';

export class Role {
    public id: string;
    public level: string;
    public estimatedYearsSpentInPosition: number;
    public startAge: number;
    public endAge: number;
    public company: string;
    public state: string;

    constructor(props?: Partial<RoleProps>) {
        const { id, level, estimatedYearsSpentInPosition, startAge, endAge, company, state } = {
            id: '',
            level: '',
            estimatedYearsSpentInPosition: 0,
            startAge: 0,
            endAge: 0,
            company: '',
            state: '',
            ...props,
        };
        this.id = id;
        this.level = level;
        this.estimatedYearsSpentInPosition = estimatedYearsSpentInPosition;
        this.startAge = startAge;
        this.endAge = endAge;
        this.company = company;
        this.state = state;
    }
}
