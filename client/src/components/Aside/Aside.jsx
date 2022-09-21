import {
  orderByName,
  orderByRating,
  filterByTypeId,
  getaAllGenres,
  filterByGenre,
} from "./../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./Aside.css";

function Aside({ setPage, setOrder, allvideogame }) {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.allGenre);

  useEffect(() => {
    dispatch(getaAllGenres());
  }, [dispatch]);

  const handleOrderByName = (e) => {
    if (allvideogame === "no game found") return;
    dispatch(orderByName(e.target.value));
    setOrder(`order ${e.target.value}`);
  };

  const handleOrderByRating = (e) => {
    if (allvideogame === "no game found") return;
    dispatch(orderByRating(e.target.value));
    setOrder(`order ${e.target.value}`);
  };

  const hadleFilterByTypeId = (e) => {
    if (allvideogame === "no game found") return;
    dispatch(filterByTypeId(e.target.value));
    setPage(1);
  };

  const handleFilterByGenre = (e) => {
    if (allvideogame === "no game found") return;
    dispatch(filterByGenre(e.target.value));
    setPage(1);
  };

  return (
    <aside className="aside">
      <section>
        <label>Choose a genres: </label>
        <select onChange={(e) => handleFilterByGenre(e)} name="genres">
          <option value="all">All</option>
          {genres.map((e) => {
            return (
              <option value={e} key={e}>
                {e}
              </option>
            );
          })}
        </select>
      </section>
      <section>
        <label>Source: </label>
        <select onChange={(e) => hadleFilterByTypeId(e)}>
          <option value="all">All</option>
          <option value="api">Existing</option>
          <option value="db">Added by users</option>
        </select>
      </section>
      <section>
        <label>Order alphabetically: </label>
        <select onChange={(e) => handleOrderByName(e)}>
          <option value="all">----------</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>
      </section>
      <section>
        <label>Sort by score</label>
        <select onChange={(e) => handleOrderByRating(e)}>
          <option value="all">------------</option>
          <option value="des">Highest score</option>
          <option value="asc">Lowest score</option>
        </select>
      </section>
    </aside>
  );
}

export default Aside;
