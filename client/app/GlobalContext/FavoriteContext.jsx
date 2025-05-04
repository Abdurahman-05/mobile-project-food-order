
import React,{useState,createContext, useContext, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import axios from "axios"


const RecipeFavorite = createContext()

export const useFavorite = () => useContext(RecipeFavorite)

 const FavoriteProvider = ({children}) => {

    const router = useRouter()
    const [product,setProduct] = useState([])
    const [favorite,setFavorite] = useState([])
    const [cart,setCart] = useState([])
    const [error,setError] = useState('')
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [loading,setLoading] = useState(false)

    //useState for sign
    const [username,setUsername] = useState('')
   //  const [lastname,setLastName] = useState('')
    const [email,setEmail] = useState('') 
    const [password,setPassword] = useState('')
    const [account,setAccount] = useState([])

    //useState for signin
    const[emailSignin,setEmailSignin] = useState('')
    const[passwordSignin,setPasswordSignin] = useState('')


    const[name,setName] = useState('')

    // useState for Create Product
    const [foodName,setFoodName] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState(0)
    const [ingredients,setIngredients] = useState("")
    const [image,setImage] = useState(null)

    useEffect(() => {

      axios.get("http://10.240.212.213:5000/api/products")
      .then(res => {
         setProduct(res.data)

      })
      .catch(error => {
         console.log(error);
      })

      //Load Logged use
      const loadLoggedUser = async() => {
         const storedUser = JSON.parse(await AsyncStorage.getItem('user'))
         if(storedUser){
            setIsLoggedIn(storedUser)
         }
      }
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
      loadLoggedUser()
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

    console.log("cart in context",typeof(cart));
    
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
       }else {

        const data = {
         username:username,
         email:email,
         password:password
        }
         
        axios.post("http://10.240.212.213:5000/signup",data)
         .then(res => { 
            alert('User registered successfully')
            setUsername('')
            setEmail('')
            setPassword('')
            
         })
         .catch(error => {
            if (error.response.status === 400) {
               alert(error)
            }else{
               alert('Network error. Please check your connection and try again.');
            }
            setUsername('')
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
         
            
            setLoading(true)
            axios.post("http://10.240.212.213:5000/login",data)
            .then(res => {
               setEmailSignin('')
               setPasswordSignin('') 
               setIsLoggedIn(true)
               AsyncStorage.setItem("user", JSON.stringify(true));
               setLoading(false)
               router.replace("/(tabs)/Home")
            })
            .catch(error => {
               if (error.response.status === 400) {
                  alert("Invalid Credentials! please try again.") 
                  setEmailSignin('')
                  setPasswordSignin('') 
                  setLoading(false)
               }
               else{
                  alert('Network error. Please check your connection and try again.');
                  setEmailSignin('')
                  setPasswordSignin('') 
                  setLoading(false)
               }  
            
            })
         }
      }

      //upload products
      // const pickImage = async () => {
      //    const result = await ImagePicker.launchImageLibraryAsync({
      //      allowsEditing: true,
      //      quality: 1,
      //    });
       
      //    if (!result.canceled) {
      //      setImage(result.assets[0]); 
      //    }
      //  };





      const base64ToBlob = (base64, mimeType) => {
         const byteCharacters = atob(base64.split(",")[1]); // Decode Base64
         const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
         const byteArray = new Uint8Array(byteNumbers);
         return new Blob([byteArray], { type: mimeType });
       };


       const handleSubmit = () => {
         if(name && description && price && ingredients && image){
            const ingredientsArray = ingredients
            .split(",")              
            .map(item => item.trim())  
            .filter(item => item);
            let formData = new FormData();
        
            formData.append("name", foodName);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("ingredients", JSON.stringify(ingredientsArray)); 
        
            if (image) {
               const mimeType = image.uri.match(/data:(.*?);base64/)[1]; 
               const blob = base64ToBlob(image.uri, mimeType);
               formData.append("img", blob, image.fileName || "photo.jpg");
            }
        
            axios.post("http://10.240.212.213:5000/api/product",formData,{headers:{ "Content-Type": "multipart/form-data",}})
            .then(res => {
                console.log(res);
                
            })
            .catch(error => {
               console.log(error);
            })
         }else{
            alert('Please fill all fields')

         }    
       };


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
         username,
         setUsername,
         setPasswordSignin,
         setEmailSignin,
         emailSignin,
         passwordSignin,
         handleSignin,
         product,
         isLoggedIn,
         loading,

         foodName,
         setFoodName,
         description,
         setDescription,
         price,
         setPrice,
         ingredients,
         setIngredients,
         image,
         setImage,
         handleSubmit
      }}>
         {children}
    </RecipeFavorite.Provider>
}

export default FavoriteProvider