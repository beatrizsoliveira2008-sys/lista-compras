// Importações do que será usado
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import { Feather } from '@expo/vector-icons';

// Paleta de cores
const OffWhite = '#FAF9F6';
const Cinza = '#616365';
const Bege = '#d6c3a9';
const Creme = '#e9decc';
const Preto = '#000000'

// Função principal
export default function App() {

  // Estado para armazenar o texto digitado no input
  const [produto, setProduto] = useState('');

  // Estado para armazenar a lista de produtos adicionados
  const [listaProdutos, setListaProdutos] = useState([]);

  // Importação de fonte
  const [fontLoaded] = useFonts({
    'PlusJakartaSans-Medium': require('./assets/fonts/PlusJakartaSans-Medium.ttf'),
  });
  if (!fontLoaded) {
    return null;
  }

  // Função para adicionar produto à lista
  const adicionarProduto = () => {
    if (produto.trim() === '') return; // Impede de adicionar texto vazio

    const novoItem = {
      id: Date.now().toString(),
      nome: produto
    };

    setListaProdutos([...listaProdutos, novoItem]);
    setProduto(''); // Limpa o input após adicionar
  };

  // Função para remover um produto da lista
  const removerProduto = (id) => {
    setListaProdutos(listaProdutos.filter(item => item.id !== id));
  };

  // Items que aparecerão na tela
  return (
    <ScrollView style={styles.container}>

      {/* Tútulo */}
      <Text style={styles.title}>Lista de Compras</Text>

      {/* Adição de produtos */}
      <View style={styles.addProduct}>
        <TextInput
        style={styles.input}
        placeholder="Digite um produto..."
        placeholderTextColor={Cinza}
        keyboardType="default"
        autoCapitalize="none"
        value={produto}
        onChangeText={setProduto}
       />

       <Pressable style={styles.buttonP} onPress={adicionarProduto}>
        <Text style={styles.textoButtonP}>Adicionar</Text>
       </Pressable>
      </View>

      {/* Renderização da lista de produtos */}
      {listaProdutos.map((item) => (
        <View key={item.id} style={styles.products}>
          <Text style={styles.product}>{item.nome}</Text>

          {/* Deletar */}
          <Pressable style={styles.delete} onPress={() => removerProduto(item.id)}>
            <Feather name="trash-2" size={20} color="#6b6254" />
          </Pressable>
        </View>
      ))}

    </ScrollView>
  );
}

// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: OffWhite,
    padding: 20
  },
  title: {
    fontSize: 25,
    fontFamily: 'PlusJakartaSans-Medium',
    fontWeight: 'bold'
  },
  addProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 10
  },
  input: {
    width: '70%',
    height: 35,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Medium',
    borderWidth: 1,
    borderColor: Cinza,
  },
  buttonP: {
    backgroundColor: Bege,
    width: 105,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  textoButtonP: {
    fontFamily: 'PlusJakartaSans-Medium',
    color: Preto
  },
  products: {
    backgroundColor: Creme,
    marginTop: 30,
    width: '100%',
    height: 100,
    borderRadius: 10,
    padding: 40,
    shadowColor: Preto,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  product: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 17,
    color: Preto
  },
  delete: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
});