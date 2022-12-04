export class Role {
    constructor(
        public title: string,
        public level: string,
        public estimatedYearsSpentInPosition: number,
        public startAge: number,
        public endAge: number,
        public company: string,
        public state: string
    ) {}
}
