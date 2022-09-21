import { Link } from "react-router-dom";
import "./Page404.css";

function Page404() {
  return (
    <section className="error-container">
      <h2 className="error-title">The URL is not valid</h2>
      <Link to="/home">
        <button className="btn">Home</button>
      </Link>
    </section>
  );
}
export default Page404;
