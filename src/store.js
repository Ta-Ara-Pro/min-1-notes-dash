import { create } from 'zustand';


const useNoteStore = create((set) => ({
  // Initialize the store with notes from localStorage if available
  notes: JSON.parse(localStorage.getItem('notes')) || [],

  // Initialize user and token from localStorage
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || '',

  mode: localStorage.getItem("theme") || "light",

  addNote: (note) => {
    set(
      (state) => {
        const updatedNotes = [...state.notes, { ...note }];
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        return { notes: updatedNotes };
      }
    )
  },
  deleteNote: (index) =>
    set((state) => {
      const updatedNotes = state.notes.filter((_, i) => i !== index);
      localStorage.setItem('notes', JSON.stringify(updatedNotes)); // Update localStorage
      return { notes: updatedNotes };
    }),
  // Set user data and token, and persist them in localStorage
  setUser: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    set({ user, token });
  },
  // Logout: 
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: '', notes: [] });
  },
  // theme:
  toggleTheme: () =>
    set((state) => {
      const newMode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme", newMode)
      return { mode: newMode }
    }),
  // ُstaring note
  starNote: (index) => {
    set((state) => {
      const updatedNotes = [...state.notes];
      const note = updatedNotes[index];
      note.isStarred = !note.isStarred; 
      localStorage.setItem('notes', JSON.stringify(updatedNotes)); 
  console.log('starred note', note)

      return { notes: updatedNotes };
    });
  }



}));

export default useNoteStore;
