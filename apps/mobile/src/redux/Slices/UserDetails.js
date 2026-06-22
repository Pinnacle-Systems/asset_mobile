import { createSlice } from '@reduxjs/toolkit';


const initialState_options={
    header:true
}
const initialState = {
    userName:"",UserId:"",Role:"", 
        GCOMPCODE: '',
        IDCARD: '',
        EMPNAME: '',
        MUSER: 'admin',
        LEAAPP: 0,
        ONDUTYAPP: 0,
        ADVAPP: 0,
        PERAPP: 0,
        LEAVEAVI: 0,
        ADVBAL: '',
        ADVBAL1: 0,
        DUEAMT: 0,
        PENDAMT: 0,
        INTIME: null,
        OUTTIME: null,
        MOBATT: null,
        MISPDET: 0,
        CONTACTNO:"",
        PAYCAT:"",
        hod:"",
        fcm:"",
        level:"",
        isAdmin:0,
        isLoading:false,
        error:""
      
};

const UserDetails = createSlice({
    name: 'UserDetails',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            return {...state,...action?.payload}
        },
        setClearAll: (state, action) => {
            return initialState
        }
    },
});




const Options = createSlice({
    name: 'Options',
    initialState: initialState_options,
    reducers: {
        setOptions: (state, action) => {
            return {...state,...action?.payload}
        },
      
    },
});

export const { setUserDetails,setClearAll } = UserDetails.actions;
export const { setOptions } = Options.actions;
export default {Options:Options.reducer,UserDetails : UserDetails.reducer}






