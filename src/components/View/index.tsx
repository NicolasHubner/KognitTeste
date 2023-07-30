import { KeyboardAvoidingView, ScrollView } from 'native-base';
import { Dimensions, FlexAlignType, FlexStyle, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface PageWrapperProps {
    children: React.ReactNode;
    justifyContent?: FlexStyle['justifyContent'];
    alignItems?: FlexStyle['alignItems'];
    edges?: Array<'top' | 'right' | 'left' | 'bottom'>;
}

export const PageWrapper = ({
    children,
    justifyContent = 'center',
    alignItems = 'center',
    edges = ['top', 'right', 'left', 'bottom'],
}: PageWrapperProps) => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: 'transparent',
                alignItems: alignItems,
                justifyContent: justifyContent,
            }}
            edges={edges}>
            {children}
        </SafeAreaView>
    );
};

export const ScrollViewWrapper = ({
    children,
    justifyContent = 'center',
    alignItems = 'center',
}: PageWrapperProps) => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: 'transparent',
                width: '100%',
            }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{
                    flex: 1,
                    width: '100%',
                }}>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        alignItems: alignItems,
                        justifyContent: justifyContent,
                        width: '100%',
                        // height: Dimensions.get('window').height,
                    }}
                    showsVerticalScrollIndicator={false}>
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
