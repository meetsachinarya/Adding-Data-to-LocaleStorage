import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [movie, setMovie] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  console.log("movie", movie);

  useEffect(() => {
    if (searchTerm.trim() === "") return;
    const fetchingData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${searchTerm}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTQ1N2Y5YjQ5MmU3ZmEzOWI1YjM0NDg4ZDgwZjFkNyIsIm5iZiI6MTcxOTgzMDI5Mi44NzY3NDEsInN1YiI6IjY2ODI4NjczNzg5Y2JmZjE5MTE2NTk5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.__E3OJxus_3trjva8tYP648fphjE1fLwgzV2TYuFteQ",
            },
          }
        );
        const data = await res.json();
        console.log("data", data);

        const customUpdates =
          JSON.parse(localStorage.getItem("customUpdates")) || [];
        console.log("customUpdates:", customUpdates);

        const allMovies = [...data.results, ...customUpdates];
        setMovie(allMovies);
      } catch (error) {
        console.log("error in fetching data", error);
      }
    };
    fetchingData();
  }, [searchTerm]);

  const handleAddMovie = () => {
    if (searchTerm.trim() === "") return;

    const newMovie = { title: searchTerm, id: movie.length + 1 };
    const updatedMovie = [...movie, newMovie];
    setMovie(updatedMovie);
    const customUpdates =
      JSON.parse(localStorage.getItem("customUpdates")) || [];
    localStorage.setItem(
      "customUpdates",
      JSON.stringify([...customUpdates, newMovie])
    );
  };
  const handleRemoveitemFromLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <div className="App">
      <h1>Start serching Your movie Name</h1>
      <h2>Start editing to see some magic happen!</h2>
      <h2>length-{movie.length}</h2>
      <input
        className="searchBar"
        type="text"
        placeholder="type here to search movie"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {movie
          .filter((movie) => {
            return searchTerm.trim().toLocaleLowerCase() === ""
              ? ""
              : movie.title
                  .toLocaleLowerCase()
                  .includes(searchTerm.toLocaleLowerCase());
          })
          .map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        <button className="btn" onClick={handleAddMovie}>
          Add Movie{searchTerm}
        </button>
        <button className="btn" onClick={handleRemoveitemFromLocalStorage}>
          Remove
        </button>
      </ul>
    </div>
  );
}
