import { RoleProps } from './role-props';

export function RoleComponent({ role }: RoleProps) {
    return (
        <div>
            <h2>{role.company}</h2>
            <h2>
                {role.level} ({role.title})
            </h2>
            <p>
                From the age of {role.startAge} to {role.endAge}
            </p>
            <p>Planning for {role.estimatedYearsSpentInPosition} year(s) spent in position</p>
            <p>Working out of {role.state}</p>
        </div>
    );
}
