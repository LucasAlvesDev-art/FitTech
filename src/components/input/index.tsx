import React, {forwardRef, LegacyRef} from "react";

import { View, Text, TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { themas } from "../../global/themes";

import { MaterialIcons, FontAwesome, Octicons } from '@expo/vector-icons';

type IconComponent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>> | 
                     React.ComponentType<React.ComponentProps<typeof FontAwesome>> |
                     React.ComponentType<React.ComponentProps<typeof Octicons>>;

type Props = TextInputProps & {
    IconLeft?: IconComponent,
    IconRight?: IconComponent,
    IconLeftName?: string,
    IconRightName?: string,
    title?: string,
    onIconLeftPress?: () => void,
    onIconRightPress?: () => void
}


export const Input = forwardRef((Props: Props, ref: LegacyRef<TextInput> | null) => {
    

    const {IconLeft, IconRight, IconLeftName, IconRightName, title, onIconLeftPress, onIconRightPress, ...rest} = Props

    const calculateSizedWidth = () => {
        if(IconLeft && IconRight){
            return '80%';
        }else if (IconLeft || IconRight){
            return '90%';
        }else{
            return '100%';
        }
    }

    const calculateSizedPaddingLeft = () => {
        if(IconLeft && IconRight){
            return 0;
        }else if (IconLeft || IconRight){
            return 10;
        }else{
            return 20;
        }
    }

    return (
        <>
            {title && <Text style={styles.titleInput}>{title}</Text>}
            <View style={[styles.BoxInput, {paddingLeft: calculateSizedPaddingLeft()}]}>
                {IconLeft && IconLeftName && (
                <TouchableOpacity onPress={onIconLeftPress} style={styles.Button}>
                    <IconLeft name={IconLeftName as any} size={20} color={themas.colors.gray} style={styles.Icon} />
                </TouchableOpacity>  
                )}
                <TextInput 
                    style=  {[
                                styles.input,{width: calculateSizedWidth()}
                            ]}
                    {...rest}
                />
                {IconRight && IconRightName && (
                    <TouchableOpacity onPress={onIconRightPress} style={styles.Button}>
                        <IconRight name={IconRightName as any} size={20} color={themas.colors.gray} style={styles.Icon} />
                    </TouchableOpacity>
                )}
            </View>
        </>  
    )


})