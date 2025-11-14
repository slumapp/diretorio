import { useFonts } from 'expo-font';

export const loadFonts = async () => {
  const [fontsLoaded] = useFonts({
    'Graffiti': require('../assets/fonts/Bungee-Regular.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
  });
  return fontsLoaded;
};