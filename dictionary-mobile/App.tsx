import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function App() {
  const [dogImage, setDogImage] = useState('');
  const [dogFact, setDogFact] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<Array<{image: string, fact: string}>>([]);

  const fetchDogContent = async () => {
    setLoading(true);
    try {
      // Fetch dog image
      const imageResponse = await fetch('https://dog.ceo/api/breeds/image/random');
      let newImage = '';

      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        if (imageData.status === 'success') {
          newImage = imageData.message;
        }
      }

      // Fetch dog fact
      const factResponse = await fetch('https://dogapi.dog/api/v2/facts');
      let newFact = '';

      if (factResponse.ok) {
        const factData = await factResponse.json();
        if (factData.data && factData.data.length > 0) {
          newFact = factData.data[0].attributes.body;
        }
      }

      if (!newImage && !newFact) {
        Alert.alert('Error', 'Failed to fetch dog content. Please check your internet connection.');
        return;
      }

      setDogImage(newImage || 'No image available');
      setDogFact(newFact || 'No fact available');

      // Add to history
      if (newImage || newFact) {
        setHistory(prev => [{image: newImage, fact: newFact}, ...prev.slice(0, 4)]);
      }

    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to fetch dog content. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    setDogImage('');
    setDogFact('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Text style={styles.title}>🐕 Dog App</Text>
        <Text style={styles.subtitle}>Random Dogs & Facts</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.fetchButton, loading && styles.fetchButtonDisabled]}
          onPress={fetchDogContent}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={styles.fetchButtonText}>🐾 Get Random Dog!</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {dogImage ? (
          <View style={styles.dogContainer}>
            <Image
              source={{ uri: dogImage }}
              style={styles.dogImage}
              resizeMode="cover"
            />
            {dogFact ? (
              <View style={styles.factContainer}>
                <Text style={styles.factTitle}>🐕 Dog Fact:</Text>
                <Text style={styles.factText}>{dogFact}</Text>
              </View>
            ) : null}
          </View>
        ) : null}

        {history.length > 0 && (
          <View style={styles.historyContainer}>
            <View style={styles.historyHeader}>
              <Text style={styles.historyTitle}>Recent Dogs</Text>
              <TouchableOpacity onPress={clearHistory}>
                <Text style={styles.clearButton}>Clear</Text>
              </TouchableOpacity>
            </View>

            {history.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.historyItem}
                onPress={() => {
                  setDogImage(item.image);
                  setDogFact(item.fact);
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.historyImage}
                  resizeMode="cover"
                />
                <View style={styles.historyTextContainer}>
                  <Text style={styles.historyFact} numberOfLines={3}>
                    {item.fact}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6c757d',
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    alignItems: 'center',
  },
  fetchButton: {
    backgroundColor: '#ff6b35',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fetchButtonDisabled: {
    backgroundColor: '#6c757d',
  },
  fetchButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  dogContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  dogImage: {
    width: '100%',
    height: width * 0.8,
  },
  factContainer: {
    padding: 20,
  },
  factTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  factText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#495057',
  },
  historyContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  clearButton: {
    color: '#dc3545',
    fontSize: 14,
    fontWeight: '600',
  },
  historyItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    alignItems: 'center',
  },
  historyImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  historyTextContainer: {
    flex: 1,
  },
  historyFact: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
  },
});
