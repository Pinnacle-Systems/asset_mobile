import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userName: "",
    UserId: "",
    Role: "",
    GCOMPCODE: '',
    IDCARD: '',
    hod: "",
    approval: "",
    hr: "",
    COMPID: "",
    level: "",
    isAdmin: 0,
};

const UserDetails = createSlice({
    name: 'UserDetails',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            return { ...state, ...action?.payload };
        },
    },
});

export const { setUserDetails } = UserDetails.actions;
export default { UserDetails: UserDetails.reducer };






