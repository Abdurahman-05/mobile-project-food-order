import { View, Text,StyleSheet, TouchableOpacity,TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import {  Platform } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

const TabBar = ({  state, descriptors, navigation }) => {

  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();
  return (
    <View style={styles.tabbar}>
    {state.routes.map((route, index) => {
      const { options } = descriptors[route.key];
      const label =
        options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
            ? options.title
            : route.name;

      const isFocused = state.index === index;

      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name, route.params);
        }
      };

      const onLongPress = () => {
        navigation.emit({
          type: 'tabLongPress',
          target: route.key,
        });
      };

        // Define icons for each route (Favorite, Order, and Home)
        let iconName;
        if (route.name === 'Favorite') {
          iconName = isFocused ? 'favorite' : 'favorite-border'; // Favorite tab
        } else if (route.name === 'Orders') {
          iconName = isFocused ? 'shopping-cart' : 'shopping-cart'; // Order tab (same icon for focused and unfocused)
        } else if (route.name === 'Home') {
          iconName = isFocused ? 'home' : 'home'; // Home tab
        }

      return (
        <TouchableOpacity
         key={route.name}
          href={buildHref(route.name, route.params)}
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarButtonTestID}
          onPress={onPress}
          onLongPress={onLongPress}
          style={{ flex: 1,flexDirection:'column',alignItems:'center'}}
        >
             <MaterialIcons
                name={iconName}
                size={24}
                color={isFocused ? "#FFD700" : colors.text}
              />
          <Text style={{ color: isFocused ? "#FFD700" : colors.text,fontSize:12,fontFamily:'roboto-bold' }}>
            {label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
  )
}

export default TabBar

const styles = StyleSheet.create({
  tabbar: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginHorizontal:10,
    paddingVertical:10,
    position:'absolute',
    bottom:10,
    backgroundColor:'#fff',
    borderRadius:30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10, 
    },
    shadowOpacity: 0.25,
    shadowRadius: 10, 
    elevation: 5,
  },
})