import React from 'react';

import { COLOR_HIGHLIGHTED_TEXT } from '../constants';

interface HighlightedTextProps {
    text: string;
    highlight: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({ text, highlight }) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

    return (
        <span>
            {parts.map((part: string, index: number) => (
                <span
                    key={index}
                    style={
                        part.toLowerCase() === highlight.toLowerCase()
                            ? { color: COLOR_HIGHLIGHTED_TEXT }
                            : {}
                    }
                >
                    {part}
                </span>
            ))}
        </span>
    );
};

export default HighlightedText;
