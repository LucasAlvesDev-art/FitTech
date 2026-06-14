import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { themas } from '../../global/themes';

interface PaginationDotsProps {
    total: number;
    activeIndex: number;
}

export function PaginationDots({ total, activeIndex }: PaginationDotsProps) {
    return (
        <View style={styles.container}>
            {Array.from({ length: total }).map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.dot,
                        {
                            backgroundColor:
                                index === activeIndex
                                    ? themas.colors.dotActive
                                    : themas.colors.dotInactive,
                            width: index === activeIndex ? 24 : 8,
                        },
                    ]}
                />
            ))}
        </View>
    );
}
