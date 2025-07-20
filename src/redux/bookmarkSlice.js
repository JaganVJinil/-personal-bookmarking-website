import { createSlice } from '@reduxjs/toolkit';

const getBookmarks = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) return [];
  const all = JSON.parse(localStorage.getItem('bookmarks')) || {};
  return all[currentUser.username] || [];
};

const saveBookmarks = (bookmarks) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) return;
  const all = JSON.parse(localStorage.getItem('bookmarks')) || {};
  all[currentUser.username] = bookmarks;
  localStorage.setItem('bookmarks', JSON.stringify(all));
};

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState: {
    items: getBookmarks(),
  },
  reducers: {
    addBookmark(state, action) {
      if (state.items.length >= 5) {
        alert("Maximum 5 bookmarks allowed.");
        return;
      }
      state.items.push(action.payload);
      saveBookmarks(state.items);
    },
    deleteBookmark(state, action) {
      state.items = state.items.filter(b => b.id !== action.payload);
      saveBookmarks(state.items);
    },
    updateBookmark(state, action) {
      const index = state.items.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        saveBookmarks(state.items);
      }
    },
    loadBookmarks(state) {
      state.items = getBookmarks();
    },
  },
});

export const { addBookmark, deleteBookmark, updateBookmark, loadBookmarks } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
