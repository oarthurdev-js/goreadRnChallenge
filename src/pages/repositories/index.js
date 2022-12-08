import {View} from 'react-native';
import React, {useState} from 'react';
import {WebView} from 'react-native-webview';

export default function WebViewPage({navigation, route}) {
  return (
    <View style={{flex: 1}}>
      <WebView
        source={{
          uri: `https://github.com/${route.params.owner.login}/${route.params.paramKey}`,
        }}
        style={{flex: 1}}
      />
    </View>
  );
}
