export class Role {
    public title: string;
    public level: string;
    public estimatedYearsSpentInPosition: number;
    public startAge: number;
    public endAge: number;
    public company: string;
    public state: string;

    constructor() {
        this.title = '';
        this.level = '';
        this.estimatedYearsSpentInPosition = 0;
        this.startAge = 0;
        this.endAge = 0;
        this.company = '';
        this.state = '';
    }
}
