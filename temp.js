{
  squareValues.map((value, idx) => (
    <Square
      key={idx}
      content={value}
      onSquareClick={() => handleSquareClick(idx)}
    />
  ));
}
