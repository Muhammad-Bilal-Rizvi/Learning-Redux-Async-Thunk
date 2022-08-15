import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/*
// In this we got two error
// 1. when we run app on http://localhost:3001/api/updatecounter we got deprecated error 
//    so to avoid this error we run app on 3000 insted 3001...
// 2. when we post the data by "POST Method" we get payload error...
 
export const counterUpdate = createAsyncThunk(
    "counter/counterUpdate",
    async (value, thunkAPI)=>{
                                        //baseURL
        const resposne = await fetch("http://localhost:3001/api/updatecounter",
        {
            method: "post",
            body: {name: "hello"}
        });
        const data = await resposne.json();
        return data;
    }    
);
*/


export const counterUpdate = createAsyncThunk(
    "counter/counterUpdate",
    async (value, thunkAPI) => {

        const response = await fetch("http://localhost:3000/api/updatecounter");
        const data = await response.json();
        return data;
    }
);


export const counterSlice = createSlice({
    name: "Counter",
    initialState : {
        count: 0,
        isLoading: false,
        error: "",
    },
    reducers: {
        increment: (state)=>{
            state.count++
        },
        decrement: (state)=> {
            state.count--;
        },
        incrementByAmount: (state,action)=> {
            state.count+=action.payload
        }
    },
    extraReducers: {
        [counterUpdate.fulfilled]: (state, action)=>{
            state.count+=action.payload;
            state.isLoading = false;
        },
        [counterUpdate.pending]: (state)=>{
            state.isLoading = true;
        },
        [counterUpdate.rejected]: (state,action)=>{
            console.log("rejected ",action);
            state.isLoading =  false;
            state.error = "Error in Update counter";
        },
    }
});

export const { increment, decrement, incrementByAmount} = counterSlice.actions;
export default counterSlice.reducer;