import { View, Text } from 'react-native'
import React from 'react'
import { Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Make sure you have this icon set installed

export const TonalChip = ({ backgroundColor = 'rgb(245,249,255)', textColor = '#0061FF', children, style = {}, ...props }: any) => {
    return (
        <Chip mode="flat" style={{ backgroundColor: backgroundColor, borderRadius: 25, padding: 5, ...style }} {...props}>
            <Text className='font-rubik-bold' style={{ color: textColor }}>{children}</Text>
        </Chip>
    )
}

export const TonalIconChip = ({ backgroundColor = 'rgb(245,249,255)', iconColor = '#0061FF', iconName, size = 40, ...props }: any) => {
    return (
        <View
            style={{
                backgroundColor: backgroundColor,
                borderRadius: size / 2, // This creates a perfect circle
                width: size, // Width of the circle
                height: size, // Height of the circle
                justifyContent: 'center',
                alignItems: 'center',
                ...props.style, // Allow additional styling from props
            }}
            {...props}
        >
            <MaterialCommunityIcons
                name={iconName}
                size={size * 0.4} // Icon size is half the size of the circle
                color={iconColor}
            />
        </View>
    );
};