import { useDispatch } from "react-redux";
import { useState } from "react";
import { searchVideogame } from "../../redux/actions";
import "./Nav.css";

function Nav({ setPage }) {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length <= 0) return;
    if (!name) return;
    dispatch(searchVideogame(name));
    setPage(1);
    setName("");
  };

  return (
    <nav className="nav">
      <input
        type="text"
        placeholder="Find your game"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="nav-input-text"
      />
      <input
        type="submit"
        value="search"
        onClick={(e) => handleSubmit(e)}
        className="nav-input-submit"
      />
    </nav>
  );
}
export default Nav;
