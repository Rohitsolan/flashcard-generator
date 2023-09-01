import { configureStore } from "@reduxjs/toolkit";
import flashcardSlice from "./flashcardSlice";

const store = configureStore({
  reducer: {
    flashcard: flashcardSlice
  }
});

export default store;
