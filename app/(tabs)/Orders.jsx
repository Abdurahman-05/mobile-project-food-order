import { View, Text, StyleSheet, TouchableOpacity,Image, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useFavorite } from "../GlobalContext/FavoriteContext";
import { useNavigation, useRouter } from "expo-router";

const Orders = () => {

  const{cart,removeFromCart} = useFavorite()

  const navigation = useNavigation()
  const route = useRouter()


  return (
    <ScrollView style={{flex:1,backgroundColor:"white"}}>
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={35} color="#595959" />
        </TouchableOpacity>
      </SafeAreaView>
      <View style={{justifyContent:'center',margin:20}}>
            <Text style={{color:'black',fontFamily:'outfit',fontSize:40,textAlign:'center'}}>Your <Text style={{color:"#FFD700"}}>Orders</Text> </Text>
      </View>

       <View style={{paddingHorizontal:15,marginTop:14}}>
            {
              cart && cart.length ? 
                cart.map(cart => (
                  <View key={cart.id} style={styles.orderItem}>
                    <View style={{flexDirection:'row',gap:12,alignItems:'center'}}>
                      <Image style={styles.orderImage} source={cart.image} />
                      <View>
                          <Text style={{fontFamily:'roboto-bold',fontSize:16,color:'black',marginBottom:2}}>{cart.title.length>16 ? cart.title.slice(0,16)+'...' : cart.title}</Text>
                          <Text style={{fontFamily:'outfit',color:'gray'}}>$12</Text>
                      </View>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => removeFromCart(cart.id)}>
                            <Text style={{fontFamily:'outfit',fontSize:15,color:'red'}}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                 </View>
                ))
              : <View style={{height:300,justifyContent:'center',alignItems:'center'}}>
                 <Image style={{width:"90%",height:250,marginTop:50}} source={require('../../assets/out-of-order.jpg')} />
                 <TouchableOpacity style={{backgroundColor:"#FFD700",paddingHorizontal:15,paddingVertical:5,borderRadius:3}} onPress={() => route.push("/Home")} >
                    <Text style={{fontFamily:'outfit',color:"white"}}>See Recipe</Text>
                 </TouchableOpacity>
              </View>
            }
       </View>
    </ScrollView>
  );
};

export default Orders;

const styles = StyleSheet.create({
    safeArea: {
        paddingHorizontal: 10,
        alignItems:'flex-start',
        marginTop: 3,
      },
      backArrow: {
         borderRadius:10
      },
      orderItem:{
        borderWidth:1,
        borderColor:"#cccccc",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderRadius:10,
        paddingHorizontal:12,
        paddingVertical:6,
        marginBottom:15
      },
      orderImage:{
        width:90,
        height:90,
        borderRadius:50
      }
});
