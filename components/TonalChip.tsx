import { Colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { Chip } from 'react-native-paper';

export const TonalChip = ({ backgroundColor = Colors.orange.opacity, textColor = Colors.orange.theme, children, style = {}, ...props }: any) => {
    return (
        <Chip mode="flat" style={{ backgroundColor: backgroundColor, borderRadius: 25, padding: 5, ...style }} {...props}>
            <Text className='font-rubik-bold' style={{ color: textColor }}>{children}</Text>
        </Chip>
    )
}

export const TonalIconChip = ({ backgroundColor = Colors.orange.opacity, iconColor = Colors.orange.theme, iconName, size = 40,square=false, ...props }: any) => {
    return (
        <View
            style={{
                backgroundColor: backgroundColor,
                borderRadius: square ? 6 : size / 2,
                width: size,
                height: size,
                justifyContent: 'center',
                alignItems: 'center',
                ...props.style
            }}
            {...props}
        >
            <MaterialCommunityIcons
                name={iconName}
                size={size * 0.4}
                color={iconColor}
            />
        </View>
    );
};