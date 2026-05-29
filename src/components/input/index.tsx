import React, {forwardRef} from "react";

import { View, Text, TextInput, TextInputProps } from 'react-native';
import { styles } from './styles';
import { themas } from "../../global/themes";

import { MaterialIcons, FontAwesome, Octicons } from '@expo/vector-icons';

type IconCopmonent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>> | 
                     React.ComponentType<React.ComponentProps<typeof FontAwesome>> |
                     React.ComponentType<React.ComponentProps<typeof Octicons>>;

type Props = TextInputProps & {
    IconLeft?: IconCopmonent,
    IconRight?: IconCopmonent,
    IconLeftName?: string,
    IconRightName?: string,
    title: string;
    onIconLeftPress?: () => void;
    onIconRightPress?: () => void;
}


export const Input = forwardRef(() => {
    return (
        <>
            <Text style={styles.titleInput}>ENDEREÇO E-MAIL</Text>
            <View style={styles.BoxInput}>
              <TextInput 
                style={styles.input}
              />
            <MaterialIcons 
                name="email"
                size={20}
                color={themas.colors.gray}
            />
          </View>
        </>  
    )


})