import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import Aside from "../../components/Aside/Aside";
import Paginated from "../../components/Paginated/Paginated";
import Loading from "../../components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllVideogame } from "../../redux/actions";
import Error from "../../components/Error/Error";

function Main() {
  const [order, setOrder] = useState("");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const allvideogame = useSelector((state) => state.allVideogame);

  useEffect(() => {
    dispatch(getAllVideogame());
  }, [dispatch]);

  //PAGINATED
  const [page, setPage] = useState(1);
  const videogameByPage = 15;
  const indexOfLastCard = page * videogameByPage;
  const indexOfFirstCard = indexOfLastCard - videogameByPage;
  const currentVideogames = allvideogame.slice(
    indexOfFirstCard,
    indexOfLastCard
  );
  const calculationNumberPage = Math.ceil(
    allvideogame.length / videogameByPage
  );

  const handleNumberPage = (number) => {
    setPage(parseInt(number));
  };
  const goToNextPage = () => {
    if (page < calculationNumberPage) setPage(page + 1);
  };
  const goToPreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };
  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: "0px" });
  }, [page]);

  if (allvideogame.length > 0 && loading) {
    setLoading(false);
  }

  // if (loading) return <Loading />;
  return (
    <section>
      <Header setPage={setPage} />
      {/* <Aside
        setPage={setPage}
        order={order}
        setOrder={setOrder}
        allvideogame={allvideogame}
      />
      <Paginated
        calculationNumberPage={calculationNumberPage}
        handleNumberPage={handleNumberPage}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
      />
      {allvideogame === "no game found" ? (
        <Error />
      ) : (
        <Card currentVideogames={currentVideogames} />
      )}
      <Paginated
        calculationNumberPage={calculationNumberPage}
        handleNumberPage={handleNumberPage}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
      /> */}
    </section>
  );
}

export default Main;
