import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <section className="landingPage">
      <article className="hero-image">
        <aside className="hero-image-opacity">
          <div className="hero-image-content">
            <h1 className="hero-image-title">
              welcome <br /> to my games
            </h1>
            <Link to="/home">
              <button className="btn">let's Play</button>
            </Link>
          </div>
        </aside>
      </article>
    </section>
  );
}

export default LandingPage;
