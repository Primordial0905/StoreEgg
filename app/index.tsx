import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import GridViewIcon from './GridViewIcon';
import ListViewIcon from './ListViewIcon';
import SearchBar from '../components/SearchBar';
import ProductGrid from '../components/ProductGrid';
import ProductList from '../components/ProductList';
import { Link } from 'expo-router';

export default function Home() {
  const [isGridView, setIsGridView] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [myCoins] = React.useState(500);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <SearchBar 
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {/*my product button*/}

          <Link href="/MyProduct" asChild>
            <TouchableOpacity style={styles.myProductsButton}>
              <Text style={styles.myProductsText}>My Products</Text>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity 
            style={styles.viewToggle}
            onPress={() => setIsGridView(!isGridView)}
          >
            {isGridView ? (
              <ListViewIcon width={24} height={24} fill="#FFFFFF" />
            ) : (
              <GridViewIcon width={24} height={24} fill="#FFFFFF" />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.coinsContainer}>
          <Text style={styles.coinsAmount}>{myCoins}</Text>
          <Text style={styles.coinsText}>My coins</Text>
        </View>
      </View>

      <View style={styles.content}>
        {isGridView ? (
          <ProductGrid />
        ) : (
          <ProductList />
        )}
      </View>

      {/* Floating button */}
      <Link href="/Minigame" asChild>
        <TouchableOpacity style={styles.fab}>
          <Text style={styles.fabText}>🥚</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#6B4EFF',
    padding: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  myProductsButton: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 8,
  },
  myProductsText: {
    color: '#6B4EFF',
    fontWeight: '500',
  },
  viewToggle: {
    padding: 4,
  },
  coinsContainer: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  coinsAmount: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  coinsText: {
    color: 'white',
    fontSize: 12,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6B4EFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: {
    fontSize: 24,
  },
});