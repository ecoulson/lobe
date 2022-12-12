import { CardComponent } from '../card/card-component';
import { CardComponentHeaderType } from '../card/card-component-header-type';
import { IncomeCardComponentProps } from './income-card-component-props';
import { ReactComponent as IncomeIcon } from '../../assets/income.svg';
import { DataComponent } from '../data/data-component';
import { DataComponentSize } from '../data/data-component-size';
import { MoneyComponent } from '../funds/money-component';

export function IncomeCardComponent({ income }: IncomeCardComponentProps) {
    return (
        <CardComponent
            headerType={CardComponentHeaderType.Income}
            title="Income"
            icon={<IncomeIcon width={32} height={32} fill="white" />}
        >
            <div className="flex gap-16 items-center">
                <div className="flex flex-col gap-y-4">
                    <DataComponent
                        label="Total Income"
                        size={DataComponentSize.LARGE}
                        data={
                            <p className="text-card-income">
                                <MoneyComponent money={income.totalIncome} />
                            </p>
                        }
                    />
                </div>
                <div className="flex flex-col gap-y-4">
                    <DataComponent
                        label="Base Salary"
                        data={<MoneyComponent money={income.baseSalary} />}
                    />
                    <DataComponent
                        label="Take Home Salary"
                        data={<MoneyComponent money={income.salaryPostTax} />}
                    />
                    <DataComponent label="Bonus" data={<MoneyComponent money={income.bonus} />} />
                </div>
            </div>
        </CardComponent>
    );
}
