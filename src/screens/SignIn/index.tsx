import { ScrollViewWrapper } from '@/components/View';
import { Box } from 'native-base';
import React, { useState } from 'react';
import { Image } from 'react-native';
import InputsSingIn from './components/Login/inputs';

export default function SignIn() {
    const [show, setShow] = useState(false);

    return (
        <ScrollViewWrapper justifyContent="center">
            <Box>
                <Image
                    source={require('@/assets/Logo/Logo.png')}
                    style={{ width: 250, height: 250 }}
                />
            </Box>

            <InputsSingIn show={show} setShow={setShow} />
        </ScrollViewWrapper>
    );
}
