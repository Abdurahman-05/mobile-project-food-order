import React,{useState,createContext, useContext, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
const RecipeFavorite = createContext()

export const useFavorite = () => useContext(RecipeFavorite)

 const FavoriteProvider = ({children}) => {

    const route = useRouter()
    const [favorite,setFavorite] = useState([])
    const [cart,setCart] = useState([])
    const [error,setError] = useState('')

    //useState for sign
    const [username,setUsername] = useState('')
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
       if(!username || !email || !password) {
         alert('Please fill all fields')
       }else if(!emailRegex.test(email)) {
         alert('Please enter a valid email')
       }else if(password.length < 6) {
         alert('Password must be at least 6 characters')
       }else if(authUsername(username)){
         alert('Username already exists')
       }else if(authEmail(email)){
         alert('Email already in use')
       }else {
         const updatedAccount = [...account, {"username":username,"email":email,"password":password}]
         setAccount(updatedAccount)
         await AsyncStorage.setItem('account',JSON.stringify(updatedAccount))
         setUsername('')
         setEmail('')
         setPassword('')
         alert('Signup successful')
       } 
      }

      const authUsername = (username) => {
         let is_Exist = false
          account.map((item) => {
                if(item.username === username){
                   is_Exist = true
                }
          })
          return is_Exist
      }

      const authEmail = (email) => {
         let is_Exist = false
          account.map((item) => {
                if(item.email === email){
                   is_Exist = true
                }
          })
          return is_Exist
      }


      //function to handle signin
      const handleSignin = async () => {
         if(!emailSignin || !passwordSignin) {
            alert('Please fill all fields')
         }else if(!auth(emailSignin,passwordSignin)){
            alert('Invalid Credintials')
         }else {
            setEmailSignin('')
            setPasswordSignin('')

            account.forEach((item) => {
               if(item.password === passwordSignin && item.email === emailSignin){
                  setName(item.username)
               }
            })
            console.log(name);
            
            await AsyncStorage.setItem("name", JSON.stringify(name));
            route.push('/(tabs)/Home')
         }
      }

      const auth = (email,password) => {
         let is_Exist = false
          account.map((item) => {
                if(item.email === email && item.password === password){
                   is_Exist = true
                }
          })
          return is_Exist
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
         setUsername,
         setEmail,
         setPassword,
         handleSignup,
         email,
         password,
         username,
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