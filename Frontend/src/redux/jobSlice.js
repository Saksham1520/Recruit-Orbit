import { createSlice } from "@reduxjs/toolkit";
import { setSearchCompanyByText } from "./companySlice";


const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        adminAllJobs: [],
        singleJob: null,
        searchJobByText: "",
        searchedQuery: "",
        radioFilter: ""
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload
        },
        setAdminAllJobs: (state, action) => {
            state.adminAllJobs = action.payload
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload
        },
        setRadioFilter: (state, action) => {
            state.radioFilter = action.payload
        }
    }
})

export const {
    setAllJobs,
    setSingleJob,
    setAdminAllJobs,
    setSearchJobByText,
    setSearchedQuery,
    setRadioFilter } = jobSlice.actions;
export default jobSlice.reducer;