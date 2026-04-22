import { Colors } from '@/constants/Colors';
import React from 'react';
import { Button as PaperButton } from 'react-native-paper';

const CustomButton = ({
    type = 'button',
    onPress,
    loading = false,
    className = '',
    style = {},
    children,
    square = false,
    fullWidth = false,
    width = '',
    color = Colors.orange.theme,
    ...rest
}: any) => {
    return (
        <PaperButton
            mode="contained"
            onPress={onPress}
            loading={loading}
            disabled={loading}
            theme={{ colors: { primary: color } }}
            style={{
                ...style,
                width: fullWidth ? '100%' : width || 'auto',
                ...square && ({ borderRadius: 8 })
            }}
            labelStyle={{
                color: style?.color ? style?.color : Colors.white,
            }}
            {...rest}
        >
            {children}
        </PaperButton>
    );
}

export default CustomButton;
