import { View, Text, Image, StyleSheet, TextInput, Dimensions, ScrollView, TouchableWithoutFeedback,Pressable } from "react-native";
import React, { useState } from "react";
import SampleProduct from "../../data/Products";
import Header from "../Header";
import RecipeItem from "../RecipeItem";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FlatList } from "react-native";
import { Colors } from "@/app-example/constants/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFavorite } from "../GlobalContext/FavoriteContext";
var {width,height} = Dimensions.get('window')


export default function Home() {

  const {product} = useFavorite()
  const navigation = useNavigation()
 

  const handleSearch = (event) => {
     setSearch(event.target.value)
  }

  

  
  return (
    <>
    
      <ScrollView showsVerticalScrollIndicator={false}  style={{flex:1,backgroundColor:"white"}}>
        <Header />
        <View style={{ paddingHorizontal: 20, marginTop: 14 }}>
          <View style={styles.inputContainer}>
            <Icon name="search" size={30} color="gray" />
            <TextInput onChange={handleSearch} style={styles.textInput} placeholder="Search.." />
          </View>
        </View>

        <View
          style={{ flexDirection: "row", marginTop: 23,width:width }}
        >
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            data={SampleProduct}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.imageWrapper}
            renderItem={({ item }) => (
              <View style={{position:'relative'}}>
                  <Image style={styles.slideImage} source={item.image} />
                    <View style={{backgroundColor:'linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.9))',position:'absolute',width:width*0.86,height:'100%',borderRadius:30,display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
                      <Text style={{fontFamily:'outfit',fontSize:20,color:'white',marginBottom:0}}>{item.title}</Text>
                      <Text style={{color:'white',marginBottom:10,textAlign:'center',fontFamily:'outfit',fontSize:12,width:'80%'}}>{item.detail.slice(0,80)+'...'}</Text>
                    </View>
              </View>
            )}
          />
        </View>


        <View style={{marginTop:20,paddingBottom:100}}>
          <Text style={{fontSize:27,textAlign:'center',marginBottom:10,fontWeight:'bold'}}>Feature Product</Text>
          <View style={{flex:1, flexDirection:'row',flexWrap:'wrap',justifyContent:'center',gap:10}}>
          {
               product && product?.length > 0  ?
               product.map((item) => (
                 <RecipeItem key={item.id} item={item} />
                )) : <View style={{justifyContent:'center',alignItems:'center',height:height*0.3}}>
                       <Text style={{fontSize:17,textAlign:'center',marginTop:20}}>No Product Found</Text>
                    </View>
            }
          </View>
        </View>

      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: Colors.lightGray,
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 15,
    paddingVertical: 4,
  },
  textInput: {},
  container: {
    display: "flex",
    flexDirection: "row",
    marginTop: 30,
  },
  contentStyle: {
    justifyContent: "center",
    alignItems: "center",
  },

  slideImage: {
    width: width*0.86,
    height: 200,
    resizeMode: "cover",
    borderRadius: 30,
    marginRight:15
  },

  imageWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft:10
  },


});
