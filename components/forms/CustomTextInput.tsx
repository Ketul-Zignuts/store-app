import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
//@ts-ignore
import { Controller } from 'react-hook-form';

const ERROR_TEXT_STYLE = {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
};

const CustomTextInput = ({
    name,
    control,
    placeholder,
    sx = {},
    error,
    helperText,
    icon = '',
    onIconPress,
    mode = 'outlined',
    secureTextEntry,
    rounded = false,
    multiline = false,
    customInputWidth = false,
    widthAdjustment = '',
    numberOfLines = 1,
    ...rest
}: any) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value } }: any) => (
                <View style={[styles.inputContainer, { width: customInputWidth ? (widthAdjustment ? widthAdjustment : '100%') : '100%' }]}>
                    <TextInput
                        mode={mode}
                        label={placeholder}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        secureTextEntry={secureTextEntry}
                        error={!!error}
                        multiline={multiline}
                        numberOfLines={numberOfLines}
                        outlineStyle={{ borderRadius: rounded ? 50 : 8 }}
                        right={
                            icon ? <TextInput.Icon icon={icon} onPress={onIconPress} /> : null
                        }
                        theme={{
                            colors: {
                                onSurface: '#111111',
                                onSurfaceVariant: '#666666',
                                primary: Colors.orange.theme,
                                outline: '#CCCCCC',
                                error: '#FF0000',
                                background: '#FFFFFF'
                            },
                        }}
                        style={[
                            styles.textInput,
                            multiline && styles.multilineInput,
                            sx,
                        ]}
                        {...rest}
                    />
                    {error && (
                        <Text style={[ERROR_TEXT_STYLE, { paddingLeft: 0, marginLeft: 0 }]}>
                            {helperText}
                        </Text>
                    )}
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 8,
    },
    textInput: {
        backgroundColor: '#FFFFFF',
    },
    multilineInput: {
        minHeight: 100,
        paddingVertical: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
});

export default CustomTextInput;