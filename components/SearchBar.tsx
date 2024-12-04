import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import SearchIcon from '../app/SearchIcon';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar = ({ value, onChangeText }: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <SearchIcon width={20} height={20} fill="#666666" />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Search Product.."
        placeholderTextColor="#666666"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },
});

export default SearchBar;