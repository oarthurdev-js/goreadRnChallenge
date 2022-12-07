import {React} from 'react';
import {KeyboardAvoidingView, Image, StyleSheet, TextInput} from 'react-native';

export default function SeachButton(props) {
  return (
    <KeyboardAvoidingView style={estilos.container}>
      <Image
        source={require('../assets/images/search-interface-symbol.png')}
        style={estilos.imageImported}
      />
      <TextInput
        style={estilos.textInside}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
      />
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  container: {
    backgroundColor: '#7676801f',
    width: '90%',
    marginTop: 16,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    padding: 8,
  },
  textInside: {
    fontSize: 18,
    color: '#3c3c4399',
    paddingHorizontal: 5,
  },
  imageImported: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
});
