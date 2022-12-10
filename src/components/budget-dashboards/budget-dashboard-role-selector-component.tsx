import { useEffect, useState } from 'react';
import { BudgetDashboardRoleSelectorComponentProps } from './budget-dashboard-role-selector-component-props';
import { ReactComponent as ChevronLeft } from '../../assets/chevron-left.svg';
import { ReactComponent as ChevronRight } from '../../assets/chevron-right.svg';

export function BudgetDashboardRoleSelectorComponent({
    onRoleSelection,
    roles,
}: BudgetDashboardRoleSelectorComponentProps) {
    const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);

    useEffect(() => {
        onRoleSelection(roles[selectedRoleIndex]);
    }, [selectedRoleIndex, roles, onRoleSelection]);

    function handlePrevious() {
        if (selectedRoleIndex - 1 >= 0) {
            setSelectedRoleIndex(selectedRoleIndex - 1);
        }
    }

    function handleNext() {
        if (selectedRoleIndex + 1 < roles.length) {
            setSelectedRoleIndex(selectedRoleIndex + 1);
        }
    }

    return (
        <div className="col-span-3 py-6 flex flex-col gap-y-2 justify-center items-center">
            <div className="flex justify-center gap-x-4 items-center">
                <div onClick={handlePrevious} className="hover:cursor-pointer">
                    <ChevronLeft />
                </div>
                <div className="px-2 py-2 border-2 border-gray bg-beige rounded-xl flex gap-x-6 items-center">
                    <div>Icon</div>
                    <div>Company</div>
                    <div>TC</div>
                    <div>Years Worked</div>
                </div>
                <div onClick={handleNext} className="hover:cursor-pointer">
                    <ChevronRight />
                </div>
            </div>
            <p>
                Role {selectedRoleIndex + 1} of {roles.length}
            </p>
        </div>
    );
}
