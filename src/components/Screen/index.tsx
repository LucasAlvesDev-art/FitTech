import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themas } from '../../global/themes';

export function Screen({ children }: any) {
  return (
    <SafeAreaView  style={{
      flex: 1,
      backgroundColor: themas.colors.bgScreen,
      padding: 20
    }}>
      {children}
    </SafeAreaView>
  );
}