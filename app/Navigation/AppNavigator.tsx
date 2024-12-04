import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../index';
import InventoryScreen from '../MyProduct';
import ProductDetailScreen from '../ProductDetail';

const Stack = createStackNavigator();

export function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerTitle: 'Storegg' }}
      />
      <Stack.Screen 
        name="Inventory" 
        component={InventoryScreen} 
        options={{ headerTitle: 'My Products' }}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen} 
        options={{ headerTitle: 'Product Details' }}
      />
    </Stack.Navigator>
  );
}