import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flashcards: localStorage.getItem("flashcards")
    ? JSON.parse(localStorage.getItem("flashcards"))
    : []
};

const updateLocalStorage = (arr) => {
  localStorage.setItem("flashcards", JSON.stringify(arr));
};

const flashcardlice = createSlice({
  name: "flashcard",
  initialState,
  reducers: {
    addFlashcard: (state, action) => {
      state.flashcards.push({
        card: action.payload
      });
      updateLocalStorage(state.flashcards);
    },
    deleteFlashCard: (state, action) => {
      //delete flashcard from store and localstorage
      const fcard = state.flashcards.filter((ele) => {
        if (
          ele.card.group_id === action.payload.group_id &&
          ele.card.group_name === action.payload.group_name
        ) {
          return ele.card.group_name !== action.payload.group_name;
        }
        return ele;
      });
      return { ...state, flashcards: fcard };
    },

    //update the state of localstorage
    updateState: (state, action) => {
      updateLocalStorage(state.flashcards);
    }
  }
});

export const { addFlashcard, deleteFlashCard, updateState } =
  flashcardlice.actions;
export default flashcardlice.reducer;
