import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
    getGalleries: () => {},
    getGallery: () => {},
    createGallery: () => {},
    editGallery: () => {},
    deleteGallery: () => {},
};

const galleriesSlice = createSlice({
    name: "galleries",
    initialState: {
        gallery: null ,
        term: null,
        userId: null,
        page: {
            data: [],
            current_page: 0,
            last_page: 0,
    },
},
    reducers: {
        setGalleries: (state, action) => {
            state.page = action.payload;
        },
        setGallery: (state, action) => {
            state.gallery = action.payload;
        },
        setSearchTerm(state, action){
            state.term = action.payload;
        },
        setSearchUserId(state, action){
            state.userId = action.payload;
        },
        setPaginatedGalleries(state, action){
            state.page.data = [...state.page.data, ...action.payload.data];
            state.page.current_page = action.payload.current_page;
        },
        setGalleriesWithNewGallery(state, action){
            state.page.data = [...state.page.data, action.payload];
        },

        ...middlewareActions
    }
});

export const { getGalleries, getGallery, setGalleries, setGallery, createGallery, editGallery, deleteGallery, 
    setSearchTerm, setSearchUserId, setPaginatedGalleries, setGalleriesWithNewGallery
} = galleriesSlice.actions;
export default galleriesSlice.reducer;