import { Savings } from '../../models/savings/savings';

export interface SavingsRowComponentProps {
    savingsList: Savings[];
    updateSavings: (savings: Savings) => void;
}
