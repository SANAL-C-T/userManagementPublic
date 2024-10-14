import React from 'react'
import {addcounter,substractcounter} from '../features/LoginSlice'
import { useDispatch, useSelector } from "react-redux";


 const Counter = () => {
  const counts=useSelector((state)=>state.FromStoreLogin.count)
const dispatch=useDispatch()

  const handleIncrement=()=>{
      dispatch(addcounter())
  }


  const handledecrement=()=>{
    dispatch(substractcounter())
}

  return (
    <div>
        <h1>counter:{counts}</h1>
        <button onClick={handleIncrement} >INCREMENT</button>
        <button onClick={handledecrement}>DECREMENT</button>
    </div>
  )
}
export default Counter




import React from 'react';
import { addcounter, substractcounter } from '../features/LoginSlice';
import { useDispatch, useSelector } from "react-redux";

const Counter = () => {
  const dispatch = useDispatch();
  const counts = useSelector((state) => state.count);

  const handleIncrement = () => {
    dispatch(addcounter());
  };

  const handleDecrement = () => {
    dispatch(substractcounter());
  };

  return (
    <div>
      <h1>Counter: {counts}</h1>
      <button onClick={handleIncrement}>INCREMENT</button>
      <br></br>
      <button onClick={handleDecrement}>DECREMENT</button>
    </div>
  );
};

export default Counter;









