import { create } from 'zustand';


const useNoteStore = create((set, get) => ({
  // Initialize the store with notes from localStorage if available
  notes: JSON.parse(localStorage.getItem('notes')) || [],
  searchedNotes: JSON.parse(localStorage.getItem('notes')) || [],

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
  editNote: (index, newTitle, newContent, newState, newDate, newImportant) =>
    set((state) => {
      if (index < 0 || index >= state.notes.length) return { error: "یادداشت مورد نظر یافت نشد" };
  
      const updatedNotes = state.notes.map((note, i) =>
        i === index
          ? {
              ...note,
              title: newTitle || note.title,
              content: newContent || note.content,
              state: newState || note.state,
              date: newDate || note.date,
              important: newImportant !== undefined ? newImportant : note.important,
            }
          : note
      );

      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return { notes: updatedNotes };
    }),
  
  deleteNote: (index) =>
    set((state) => {
      const updatedNotes = state.notes.filter((_, i) => i !== index);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
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
  },
  // Search notes
  searchNotes: (query) => {
    const allNotes = get().notes || [];
    if (!query.trim()) {
      set({ searchedNotes:allNotes } )
      }

    const updateSearchedNotes = allNotes.filter((note) => {
      const title = note.title ? note.title : '';
      const content = note.note ? note.note : '';
      return title.includes(query) || content.includes(query);
    });

    set({ searchedNotes:updateSearchedNotes } )

    localStorage.setItem("searchedNotes", JSON.stringify(updateSearchedNotes));
    return updateSearchedNotes;

  },
  // Filter notes
   filterNotes: ( stateFilter, isStarredFilter ) => {
    const allNotes = get().notes || []

    const filteredNotes = allNotes.filter((note) => {
      const matchesState = stateFilter ? note.state === stateFilter : true;
      const matchesStarred = isStarredFilter !== undefined ? note.isStarred === isStarredFilter : true;
      return matchesState && matchesStarred;
    });
    console.log('store filter result', filteredNotes)

    set({ searchedNotes: filteredNotes });
  }




}));

export default useNoteStore;
