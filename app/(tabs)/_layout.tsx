import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import TabBar from '../../components/TabBar'
const _layout = () => {
  return (
    <Tabs screenOptions={{headerShown:false}} 
     tabBar={props => <TabBar {...props} />}
    >
      <Tabs.Screen name="home" options={{ title: "ga"}} />
      <Tabs.Screen name="favorite" options={{ title: "Favorite" }} />
      <Tabs.Screen name="orders" options={{ title: "Order" }} />
    </Tabs>
  );
};

export default _layout;
