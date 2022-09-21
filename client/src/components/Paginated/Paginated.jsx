import "./Paginated.css";

function Paginated({
  calculationNumberPage,
  handleNumberPage,
  goToNextPage,
  goToPreviousPage,
}) {
  const numberPage = [];

  for (let i = 1; i <= calculationNumberPage; i++) {
    numberPage.push(i);
  }

  return (
    <section className="paginated">
      <button onClick={goToPreviousPage}>Previous</button>

      {numberPage.map((nro) => (
        <button
          key={nro}
          value={nro}
          onClick={(e) => handleNumberPage(e.target.value)}
        >
          {" "}
          {nro}{" "}
        </button>
      ))}

      <button onClick={goToNextPage}>Next</button>
    </section>
  );
}

export default Paginated;
