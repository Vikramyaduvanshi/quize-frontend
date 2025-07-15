import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../Util/api';

export const fetchUser = createAsyncThunk(
  "users/fetchUsers",
  async ({ page = 1, limit = 5, email = "" }, thunkApi) => {
    try {
      let res = await api.get("/Users/totalUsers", {
        params: { page, email, limit }
      });
      return { users: res.data.TotalUser, total: res.data.noOfUser };
    } catch (e) {
      return thunkApi.rejectWithValue(e.response?.data?.message || e.message);
    }
  }
);

let initialState = {
  users: [],
  loading: false,
  error: false,
  page: 1,
  email: "",
  hasmore: true, 
  limit: 6,
  filteredUser:[]
};

let userslice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setpage: (state, action) => {
      state.page = action.payload + state.page;
    },
    setemail: (state, action) => {
      state.email = action.payload;
    },
    
    setFilteredUsers:(state,action)=>{
state.filteredUser=action.payload
    },
    clearFilteredUsers:(state,action)=>{
state.filteredUser=[];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        if(action.payload.users.length<5 && state.email){
          state.filteredUser = action.payload.users
        }else{
          state.users = [...state.users, ...action.payload.users];
        }
        
        if (state.users.length >= action.payload.total) {
          state.hasmore = false; 
        }
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userslice.reducer;
export const { setemail, setpage,setFilteredUsers,clearFilteredUsers } = userslice.actions;
