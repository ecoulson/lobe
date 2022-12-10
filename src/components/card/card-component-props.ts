import { ReactNode } from 'react';
import { CardComponentHeaderType } from './card-component-header-type';

export interface CardComponentProps {
    title: string;
    icon: ReactNode;
    headerType?: CardComponentHeaderType;
    children: ReactNode;
}
