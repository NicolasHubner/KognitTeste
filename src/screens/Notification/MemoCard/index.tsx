import { memo, useRef, useState } from 'react';
import { INotificationsData } from '..';
import { Animated, PanResponder, TouchableOpacity } from 'react-native';
import { View, Text, Box } from 'native-base';
import { Entypo } from '@expo/vector-icons';

interface ListItemProps {
    item: INotificationsData;
    deleteNotification: any;
}

const ListItem = memo(({ item, deleteNotification }: ListItemProps) => {
    return (
        <>
            <View flexDirection={'row'} w={'100%'} h={150}>
                <View
                    w={'90%'}
                    alignSelf={{ base: 'center', md: 'flex-start' }}
                    my={2}
                    p={2}
                    h={'100%'}
                    borderRadius={8}>
                    <Text bold>
                        {item.title} - {item.id}
                    </Text>
                    <Text mt={2} flexWrap={'wrap'} textAlign={'justify'} fontSize={12}>
                        {item.body}
                    </Text>
                </View>
                <Box h={'100%'} justifyContent={'center'} alignItems={'center'}>
                    <TouchableOpacity onPress={() => deleteNotification(item.id, item.userId)}>
                        <Entypo name="trash" size={24} color="black" />
                    </TouchableOpacity>
                </Box>
            </View>
        </>
    );
});

export default ListItem;
