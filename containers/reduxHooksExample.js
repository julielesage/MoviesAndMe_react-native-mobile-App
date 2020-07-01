import React from "react";

// before with Class :
// import {connect} from 'react-redux';
// then :
// const mapStateToProps = (state) => {
//   return {
//     favoriteFilms: state.favoriteFilms,
//   };
// };
// then
// export default connect(mapStateToProps)(BidulContainer);

/*********** NOW ***********/
import { useSelector, useDispatch } from "react-redux";

const BidulContainer = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);

  //attention fichier react et non react-native
  return (
    <div className="app">
      <header className="app-header" />
      <h1>Counter : {counter}</h1>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>DECREMENT</button>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>INCREMENT</button>
    </div>
  );
};

export default BidulContainer;
