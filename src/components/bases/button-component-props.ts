import { ReactNode } from 'react';

export interface ButtonComponentProps {
    onClick: () => void;
    children: ReactNode;
}
