import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Switch } from 'react-native-paper';
//@ts-ignore
import { Controller } from 'react-hook-form';

const CustomSwitch = ({
    name,
    control,
    label,
    sx = {},
    error,
    helperText,
    ...rest
}: any) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }: any) => (
                <View style={[styles.container, sx]}>
                    {label && <Text style={styles.label}>{label}</Text>}
                    <Switch
                        value={value}
                        onValueChange={onChange}
                        color="#0061FF"
                        {...rest}
                    />
                    {error && <Text style={styles.errorText}>{helperText}</Text>}
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        color: '#191D31',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
});

export default CustomSwitch;
