import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import SeachButton from '../../components/searchButton';

export default function HomeScreen({navigation}) {
  const [listaRepos, setListaRepos] = useState([]);
  const [repoSearch, onChangeRepoSearch] = useState('');

  useEffect(() => {
    axios
      .get(`https://api.github.com/search/repositories?q=${repoSearch}`)
      .then(res => {
        console.log(res.data);
        setListaRepos(res.data.items);
      })
      .catch(error => {
        console.log(error);
      });
  }, [repoSearch]);

  useEffect(() => {
    axios
      .get('https://api.github.com/search/repositories?q=Q')
      .then(res => {
        console.log(res.data);
        setListaRepos(res.data.items);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function Repo(item) {
    const {name, stargazers_count, owner} = item.item;

    async function handleRepo() {
      navigation.navigate('WebViewRepo', {paramKey: name});
    }
    return (
      <TouchableOpacity onPress={() => handleRepo()}>
        <View style={estilos.bodyContent}>
          <View style={estilos.rowView}>
            {/* foto dentro de owner */}
            <Image
              source={{uri: owner.avatar_url}}
              style={estilos.imageImported}
            />
            <Text style={estilos.textInsideRow}>{name}</Text>
            {/* stargazers */}
            <Text style={estilos.textStars}>{stargazers_count} stars</Text>
          </View>
          <View style={estilos.loginOwner}>
            {/* login dentro de owner */}
            <Text>{owner.login}</Text>
          </View>
          <View style={estilos.horizontalLine} />
        </View>
      </TouchableOpacity>
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
        keyExtractor={item => item.id}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{flexGrow: 1}}
        renderItem={Repo}
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
    alignContent: 'space-between',
  },
  textInsideRow: {
    marginHorizontal: 10,
  },
  textStars: {
    textAlign: 'right',
    // marginLeft: 100,
  },
  loginOwner: {
    marginLeft: 63,
    marginTop: -25,
    marginBottom: 20,
  },
});
