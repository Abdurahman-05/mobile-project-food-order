import React,{useState,createContext, useContext, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import axios from "axios"

const RecipeFavorite = createContext()

export const useFavorite = () => useContext(RecipeFavorite)

 const FavoriteProvider = ({children}) => {

    const router = useRouter()
    const [favorite,setFavorite] = useState([])
    const [cart,setCart] = useState([])
    const [error,setError] = useState('')

    //useState for sign
    const [firstname,setFirstName] = useState('')
    const [lastname,setLastName] = useState('')
    const [email,setEmail] = useState('') 
    const [password,setPassword] = useState('')
    const [account,setAccount] = useState([])

    //useState for signin
    const[emailSignin,setEmailSignin] = useState('')
    const[passwordSignin,setPasswordSignin] = useState('')


    const[name,setName] = useState('')

    useEffect(() => {

      const laodName = async() => {
         const storedName = await AsyncStorage.getItem('name')
         if(storedName){
            setName(JSON.parse(storedName))
         }
      }
      const loadFavorites = async() => {
         const storedFavorite = await AsyncStorage.getItem('favorites')
         if(storedFavorite){
            setFavorite(JSON.parse(storedFavorite))
         }
      }

      const loadCart = async() => {
         const storedCart = await AsyncStorage.getItem('cart')
         if(storedCart){
            setCart(JSON.parse(storedCart))
         }
      }

      const loadAccount = async() => {
         const storedAccount = await AsyncStorage.getItem('account')
         if(storedAccount){
            setAccount(JSON.parse(storedAccount))
         }
      }


      loadFavorites()
      loadCart()
      loadAccount()
      laodName()
    },[])


      const addToFavorite = async (item) => {
            const updatedFavorites = [...favorite, item];
            setFavorite(updatedFavorites)
            await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      }

      const removeFromFavorite = async (recipeId) => {
         const updatedFavorites = favorite.filter(item => item.id !== recipeId)
         setFavorite(updatedFavorites)
         await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      }

      const isFavorite = (recipeId) => {
         return favorite.some(fav => fav.id === recipeId)
      }

      const addToCart = async (item) => {
         const updatedCart = [...cart, item];
         setCart(updatedCart)
         await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    const removeFromCart = async (recipeId) => {
      const updatedCart = cart.filter(item => item.id !== recipeId)
      setCart(updatedCart)
      await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
   }

   const isInTheCart = (recipeId) => {
      return cart.some(c => c.id === recipeId)
   }

   //function to handle signup
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

     const handleSignup = async () => {
       if(!firstname || !email || !password || !lastname) {
         alert('Please fill all fields')
       }else if(!emailRegex.test(email)) {
         alert('Please enter a valid email')
       }else if(password.length < 6) {
         alert('Password must be at least 6 characters')
       }else {

        const data = {
         firstname:firstname,
         lastname:lastname,
         email:email,
         password:password
        }
         
        axios.post("http://localhost:8000/signup",data)
         .then(res => {
            console.log(res.data); 
            alert('User registered successfully')
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
            
         })
         .catch(error => {
            if (error.response) {
               if (error.response.status === 409) {
                  alert('Email is already registered! Try another one.');
               }else if(error.response.status === 500){
                  alert('Server error during registration.')
               }
            }else{
               alert('Network error. Please check your connection and try again.');
            }
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
            
         })
       } 
      }



      //function to handle signin
      const handleSignin = async () => {
         if(!emailSignin || !passwordSignin) {
            alert('Please fill all fields')
         }else if(!emailRegex.test(emailSignin)) {
            alert('Please enter a valid email')
        } else {
               const data = {
               email:emailSignin,
               password:passwordSignin
            } 
            
            axios.post("http://localhost:8000/signin",data)
            .then(res => {

               
               setEmailSignin('')
               setPasswordSignin('') 
               router.replace("/(tabs)/Home")

            })
            .catch(error => {
               if (error.response) {
                  if(error.response.status === 400){
                     alert("Invalid Password! Please try again.")
                  }else if(error.response.status === 404){
                     alert("User not found! Please try again.")
                  }
               }else{
                  alert('Network error. Please check your connection and try again.');
               }  
               setEmailSignin('')
               setPasswordSignin('') 
            })
         }
      }


    return <RecipeFavorite.Provider value={{
         addToFavorite,
         favorite,
         removeFromFavorite,
         isFavorite,
         addToCart,
         removeFromCart,
         isInTheCart,
         cart,
         setEmail,
         setPassword,
         handleSignup,
         email,
         password,
         firstname,
         lastname,
         setFirstName,
         setLastName,
         setPasswordSignin,
         setEmailSignin,
         emailSignin,
         passwordSignin,
         handleSignin,
         name,
         setName
      }}>
         {children}
    </RecipeFavorite.Provider>
}

export default FavoriteProvider