import { create } from 'zustand';


const useNoteStore = create((set) => ({
  // Initialize the store with notes from localStorage if available
  notes: JSON.parse(localStorage.getItem('notes')) || [],

  // Initialize user and token from localStorage
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || '',

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

}));

export default useNoteStore;
