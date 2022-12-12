import { ReactNode } from 'react';
import { CardComponentHeaderType } from './card-component-header-type';

export interface CardComponentProps {
    title: ReactNode;
    children: ReactNode;
    icon?: ReactNode;
    headerType?: CardComponentHeaderType;
}
