import { useState } from 'react';
import { ReactComponent as InfoIcon } from '../../assets/info.svg';
import { InfoComponentProps } from './info-component-props';

export function InfoComponent({ popoverChild }: InfoComponentProps) {
    const [showingTooltip, setShowingTooltip] = useState(false);

    function handleMouseIn() {
        setShowingTooltip(true);
    }

    function handleMouseOut() {
        setShowingTooltip(false);
    }

    return (
        <div className="relative" onMouseEnter={handleMouseIn} onMouseLeave={handleMouseOut}>
            <InfoIcon width={25} height={25} />
            {showingTooltip ? (
                <div className="absolute text-sm bg-beige shadow-lg px-4 py-2">{popoverChild}</div>
            ) : null}
        </div>
    );
}
