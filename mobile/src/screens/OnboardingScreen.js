import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { colors } from '../theme/colors';

const comunidades = ["Rocinha", "Complexo do Alemão", "Paraisópolis", "Heliópolis", "Sua comunidade"];

export default function OnboardingScreen({ navigation }) {
  const [selectedComunidade, setSelectedComunidade] = useState('');
  const [profileType, setProfileType] = useState('');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Qual é sua quebrada?</Text>
      
      {comunidades.map((comunidade) => (
        <TouchableOpacity
          key={comunidade}
          style={[
            styles.comunidadeButton,
            selectedComunidade === comunidade && styles.selectedButton
          ]}
          onPress={() => setSelectedComunidade(comunidade)}
        >
          <Text style={styles.comunidadeText}>{comunidade}</Text>
        </TouchableOpacity>
      ))}

      <TextInput
        style={styles.input}
        placeholder="Ou digite sua comunidade..."
        placeholderTextColor={colors.text}
        value={selectedComunidade}
        onChangeText={setSelectedComunidade}
      />

      <Text style={styles.subtitle}>Como você rola?</Text>
      
      <TouchableOpacity
        style={[styles.profileButton, profileType === 'pessoal' && styles.selectedButton]}
        onPress={() => setProfileType('pessoal')}
      >
        <Text style={styles.profileText}>👤 Perfil Pessoal</Text>
        <Text style={styles.profileDescription}>Bicos, skills, conexões</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.profileButton, profileType === 'comercial' && styles.selectedButton]}
        onPress={() => setProfileType('comercial')}
      >
        <Text style={styles.profileText}>🏪 Perfil Comercial</Text>
        <Text style={styles.profileDescription}>Loja, serviços, produtos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.continueButton,
          (!selectedComunidade || !profileType) && styles.disabledButton
        ]}
        disabled={!selectedComunidade || !profileType}
        onPress={() => navigation.navigate('MainApp')}
      >
        <Text style={styles.continueText}>Continuar</Text>
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
    fontFamily: 'Graffiti',
    fontSize: 32,
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  comunidadeButton: {
    backgroundColor: colors.surface,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedButton: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  comunidadeText: {
    color: colors.text,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: colors.secondary,
    marginBottom: 15,
  },
  profileButton: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  profileText: {
    color: colors.text,
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
  },
  profileDescription: {
    color: colors.text,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    opacity: 0.7,
  },
  continueButton: {
    backgroundColor: colors.accent,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: colors.surface,
  },
  continueText: {
    color: colors.background,
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
  },
});