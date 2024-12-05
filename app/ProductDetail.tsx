  import React, { useState, useEffect } from 'react';
  import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, SafeAreaView, Alert } from 'react-native';
  import { useLocalSearchParams, useRouter } from 'expo-router';
  import { getProductDetail } from '../hooks/api';

  interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
    owned: boolean;
  }

  const ProductDetailScreen = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
      fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
      try {
        const data = await getProductDetail(Number(id));
        setProduct(data ? { ...data, owned: false } : null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const handleBuyProduct = async () => {
      if (!product) return;
      
      setPurchasing(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setProduct(prev => prev ? {...prev, owned: true} : null);
        Alert.alert(
          "Success",
          "Product purchased successfully!",
          [{ text: "OK", onPress: () => router.back() }]
        );
      } catch (error) {
        Alert.alert("Error", "Failed to purchase product");
      } finally {
        setPurchasing(false);
      }
    };

    if (loading) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6B4EFF" />
          </View>
        </SafeAreaView>
      );
    }

    if (!product) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.loadingContainer}>
            <Text>Product not found</Text>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
          </View>

          <Image 
            source={{ uri: product.image }} 
            style={styles.image} 
            resizeMode="contain"
          />
          
          <View style={styles.content}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>{product.price} Coins</Text>
            <Text style={styles.description}>{product.description}</Text>
            
            <TouchableOpacity 
              style={[styles.buyButton, purchasing && styles.buyButtonDisabled]}
              onPress={handleBuyProduct}
              disabled={purchasing || product.owned}
            >
              <Text style={styles.buyButtonText}>
                {purchasing ? 'Processing...' : product.owned ? 'Owned' : 'Buy Now'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      backgroundColor: '#6B4EFF',
      padding: 16,
    },
    backButton: {
      paddingVertical: 8,
      marginRight: 16,
      padding: 8,
      backgroundColor: '#007bff',
      borderRadius: 8,
      width: 30
    },
    backButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '500',
    },
    image: {
      width: '100%',
      height: 300,
      backgroundColor: 'white',
    },
    content: {
      padding: 16,
      backgroundColor: 'white',
      margin: 16,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#1A1A1A',
    },
    price: {
      fontSize: 18,
      color: '#6B4EFF',
      fontWeight: '600',
      marginBottom: 16,
    },
    description: {
      fontSize: 14,
      lineHeight: 20,
      color: '#4A4A4A',
      marginBottom: 24,
    },
    buyButton: {
      backgroundColor: '#6B4EFF',
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
    },
    buyButtonDisabled: {
      backgroundColor: '#A5A5A5',
    },
    buyButtonText: {
      color: 'white',
      fontWeight: '600',
      fontSize: 16,
    },
  });

  export default ProductDetailScreen;
