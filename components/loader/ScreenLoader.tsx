import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const ScreenLoader = () => {
    return (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={100} theme={{ colors: { primary: 'white' } }} />
        </View>
    )
}

export default ScreenLoader;