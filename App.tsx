/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Button,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { AutoSkeletonView } from 'react-native-auto-skeleton';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

function HomeScreen({ navigation }) {
  const [isBlockHidden, setIsBlockHidden] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const reset = () => {
    setIsLoading(false);
    setIsBlockHidden(false);
  };

  return (
    <ScrollView style={styles.container}>
      <AutoSkeletonView isLoading={isLoading}>
        <Text>1. Turn On loading</Text>
        <Text>2. Hide elements</Text>
        <Text>3. Turn off loading</Text>
        <Text>4. Show elements</Text>
        {!isBlockHidden && (
          <Text style={styles.name}>This text will not be visible</Text>
        )}
        {!isBlockHidden && (
          <Text style={styles.name}>This text will no be visible as well</Text>
        )}
      </AutoSkeletonView>

      <View style={styles.buttonContainer}>
        <Button
          onPress={() => setIsLoading(!isLoading)}
          title="Toggle loading"
        />
        <Text>isLoading: {isLoading.toString()}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => setIsBlockHidden(!isBlockHidden)}
          title="Toggle hidden element"
        />
        <Text>isBlockHidden: {isBlockHidden.toString()}</Text>
      </View>
      <Button onPress={reset} title="reset" />
      <Button
        onPress={() => navigation.navigate('Details')}
        title="Navigate to details"
      />
    </ScrollView>
  );
}

function DetailsScreen() {
  return (
    <ScrollView style={[styles.container]}>
      {Array.from({ length: 101 }, (_, i) => (
        <Text style={styles.listItem} key={i}>
          {i}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    height: 40,
    width: 40,
  },
  name: {
    fontSize: 20,
    padding: 8,
    backgroundColor: 'lightgray',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: { backgroundColor: 'red', padding: 2 },
});

export default App;
