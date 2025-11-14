import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { colors } from '../theme/colors';

export default function LoginScreen({ navigation }) {
  return (
    <ImageBackground 
      source={require('../assets/graffiti-wall.jpg')}
      style={styles.container}
      blurRadius={2}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>SLUM</Text>
        <Text style={styles.subtitle}>Sua Quebrada, Sua Rede</Text>
        
        <TouchableOpacity 
          style={styles.googleButton}
          onPress={() => navigation.navigate('Onboarding')}
        >
          <Text style={styles.buttonText}>Entrar com Google</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.phoneButton}
          onPress={() => navigation.navigate('PhoneLogin')}
        >
          <Text style={styles.phoneText}>Entrar com Celular</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.7)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  title: {
    fontFamily: 'Graffiti',
    fontSize: 64,
    color: colors.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: colors.secondary,
    marginBottom: 50,
  },
  googleButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 15,
  },
  buttonText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    color: colors.background,
  },
  phoneButton: {
    borderWidth: 2,
    borderColor: colors.text,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
  },
  phoneText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: colors.text,
  }
});