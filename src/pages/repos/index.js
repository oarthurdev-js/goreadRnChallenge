import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import SeachButton from '../../components/searchButton';

export default function HomeScreen({navigation}) {
  const [listaRepos, setListaRepos] = useState([]);
  const [repoSearch, onChangeRepoSearch] = useState('');

  useEffect(() => {
    axios
      .get('https://api.github.com/search/repositories?q=Q')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setListaRepos(data.items);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function Repos(items) {
    const {name, stargazes_count, avatar_url, login} = items.items;

    return (
      <View style={estilos.bodyContent}>
        <View style={estilos.rowView}>
          <Image source={avatar_url} style={estilos.imageImported} />
          <Text style={estilos.textInsideRow}>{name}</Text>
          <Text style={estilos.textStars}>{stargazes_count}</Text>
        </View>
        <View style={estilos.loginOwner}>
          <Text>{login}</Text>
        </View>
        <View style={estilos.horizontalLine} />
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      <View style={estilos.header}>
        <Text style={estilos.headerTitle}>Repositórios</Text>
      </View>
      <SeachButton
        placeholder={'Busca por repositórios'}
        onChangeText={onChangeRepoSearch}
      />
      <FlatList
        data={listaRepos}
        keyExtractor={items => items.id}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{flexGrow: 1}}
        renderItem={Repos}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 66,
    marginLeft: 16,
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: 32,
  },
  headerSearch: {
    backgroundColor: '#7676801f',
  },
  bodyContent: {
    marginTop: 44,
    marginLeft: 16,
  },
  horizontalLine: {
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    width: 294,
    marginLeft: '15%',
  },
  imageImported: {
    width: 52,
    height: 52,
    borderRadius: 52,
    backgroundColor: '#D9D9D9',
  },
  rowView: {
    flexDirection: 'row',
  },
  textInsideRow: {
    marginHorizontal: 10,
  },
  textStars: {
    textAlign: 'right',
    marginLeft: 60,
  },
  loginOwner: {
    marginLeft: 63,
    marginTop: -25,
    marginBottom: 20,
  },
});
