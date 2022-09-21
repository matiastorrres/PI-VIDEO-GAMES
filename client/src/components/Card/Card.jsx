import { Link } from "react-router-dom";
import "./Card.css";
import Error from "../Error/Error";

function Card({ currentVideogames }) {
  return (
    <section className="cards">
      <div className="cards-container">
        {currentVideogames.length > 0 ? (
          currentVideogames.map((e) => {
            return (
              <div key={e.id} className="card">
                <Link to={`/detail/${e.id}`}>
                  <h3 className="card-title">{e.name}</h3>
                  <img
                    src={e.background_image}
                    alt="img"
                    className="card-img"
                  />
                </Link>
                <div className="card-footer">
                  <div className="card-genres">
                    Genres:
                    {e.genres.map((e) => (
                      <span key={e}> -{e} </span>
                    ))}
                  </div>
                  <div className="card-rating">
                    <span>Rating: {e.rating ? e.rating : "-"}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <Error />
        )}
      </div>
    </section>
  );
}
export default Card;
