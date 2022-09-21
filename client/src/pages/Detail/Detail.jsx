import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail, cleanData } from "../../redux/actions";
import "./Detail.css";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loading/Loading";

function Detail() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    setLoading(true);
    return dispatch(cleanData());
  }, [dispatch]);

  if (Object.keys(detail).length > 0 && loading) {
    setLoading(false);
  }
  if (loading) return <Loading />;
  return (
    <section className="detail">
      {detail.error ? (
        <Error />
      ) : (
        <div className="detail-container">
          <h2 className="detail-title">{detail.name}</h2>
          <img
            src={detail.background_image}
            alt="detail"
            className="detail-img"
          />
          <div className="detail-description">
            <h4>Description</h4>
            <p>
              {detail.description && detail.description.replace(/<[^>]+>/g, "")}
            </p>
          </div>
          <div className="detail-platforms-genres">
            <ul>
              Plataforms:
              {detail.platforms &&
                detail.platforms.map((e) => <li key={e}>- {e} </li>)}
            </ul>
            <ul>
              Genres:
              {detail.genres &&
                detail.genres.map((e) => <li key={e}> - {e} </li>)}
            </ul>
          </div>

          <div className="detail-released-rating">
            <p>Released: {detail.released}</p>
            <p>Rating: {detail.rating}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Detail;
