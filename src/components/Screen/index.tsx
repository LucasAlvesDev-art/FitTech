import React from 'react';
import { View } from 'react-native';
import { themas } from '../../global/themes';

export function Screen({ children }: any) {
  return (
    <View style={{
      flex: 1,
      backgroundColor: themas.colors.bgScreen,
      padding: 20
    }}>
      {children}
    </View>
  );
}