import { useEffect, useState } from 'react';
import { RoleSelectorComponentProps } from './role-selector-component-props';
import { ReactComponent as ChevronLeft } from '../../assets/chevron-left.svg';
import { ReactComponent as ChevronRight } from '../../assets/chevron-right.svg';
import { DataComponent } from '../data/data-component';
import { MoneyComponent } from '../funds/money-component';
import { DataComponentSize } from '../data/data-component-size';

export function RoleSelectorComponent({ onRoleSelection, roles }: RoleSelectorComponentProps) {
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

    if (roles.length === 0) {
        return null;
    }

    return (
        <div className="col-span-full py-6 flex flex-col gap-y-2 justify-center items-center">
            <div className="flex justify-center gap-x-4 items-center">
                <div onClick={handlePrevious} className="hover:cursor-pointer">
                    <ChevronLeft />
                </div>
                <div className="px-2 py-2 border-2 border-gray bg-beige rounded-xl flex gap-x-6 items-center">
                    <div>
                        <img alt="Google Logo" src="company.png" />
                    </div>
                    <DataComponent
                        size={DataComponentSize.SMALL}
                        label={roles[selectedRoleIndex].company}
                        data={<p>{roles[selectedRoleIndex].level}</p>}
                    />
                    <DataComponent
                        size={DataComponentSize.SMALL}
                        label="Total Comp"
                        data={<MoneyComponent money={roles[selectedRoleIndex].totalCompensation} />}
                    />
                    <p className="text-sm">
                        {roles[selectedRoleIndex].startYear} - {roles[selectedRoleIndex].endYear}
                    </p>
                </div>
                <div onClick={handleNext} className="hover:cursor-pointer">
                    <ChevronRight />
                </div>
            </div>
            <p className="text-sm">
                Role {selectedRoleIndex + 1} of {roles.length}
            </p>
        </div>
    );
}
