import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../theme/colors';

const categories = ['Serviços', 'Comércio', 'Avisos', 'Eventos'];

export default function CreatePostScreen({ navigation }) {
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handlePublish = () => {
    // Aqui você vai integrar com a API para publicar o post
    console.log('Publicar:', { content, category: selectedCategory });
    navigation.goBack();
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
      />

      <Text style={styles.subtitle}>Categoria</Text>
      
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryButton,
            selectedCategory === category && styles.selectedCategory
          ]}
          onPress={() => setSelectedCategory(category)}
        >
          <Text style={styles.categoryText}>{category}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.publishButton, (!content || !selectedCategory) && styles.disabledButton]}
        disabled={!content || !selectedCategory}
        onPress={handlePublish}
      >
        <Text style={styles.publishText}>Publicar</Text>
      </TouchableOpacity>
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
    minHeight: 100,
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
  },
  categoryText: {
    color: colors.text,
    fontSize: 16,
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
  },
  publishText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
});