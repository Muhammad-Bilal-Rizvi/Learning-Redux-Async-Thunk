import React from 'react';
import { useSelector } from 'react-redux'

function CounterDisplay() {
    const {counter , isLoading} = useSelector( (state)=> {
//      console.log(state);
        return {
            counter: state.counter.count,
            isLoading: state.counter.isLoading
        }

    });

    if(isLoading) return <div>Loading....</div>

    return(
        <div>
            Counter: {counter}
        </div>
    );
}
export default CounterDisplay;