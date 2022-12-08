import {View} from 'react-native';
import {WebView} from 'react-native-webview';
import React, {Component} from 'react';

class WebViewRepo extends Component() {
  render() {
    return (
      <View>
        <WebView
          source={{
            uri: 'https://github.com/oarthurdev-js',
          }}
          style={{flex: 1}}
        />
      </View>
    );
  }
}

export default WebViewRepo;
