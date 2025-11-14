import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { colors } from '../theme/colors';
import { createPost } from '../services/api';

const categories = ['Serviços', 'Comércio', 'Avisos', 'Eventos'];

export default function CreatePostScreen({ navigation }) {
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePublish = async () => {
    if (!content.trim() || !selectedCategory) {
      Alert.alert('Atenção', 'Preencha o conteúdo e selecione uma categoria!');
      return;
    }

    setIsLoading(true);
    
    try {
      const postData = {
        content: content.trim(),
        category: selectedCategory,
        user: {
          name: 'Usuário Slum', // No futuro, pegar do perfil do usuário
          location: 'Minha Comunidade'
        }
      };

      await createPost(postData);
      
      Alert.alert(
        'Sucesso!', 
        'Post criado com sucesso! 🎉',
        [
          { 
            text: 'OK', 
            onPress: () => {
              setContent('');
              setSelectedCategory('');
              navigation.navigate('Feed');
            }
          }
        ]
      );
      
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível publicar o post. Tente novamente.');
      console.error('Erro detalhado:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Criar Post</Text>
      
      <TextInput
        style={styles.input}
        placeholder="O que está acontecendo na quebrada?"
        placeholderTextColor="#666"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={4}
        editable={!isLoading}
      />

      <Text style={styles.subtitle}>Categoria</Text>
      
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryButton,
            selectedCategory === category && styles.selectedCategory,
            isLoading && styles.disabledButton
          ]}
          onPress={() => !isLoading && setSelectedCategory(category)}
          disabled={isLoading}
        >
          <Text style={styles.categoryText}>{category}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[
          styles.publishButton, 
          (!content || !selectedCategory || isLoading) && styles.disabledButton
        ]}
        disabled={!content || !selectedCategory || isLoading}
        onPress={handlePublish}
      >
        <Text style={styles.publishText}>
          {isLoading ? 'Publicando...' : 'Publicar'}
        </Text>
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>💡 Dica: Seja claro e objetivo no seu post!</Text>
        <Text style={styles.infoText}>📍 Seu post aparecerá para toda a comunidade</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background, 
    padding: 20 
  },
  title: {
    fontSize: 32,
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
    minHeight: 120,
    fontSize: 16,
  },
  subtitle: {
    fontSize: 20,
    color: colors.secondary,
    marginBottom: 15,
    fontWeight: '600',
  },
  categoryButton: {
    backgroundColor: colors.surface,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedCategory: {
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: 'rgba(138, 43, 226, 0.1)',
  },
  categoryText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  publishButton: {
    backgroundColor: colors.accent,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: colors.surface,
    opacity: 0.6,
  },
  publishText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  infoText: {
    color: colors.text,
    fontSize: 14,
    marginBottom: 5,
  },
});