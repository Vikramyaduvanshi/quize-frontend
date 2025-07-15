import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios"


export let fetchquestion= createAsyncThunk("questions/fetchquestion", async({topic="",page=1, limit=15, difficulty=""}, thunkApi)=>{
try{
let res= await axios.get("http://localhost:3000/questions/allquestions", {params:{topic,page,limit,difficulty,}})

return {data:res.data.data, total:res.data.total}

}catch(e){
return thunkApi.rejectWithValue(e.message)
}
})

let initialState={
    loading:false,
    error:"",
    page:1,
    topic:"",
    difficulty:"",
    limit:15,
    hashmore:true,
    questions:[],
    filteredquestion:[]
}


let questionsslice= createSlice({
    name:"questions",
    initialState,

reducers:{
setpage:(state,action)=>{
state.page=state.page+action.payload
},
settopic:(state,action)=>{
state.topic=action.payload

},
setdifficulty:(state,action)=>{
state.difficulty=action.payload
console.log(action.payload)
},
cleardifficulty:(state,action)=>{
state.difficulty=action.payload
},
clearfiltered:(state)=>{
    state.filteredquestion=[];
}
},
extraReducers:(builder)=>{
builder
.addCase(fetchquestion.pending, (state)=>{
state.loading=true
})
.addCase(fetchquestion.fulfilled, (state,action)=>{
state.loading= false;
if(state.topic || state.difficulty){
    state.filteredquestion= action.payload.data
}
else{
    console.log(action.payload)
for(let v of action.payload.data){
    state.questions.push(v)
}
}
if(state.questions.length>= action.payload.total){
    state.hashmore=false;
}

})
.addCase(fetchquestion.rejected, (state,action)=>{
    state.loading=false,
    state.error=action.payload
})


}


})

export default questionsslice.reducer;
export const {setpage,setdifficulty,settopic, clearfiltered,cleardifficulty}=questionsslice.actions

