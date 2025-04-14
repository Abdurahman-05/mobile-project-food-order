import { View, Text,SafeAreaView,StyleSheet,Image, TouchableOpacity} from "react-native";
import React from "react";
import { Colors } from "@/app-example/constants/Colors";
import { useRouter,useNavigation } from "expo-router";
export default function Profile() {

    const router = useRouter()
    const navigation = useNavigation()
  return (
    <View style={{flex:1}}>
      <SafeAreaView style={styles.safeArea}>
           <TouchableOpacity>
              <Text style={styles.headerText} onPress={() => navigation.goBack()}>Cancel</Text>
           </TouchableOpacity>
      </SafeAreaView>

      <View style={{alignItems:'center'}}>
        <View style={{borderWidth:1,width:190,height:190,borderRadius:100,padding:4,borderColor:Colors.lightGray,marginVertical:40,alignItems:'center',justifyContent:'center'}}>
           <Image style={styles.profileImage} source={require('../assets/profiles/pic.jpg')}/>
        </View>
         <View style={{width:'60%'}}>
            <View style={{borderBottomWidth:1,borderBottomColor:Colors.lightGray,paddingBottom:14,marginBottom:17}}>
                <Text style={{fontFamily:'outfit',fontSize:14,color:'rgb(166, 166, 166)'}}>Name:</Text>
                <Text style={{fontFamily:'outfit',fontSize:19,color:"#595959"}}>Dawit Tiruneh</Text>
            </View>
            <View style={{borderBottomWidth:1,borderBottomColor:Colors.lightGray,paddingBottom:14,marginBottom:17}}>
                <Text style={{fontFamily:'outfit',fontSize:14,color:"rgb(166, 166, 166)"}}>Password:</Text>
                <Text style={{fontFamily:'roboto-bold',fontSize:19,color:"#595959"}}>••••••••••</Text>
            </View>
            <View style={{borderBottomWidth:1,borderBottomColor:Colors.lightGray,paddingBottom:14,marginBottom:17}}>
                <Text style={{fontFamily:'outfit',fontSize:14,color:"rgb(166, 166, 166)"}}>Phone:</Text>
                <Text style={{fontFamily:'outfit',fontSize:19,color:"#595959"}}>099758489</Text>
            </View>
            <View style={{borderBottomWidth:1,borderBottomColor:Colors.lightGray,paddingBottom:14,marginBottom:17}}>
                <Text style={{fontFamily:'outfit',fontSize:14,color:"rgb(166, 166, 166)"}}>Email:</Text>
                <Text style={{fontFamily:'outfit',fontSize:19,color:"#595959"}}>Dawit@gmail.com</Text>
            </View>
         </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    safeArea:{
       flexDirection:'row',
       justifyContent:'space-between',
       paddingHorizontal:20,
       paddingVertical:5,
       borderBottomWidth:1,
       borderBottomColor:Colors.lightGray,
       paddingBottom:13
    },
    header:{

    },
    headerText:{
     fontFamily:'outfit',
     fontSize:14
    },
    profileImage:{
        width:170,
        height:170,
        borderRadius:120,
    }
  });
