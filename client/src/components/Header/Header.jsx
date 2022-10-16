import Nav from "../Nav/Nav";
import "./Header.css";
import { Link } from "react-router-dom";
function Header({ setPage }) {
  // const refreshPage = () => {
  //   window.location.reload();
  // };
  return (
    <header className="header">
      <section className="grid-container">
        {/* <button onClick={refreshPage} className="grid-item header-btn">
          HENRY GAMES
        </button> */}
        <div className="grid-item">
          <Nav setPage={setPage} />
        </div>
        {/* <Link to={"/create"} className="grid-item">
          <button className="header-btn">CREATE VIDEOGAME</button>
        </Link> */}
      </section>
    </header>
  );
}
export default Header;
