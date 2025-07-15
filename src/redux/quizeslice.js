import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../Util/api";



export let fetchquize= createAsyncThunk("quizes/fetchquize", async (difficulty="easy", thunkApi)=>{

try{
let res= await api.get("/quizes",{params:{difficulty:difficulty}})
console.log(res.data)
return res.data

}catch(e){
return thunkApi.rejectWithValue(e.message)
}

})


let initialState={
    quizes:[],
    error:"",
    loading:false,
    attempQuestions:[]

}


let quizeslice= createSlice({
name: "quizes",
initialState,
reducers:{
setatemptquestion:(state,action)=>{
state.attempQuestions.push(action.payload)
console.log("action payload",action.payload)
}


},
extraReducers:(builder)=>{
builder
.addCase(fetchquize.pending, (state)=>{
state.loading=true

})
.addCase(fetchquize.fulfilled, (state, action)=>{
state.loading=false
state.quizes=action.payload
})
.addCase (fetchquize.rejected, (state,action)=>{
state.loading=false;
state.error=action.payload;
})

}
})


export default quizeslice.reducer;
export let {setatemptquestion}= quizeslice.actions