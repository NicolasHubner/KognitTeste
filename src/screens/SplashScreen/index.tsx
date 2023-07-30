import { PageWrapper } from '@/components/View';
import { Route } from '@/routes/routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text } from 'native-base';
import React, { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, Image } from 'react-native';

type RootStackParamList = {
    SignIn: undefined;
};

interface SplashScreenProps {
    navigation: StackNavigationProp<RootStackParamList, 'SignIn'>;
}

export default function SplashScreen({ navigation }: SplashScreenProps) {
    const fadeAnim = new Animated.Value(0);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 3500,
            useNativeDriver: true,
        }).start(() => {
            navigation.navigate('SignIn');
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <PageWrapper>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('SignIn');
                }}>
                <Animated.View style={{ opacity: fadeAnim }}>
                    <Image
                        source={require('@/assets/Logo/Logo.png')}
                        style={{ width: 300, height: 300 }}
                    />
                </Animated.View>
            </TouchableOpacity>
        </PageWrapper>
    );
}
