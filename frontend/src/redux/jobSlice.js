import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [], // Stores all jobs fetched from the server
        allAdminJobs: [], // Stores jobs created by the admin
        singleJob: null, // Stores a single job detail
        searchJobByText: "", // Stores the job search term
        allAppliedJobs: [], // Stores jobs the user has applied to
        searchedQuery: "", // Stores the query used to search for jobs
    },
    reducers: {
        // Set all jobs fetched from the backend
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        // Set a single job's data
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        // Set all jobs created by the admin
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        // Set search term for jobs, triggered by user input
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        // Set all jobs the user has applied for
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        // Set search query for filtering jobs based on keyword
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        // Reset state for a fresh start or when clearing search
        resetJobSearch: (state) => {
            state.searchedQuery = "";
            state.searchJobByText = "";
            state.allJobs = [];
        }
    }
});

export const {
    setAllJobs, 
    setSingleJob, 
    setAllAdminJobs, 
    setSearchJobByText, 
    setAllAppliedJobs, 
    setSearchedQuery, 
    resetJobSearch // Export reset function
} = jobSlice.actions;

export default jobSlice.reducer;
