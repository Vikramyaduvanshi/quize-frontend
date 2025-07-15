import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { api } from "../Util/api";


export let fetchtopics= createAsyncThunk("topics/fetchtopics", async(_,thunkApi )=>{

try{
let res= await api.get("/topics/")
let result=await res.data.topiclist

return result
}catch(e){
return thunkApi.rejectWithValue(e.message)
}
})



let initialState={
    topics:[],
    error:'',
    loading:false
}

let topicsslice= createSlice({
name:'topics',
initialState,

reducers:{},
extraReducers:(builder)=>{
builder
.addCase(fetchtopics.pending, (state)=>{
state.loading=true
})
.addCase(fetchtopics.fulfilled, (state,action)=>{
state.loading=false
state.topics=action.payload

})
.addCase(fetchtopics.rejected, (state, action)=>{
state.loading=false
state.error=action.payload
})
}
})



export default topicsslice.reducer;

