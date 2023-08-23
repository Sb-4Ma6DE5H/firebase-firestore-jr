import React, { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/Auth';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { auth, db } from './config/firebase';

function App() {

  const movicsCollectionRef = collection(db, "movie");

  const [movieList, setMovieList] = useState([]);
  // New Movie
  const [newMovieTitle, setNewMovieTitle] = useState("")
  const [newReleseDate, setNewReleseDate] = useState(0)
  const [isNewMovieOacar, setIsNewMovieOacar] = useState(false)
  // Update Movie Title
  const [updatedTitle, setUpdatedTitle] = useState()



  const onSUbmintMovie = async () => {
    try {
      await addDoc(movicsCollectionRef, { title: newMovieTitle, releaseDate: newReleseDate, receivedAnOscar: isNewMovieOacar});
    } catch (err) {
      console.error(err);
    }
  }

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await deleteDoc(movieDoc);
  }

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await updateDoc(movieDoc, { title: updatedTitle });
  }

  useEffect(() => {
    const getMovieList = async () => {
      // READ THE DATA
      // SET THE MOVICE LIST

      try {
        const data = await getDocs(movicsCollectionRef)
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id, }))
        // console.log(data);
        // console.log(filteredData);
        setMovieList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getMovieList();
  }, [onSUbmintMovie]);






  return (
    <div className="App">
      <Auth />
      <br /><br />
      <div>
        <input type="text" placeholder='Movie Title' onChange={(e) => setNewMovieTitle(e.target.value)} /><br /><br />
        <input type="number" placeholder='release Date' onChange={(e) => setNewReleseDate(Number(e.target.value))} /><br /><br />
        <label htmlFor="receive and Oscar">Receive and Oscar</label>
        <input type="checkbox" checked={isNewMovieOacar} onChange={(e) => setIsNewMovieOacar(Boolean(e.target.checked))} /><br /><br />
        <button onClick={onSUbmintMovie}>Submit Movie</button>
      </div>


      <hr />
      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>{movie.title}</h1>
            <input onChange={(e) => setUpdatedTitle(e.target.value)} type="text" placeholder='New Title' />
            <button onClick={() => updateMovieTitle(movie.id)}>Update</button>
            <h2>date : {movie.releaseDate}</h2>
            <h1>this movie released?{movie.receivedAnOscar ? <span style={{ color: movie.receivedAnOscar ? "green" : "red" }}> true</span> : " false"}</h1>
            <button onClick={() => deleteMovie(movie.id)} style={{ color: 'red' }}>delete this movie</button>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
