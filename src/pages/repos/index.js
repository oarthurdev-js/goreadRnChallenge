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
      .get(`https://api.github.com/search/repositories?q=${repoSearch}`) // url dinamico
      .then(res => { // retorno da promise é um objeto de resposta (res)
        console.log(res.data);
        setListaRepos(res.data.items); // pra extrair a resposta de fato usa o res.data
      })
      .catch(error => {
        console.log(error);
      });
  }, [repoSearch]); // texto da query como dependência do useEffect

  // TODO: toda vez q o texto da query mudar, a api vai ser chamada. Adicionar a parada do vídeo aqui.

  function Repo(item) {
    const {name, stargazers_count, owner} = item.item; // Mudei o stargazeRs e substituí a foto e o login por owner

    return (
      <View style={estilos.bodyContent}>
        <View style={estilos.rowView}>
          {/* foto dentro de owner */}
          <Image source={owner.avatar_url} style={estilos.imageImported} />
          <Text style={estilos.textInsideRow}>{name}</Text>
          
          {/* stargazeRs */}
          <Text style={estilos.textStars}>{stargazers_count}</Text>

        </View>
        <View style={estilos.loginOwner}>
          {/* login dentro de owner */}
          <Text>{owner.login}</Text>
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
