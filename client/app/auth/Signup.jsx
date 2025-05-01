import { View, Text,StyleSheet, TextInput, TouchableOpacity,Image, Pressable, ImageBackground } from 'react-native';
import React,{useState} from 'react';
import { Colors } from "@/app-example/constants/Colors";
import { useRouter } from "expo-router";
import { Feather } from '@expo/vector-icons'
import Icon from "react-native-vector-icons/MaterialIcons";
import { useFavorite } from '../GlobalContext/FavoriteContext';



const Signup = () => {

  const router = useRouter()

  const {handleSignup,setEmail,setPassword,setFirstName,setLastName,firstname,lastname, email,password} = useFavorite()
  const [showPassword,setShowPassword] = useState(false)

  return (
    <ImageBackground
     source={require('../../assets/images/bg-hero.jpg')}
     style={{flex:1,justifyContent:'center'}}
    >
        <View style={{backgroundColor:'rgba(0,0,0,0.5)',flex:1,alignItems:'center',justifyContent:'center',paddingTop:40}}>
          <Text style={styles.signupText}>Signup</Text>
          <Text style={{marginBottom:29,fontSize:13}}>Create your account</Text>
          <TextInput onChangeText={(text) => setFirstName(text.toLowerCase())} value={firstname} style={styles.textInput} placeholder='First Name' placeholderTextColor={Colors.lightGray} autoCapitalize="none" />
          <TextInput onChangeText={(text) => setLastName(text.toLowerCase())} value={lastname} style={styles.textInput} placeholder='Last Name' placeholderTextColor={Colors.lightGray} autoCapitalize="none" />
          <TextInput onChangeText={(text) => setEmail(text)} value={email} style={styles.textInput} placeholder='Email' placeholderTextColor={Colors.lightGray} />
          <View style={{flexDirection:'row',position:'relative'}}>
             <TextInput onChangeText={(text) => setPassword(text)} value={password} style={styles.textInput} secureTextEntry={ showPassword ? false : true } placeholder='Password' placeholderTextColor={Colors.lightGray} />
             <Icon style={{position:'absolute',right:15,top:15}} name={showPassword ? "visibility" : "visibility-off"}  size={24} color="gray" onPress={() => setShowPassword(prev => !prev)} />
          </View>
          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={{textAlign:'center',color:'white',fontFamily:'outfit',letterSpacing:1}}>Create Account</Text>
          </TouchableOpacity>
          <View style={{display:'flex',alignItems:'center',flexDirection:'row',gap:5,marginTop:10,width:'85%'}}>
            <Text style={{fontFamily:'outfit-Regular',fontSize:14,color:'white'}}>You already have an account?</Text>
            <Pressable onPress={() => router.push('/auth/Signin')}>
              <Text style={{color:"#ffcc00",fontFamily:'roboto-bold',letterSpacing:0.4}}>Sign in</Text>
            </Pressable>
          </View>


          <View style={{position:'absolute',top:10,left:10}}>
            <Pressable onPress={() => router.push('/')}>
              <Icon name="chevron-left" size={35} color="white" />
            </Pressable>
          </View>

        </View>
    </ImageBackground>
  )
}

export default Signup

const styles = StyleSheet.create({
    signupText: {
        textAlign:'center',
        fontSize:40,
        fontFamily:'outfit',
        marginBottom:5,
        color:"white"

    },
    textInput: {
        fontSize:14,
        borderWidth:1,
        paddingVertical:15,
        paddingHorizontal:5,
        width:'85%',
        borderRadius:4,
        marginBottom:18,
        borderColor: "#ccc",
        color:'white',
    },
    signupButton:{
      backgroundColor:"#FFD700",
      width:'85%',
      paddingVertical:15,
      borderRadius:4
    }
})