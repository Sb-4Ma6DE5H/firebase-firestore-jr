import React, { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/Auth';
import { getDocs, collection } from "firebase/firestore"
import { db } from './config/firebase';

function App() {

  const [movieList, setMovieList] = useState([]);

  const movicsCollectionRef = collection(db, "movies");

  useEffect(() => {
    const getMovieList = async () => {

      try {
        const data = await getDocs(movicsCollectionRef)
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id, }))
        // console.log(data);
        console.log(filteredData);
      } catch (err) {
        console.error(err);
      }
    }
    getMovieList();

  }, []);


  return (
    <div className="App">
      <Auth />
    </div>
  );
}

export default App;
