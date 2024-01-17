import React from 'react';
import { View } from 'react-native';

// interface DividerProps {
//     width?: number;
//     orientation?: 'horizontal' | 'vertical';
//     color?: string;
//     dividerStyle?: any;
// }

const Divider = ({
    width = 1,
    orientation = 'horizontal',
    color = '#DFE4EA',
    dividerStyle,
}) => {
    const mergedStyles = {
        width: orientation === 'horizontal' ? '100%' : width,
        height: orientation === 'vertical' ? '100%' : width,
        backgroundColor: color,
        ...dividerStyle,
    };

    return <View style={mergedStyles} />;
};

export default Divider;
