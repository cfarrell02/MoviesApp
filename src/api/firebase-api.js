import { db } from "../firebase-config";
import {collection, getDocs, addDoc, updateDoc, doc} from 'firebase/firestore'

const favouriteCollectionRef = collection(db,'favourites')
export const getFavourites =  async (email) => {
   // const favouriteCollectionRef = collection(db,'favourites')
    const data = await getDocs(favouriteCollectionRef);
    return data.docs.map((doc) => ({...doc.data(), id: doc.id})).find((obj) => obj.userEmail === email)
  }

  export const addNewFavourites = async (email) =>{
    await addDoc(favouriteCollectionRef, {userEmail:email,movies:[],shows:[]})
}

export const updateUserMovieFavourites = async (email,movies) =>{
    const obj = await getFavourites(email)
    const favouriteDoc = doc(db,"favourites",obj.id);
    await updateDoc(favouriteDoc, {movies:movies});
}

 export const updateUserShowFavourites = async (email,shows) =>{
     const obj = await getFavourites(email)
     const favouriteDoc = doc(db,"favourites",obj.id);
     await updateDoc(favouriteDoc, {shows:shows});
 }