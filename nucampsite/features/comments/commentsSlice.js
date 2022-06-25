import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async () => {
        const response = await fetch(baseUrl + 'comments');
        return response.json();
    }
);

export const postComment = createAsyncThunk(
    'comments/postComment',
    async (payload, { dispatch, getState }) => {
        setTimeout(() => {
            const { comments } = getState();
            payload.date = new Date();
            payload.id = comments.commentsArray.length;
        }, 2000);
    }
)

const commentsSlice = createSlice({
    name: 'comments',
    initialState: { isLoading: true, errMess: null, commentsArray: [] },

    reducers: {
        addComment: (state, action) => {
            if (state.includes(action.payload)) {
                return state.filter(
                    (state) => state !== action.payload
                );
            } else {
                state.push(state.payload);
            }
        }
    },
    extraReducers: {
        [fetchComments.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMess = null;
            state.commentsArray = action.payload;
        },
        [fetchComments.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMess = action.error ? action.error.message : 'Fetch failed';
        }
    }
});

export const commentsReducer = commentsSlice.reducer;
export const { addComment } = commentsSlice.actions;