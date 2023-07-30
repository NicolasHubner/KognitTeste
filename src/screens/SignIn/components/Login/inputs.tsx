import { Box, FormControl, Input, Stack, useTheme, Text, Button, Spinner } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { INavigation } from '@/helpers/interfaces/INavigation';

interface InputsSingInProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

type FormData = {
    email: string;
    password: string;
};

// Utilizei React Hook Form para validação dos campos e envio dos dados
// Evitando reenderizações desnecessárias para aumentar perfomance do usuario

export default function InputsSingIn({ show, setShow }: InputsSingInProps) {
    const [loading, setLoading] = useState(false);

    const navigator = useNavigation<INavigation>();

    const { control, handleSubmit } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const color = useTheme().colors;

    const onSubmit = (data: FormData) => {
        setLoading(true);

        setTimeout(() => {
            navigator.navigate('Home', { email: data.email });
            setLoading(false);
        }, 2000);
    };

    return (
        <>
            <Box>
                <Box w={'100%'} h={20}>
                    <Controller
                        control={control}
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Entered value does not match email format',
                            },
                        }}
                        render={({ field, fieldState }) => (
                            <>
                                <Input
                                    w={{
                                        base: '90%',
                                        md: '25%',
                                    }}
                                    h={12}
                                    // mb={4}
                                    borderRadius={8}
                                    value={field.value}
                                    onBlur={field.onBlur}
                                    onChangeText={field.onChange}
                                    borderColor={color.gray[400]}
                                    placeholder="Email"
                                    keyboardType="email-address"
                                    InputLeftElement={
                                        <Ionicons
                                            name="person"
                                            size={16}
                                            color={color.gray[400]}
                                            style={{ marginLeft: 8 }}
                                        />
                                    }
                                />
                                {fieldState.error && (
                                    <Text fontSize={10} style={{ color: 'red' }}>
                                        {fieldState.error.message}
                                    </Text>
                                )}
                            </>
                        )}
                        name="email"
                    />
                </Box>

                <Box w={'100%'} h={20}>
                    <Controller
                        control={control}
                        rules={{
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must have at least 6 characters',
                            },
                        }}
                        render={({ field, fieldState }) => (
                            <>
                                <Input
                                    w={{
                                        base: '90%',
                                        md: '25%',
                                    }}
                                    h={12}
                                    borderRadius={8}
                                    // mt={8}
                                    borderColor={color.gray[400]}
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    placeholder="Senha"
                                    secureTextEntry={!show}
                                    InputLeftElement={
                                        <Ionicons
                                            name="lock-closed"
                                            size={16}
                                            color={color.gray[400]}
                                            style={{ marginLeft: 8 }}
                                        />
                                    }
                                    InputRightElement={
                                        !show ? (
                                            <Ionicons
                                                name="eye"
                                                size={16}
                                                color={color.gray[400]}
                                                style={{ marginRight: 8 }}
                                                onPress={() => setShow(!show)}
                                            />
                                        ) : (
                                            <Ionicons
                                                name="eye-off"
                                                size={16}
                                                color={color.gray[600]}
                                                style={{ marginRight: 8 }}
                                                onPress={() => setShow(!show)}
                                            />
                                        )
                                    }
                                />
                                {fieldState.error && (
                                    <Text fontSize={10} style={{ color: 'red' }}>
                                        {fieldState.error.message}
                                    </Text>
                                )}
                            </>
                        )}
                        name="password"
                    />
                </Box>
            </Box>

            <Box
                w={{
                    base: '90%',
                    md: '25%',
                }}
                mt={4}
                mb={8}
                backgroundColor={'red'}>
                <Button
                    disabled={loading}
                    h={12}
                    backgroundColor={'#6bb0ff'}
                    w={'100%'}
                    borderRadius={16}
                    // mt={4}
                    onPress={handleSubmit(onSubmit)}>
                    {!loading && (
                        <Text
                            textAlign={'center'}
                            color={'white'}
                            fontWeight={'bold'}
                            fontSize={12}
                            lineHeight={16}
                            letterSpacing={1.25}
                            textTransform={'uppercase'}>
                            Entrar
                        </Text>
                    )}
                    {loading && (
                        <Spinner accessibilityLabel="Loading Login" size="sm" color="white" />
                    )}
                </Button>

                <Box mt={4}>
                    <Text color={color.gray[600]} textAlign={'center'} underline>
                        Forgot Password?
                    </Text>
                </Box>
            </Box>
        </>
    );
}
