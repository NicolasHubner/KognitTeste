import { PageWrapper } from '@/components/View';
import { View, Text, FlatList, useTheme, Divider, Spinner, Box } from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import ListItem from './MemoCard';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { useNavigation } from '@react-navigation/native';
import { set } from 'react-hook-form';

export interface INotificationsData {
    userId: number;
    id: number;
    title: string;
    body: string;
}

// Geralmente teria que averiguar com o back o tamanho ideal das notificações para não utilizar de espaço desnecessário na rendereização do card

// A quebra de linha no texto, mas como as palavras que estão chegando possuem tamanhos aleatórios por ser derivado do loren ipsum, não consegui fazer uma quebra de linha que ficasse bonita
// Criei uma "paginação fake", para simular as paginações

// Pensando que irão testar mais de uma vez, as notificações serão "puxadas" todas as vezes que abrirem a tela.

export default function Notification() {
    const navigator = useNavigation<INavigation>();

    const [allNotifications, setAllNotifications] = useState<INotificationsData[]>([]);

    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [showNotification, setShowNotification] = useState<INotificationsData[]>([]);

    const [eraseAll, setErase] = useState(false);
    // const { colors } = useTheme();

    const dataNotification = useCallback(async (): Promise<void> => {
        try {
            setLoading(true);
            const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'GET',
            });
            const data = await res.json();

            setAllNotifications(data);
            setShowNotification(data.slice(0, 10));
        } catch (error) {
            Alert.alert('Erro ao carregar as notificações');
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    }, []);

    useEffect(() => {
        dataNotification();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteNotification = (id: number, userId: number) => {
        setLoading(true);

        setTimeout(() => {
            if (allNotifications.length === 0) {
                return;
            }
            const newData = allNotifications.filter(item => item.id !== id);

            setAllNotifications(newData);
            setShowNotification(newData.slice(0, 10 * page));
            setLoading(false);
        }, 300);
    };

    const cleanAllNotifications = useCallback(() => {
        setLoading(true);
        setTimeout(() => {
            setAllNotifications([]);
            Alert.alert('Notificações limpas com sucesso', 'Você não possui mais notificações', [
                {
                    text: 'Ok',
                    onPress: () => {
                        setErase(true);
                        setLoading(false);
                    },
                },
            ]);
        }, 200);
    }, []);

    useEffect(() => {
        navigator.setOptions({
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => (
                <TouchableOpacity onPress={() => cleanAllNotifications()}>
                    <Text fontSize={16} color="blue.500" mr={2}>
                        Limpar
                    </Text>
                </TouchableOpacity>
            ),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <PageWrapper edges={['right', 'bottom', 'left']}>
            {loading && !eraseAll && (
                <Box>
                    <Spinner mt={2} accessibilityLabel="Loading posts" size="lg" color="blue.500" />
                </Box>
            )}
            {!loading && !eraseAll && (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: 4, paddingBottom: 32, width: '100%' }}
                    data={showNotification}
                    renderItem={({ item }) => (
                        <ListItem item={item} deleteNotification={deleteNotification} />
                    )}
                    keyExtractor={item => item.id.toString()}
                    // eslint-disable-next-line react/no-unstable-nested-components
                    ItemSeparatorComponent={() => <Divider />}
                    onEndReached={() => {
                        const newData = allNotifications.slice(0, page * 10);
                        setShowNotification(newData);
                        setPage(page + 1);
                    }}
                />
            )}
            {!loading && eraseAll ? (
                <Text fontSize={16}>Você não possui notificações =-)</Text>
            ) : null}
        </PageWrapper>
    );
}
