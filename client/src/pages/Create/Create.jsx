import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlatform,
  getaAllGenres,
  getAllVideogame,
} from "../../redux/actions";
import { Link, useHistory } from "react-router-dom";
import "./Create.css";
import Loading from "../../components/Loading/Loading";

function Create() {
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    background_image: "",
    rating: "",
    genres: [],
    platforms: [],
  });
  const [errors, setErrors] = useState({});
  const [repeat, setRepeat] = useState(false);

  const allPlatform = useSelector((state) => state.allPlatform);
  const allGenre = useSelector((state) => state.allGenre);
  const allVideogame = useSelector((state) => state.allVideogame);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getPlatform());
    dispatch(getaAllGenres());
    dispatch(getAllVideogame());
  }, [dispatch]);

  function handleChange(e) {
    setInput((input) => ({ ...input, [e.target.name]: e.target.value }));
  }
  function validateName(value) {
    const string = /^[a-zA-Z0-9-()-: .]+$/;
    if (
      !string.test(value) ||
      !value ||
      value.length > 255 ||
      value.trim().length <= 0
    )
      setErrors({
        ...errors,
        name: "This field is required",
      });
    else setErrors({ ...errors, name: false });
  }
  function handleRepeat(value) {
    const repeat = allVideogame.filter((e) => e.name === value);
    if (repeat.length > 0) setRepeat("Existing name");
    else setRepeat(false);
  }
  function validateDescription(value) {
    const string = /^[a-zA-Z0-9-()-: .]+$/;
    if (!string.test(value) || !value || value.trim().length <= 0)
      setErrors({
        ...errors,
        description: "This field is required",
      });
    else setErrors({ ...errors, description: false });
  }

  function validateReleased(value) {
    const validate =
      /^\d{4}([-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/;
    let year = parseInt(String(value).substring(0, 4));
    let month = parseInt(String(value).substring(5, 7));
    let day = parseInt(String(value).substring(8, 10));
    let dateEntered = new Date(year, month, day + 1);
    let maxDate = new Date();
    let minDate = new Date(1952, 1, 1);
    if (dateEntered > maxDate || dateEntered < minDate || !validate.test(value))
      setErrors({
        ...errors,
        released:
          "The date to enter must be less than the current and greater than the year 1952",
      });
    else setErrors({ ...errors, released: false });
  }
  function validateRating(value) {
    const validar = /^\d*(\.\d{1})?\d{0,1}$/;
    console.log(value.length);
    if (value > 5 || value < 0 || !validar.test(value) || value.length > 4)
      setErrors({
        ...errors,
        rating:
          "It must be greater than 0 and less than 5, it can contain two decimals separated by a point from the integer part",
      });
    else setErrors({ ...errors, rating: false });
  }
  function validateImagen(value) {
    const img = /(https?:\/\/.*\.(?:png|jpg))/;
    if (value && !img.test(value))
      setErrors({
        ...errors,
        background_image: "The value entered does not correspond to a url",
      });
    else setErrors({ ...errors, background_image: false });
  }
  function genreCheck(e) {
    if (!e.target.checked)
      setInput((input) => {
        return {
          ...input,
          genres: input.genres.filter((el) => el !== e.target.value),
        };
      });
    if (e.target.checked)
      setInput((input) => {
        return { ...input, genres: [...input.genres, e.target.value] };
      });
  }
  function platformCheck(e) {
    if (!e.target.checked)
      setInput((input) => {
        return {
          ...input,
          platforms: input.platforms.filter((el) => el !== e.target.value),
        };
      });
    if (e.target.checked)
      setInput((input) => {
        return { ...input, platforms: [...input.platforms, e.target.value] };
      });
  }

  const handlepost = async (e) => {
    e.preventDefault();
    console.log("aca", input);
    if (errors.name || errors.description || errors.released || errors.rating)
      return alert("Solutions the errors");
    const post = {
      name: input.name,
      description: input.name,
      genres: input.genres,
      platforms: input.platforms,
    };
    if (input.rating) post.rating = input.rating;
    if (input.released) post.released = input.released;
    if (input.background_image) post.background_image = input.background_image;
    console.log(post);
    await fetch("http://localhost:3001/videogame/", {
      method: "POST",
      body: JSON.stringify(post),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    setInput({
      name: "",
      description: "",
      released: "",
      background_image: "",
      rating: "",
      genres: [],
      platforms: [],
    });
    alert("The game was created successfully");
    history.push("/home");
  };

  if (allPlatform.length > 0 && loading) {
    setLoading(false);
  }
  if (loading) return <Loading />;

  return (
    <section>
      <form onSubmit={handlepost} className="form-container">
        <div className="form-name">
          <label>Videogame name: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => {
              handleChange(e);
              validateName(e.target.value);
              handleRepeat(e.target.value);
            }}
          />
          {errors.name ? <p className="form-error">{errors.name}</p> : null}
          {repeat ? <p className="form-error">{repeat}</p> : null}
        </div>
        <div className="form-description">
          <label className="">Description: </label>
          <textarea
            name="description"
            value={input.description}
            onChange={(e) => handleChange(e)}
            onBlur={(e) => validateDescription(e.target.value)}
          />
          {errors.description ? (
            <p className="form-error"> {errors.description} </p>
          ) : null}
        </div>
        <div className="form-date">
          <label className="">Release date: </label>
          <input
            type="date"
            name="released"
            value={input.released}
            onChange={(e) => {
              handleChange(e);
              validateReleased(e.target.value);
            }}
          />
          {errors.released ? (
            <p className="form-error"> {errors.released} </p>
          ) : null}
        </div>
        <div className="form-rating">
          <label className="">Rating: </label>
          <input
            type="number"
            name="rating"
            value={input.rating}
            onChange={(e) => {
              handleChange(e);
              validateRating(e.target.value);
            }}
          />
          {errors.rating ? <p className="form-error">{errors.rating}</p> : null}
        </div>
        <div className="form-img">
          <label className="">Image URL: </label>
          <input
            type="url"
            value={input.background_image}
            name="background_image"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => validateImagen(e.target.value)}
          />
          {errors.background_image ? (
            <p className="form-error">{errors.background_image}</p>
          ) : null}
        </div>
        <div className="form-genres">
          <h4>Select genres</h4>
          {allGenre.map((e) => (
            <div>
              <input
                type="checkbox"
                key={e}
                value={e}
                onChange={(e) => {
                  genreCheck(e);
                }}
              />
              <label key={e}>{e}</label>
            </div>
          ))}
          {errors.genres ? <p className="form-error">{errors.genres}</p> : null}
        </div>
        <div className="form-platform">
          <h4>Select the platforms</h4>
          {allPlatform.map((e) => (
            <div>
              <input
                type="checkbox"
                key={e}
                value={e}
                onChange={(e) => {
                  platformCheck(e);
                }}
              />
              <label key={e}> {e}</label>
            </div>
          ))}
        </div>
        <input
          className="form-btn"
          type="submit"
          value="MAKE"
          disabled={
            !input.name ||
            !input.genres.length ||
            !input.platforms.length ||
            repeat ||
            !input.description
          }
        />
      </form>
    </section>
  );
}

export default Create;
