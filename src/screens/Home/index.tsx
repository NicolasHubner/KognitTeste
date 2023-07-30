import { PageWrapper } from '@/components/View';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Box, useTheme } from 'native-base';
import React, { useCallback, useEffect } from 'react';
import { capitalizeFirstLetter } from './helpers/capitalizeFirstLetter';
import { Ionicons } from '@expo/vector-icons';
import { BackHandler, TouchableOpacity } from 'react-native';
import { INavigation } from '@/helpers/interfaces/INavigation';
// Baseando nas telas de Ifood, AliExpress, Linkedin em que a tela de notificações é uma nova tela;

interface IParamsHome {
    email: string;
}
export default function Home() {
    const { params } = useRoute() as { params: IParamsHome };

    const { colors } = useTheme();

    const navigation = useNavigation<INavigation>();

    useFocusEffect(
        useCallback(() => {
            const disableSwipeBack = () => {
                navigation.setOptions({
                    gestureEnabled: false,
                });
            };
            disableSwipeBack();
            // Enable the gesture again when the component unmounts
            return () => {
                navigation.setOptions({
                    gestureEnabled: true,
                });
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener('hardwareBackPress', () => {
                BackHandler.exitApp();
                return true;
            });
        }, [])
    );
    return (
        <PageWrapper justifyContent={'flex-start'} edges={['bottom', 'left', 'right']}>
            <Box
                background={colors.gray[200]}
                width={'100%'}
                h={32}
                px={8}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                borderBottomLeftRadius={20}
                shadow={2}
                paddingTop={4}
                borderBottomRightRadius={20}>
                <Text fontSize={16}>Olá, {capitalizeFirstLetter(params.email.split('@')[0])}</Text>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Notification');
                    }}>
                    <Ionicons name="notifications" size={24} color="black" />
                </TouchableOpacity>
            </Box>
        </PageWrapper>
    );
}
