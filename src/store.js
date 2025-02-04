import { create } from 'zustand';


const useNoteStore = create((set, get) => ({
  // Initialize the store with notes from localStorage if available
  notes: JSON.parse(localStorage.getItem('notes')) || [],
  searchedNotes: [],
  // searchedNotes: JSON.parse(localStorage.getItem('notes')) || [],

  // Initialize user and token from localStorage
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || '',

  mode: localStorage.getItem("theme") || "light",

  addNote: (note) => {
    set(
      (state) => {
        const updatedNotes = [...state.notes, { ...note }];
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        return {
          notes: updatedNotes,
          searchedNotes: updatedNotes,
        };
      }
    )
  },
  editNote: (index, data) =>
    set((state) => {
      if (index < 0 || index >= state.notes.length) return { error: "یادداشت مورد نظر یافت نشد" };

      const updatedNotes = state.notes.map((note, i) =>
        i === index
          ? {
            ...note,
            title: data.title || note.title,
            note: data.note || note.note,
            state: data.state || note.state,
            date: data.date || note.date,
            important: data.important !== undefined ? data.important : note.important,
          }
          : note
      );
      console.log('updated notes ', updatedNotes)

      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return {
        notes: updatedNotes,
        searchedNotes: updatedNotes,
      };
    }),

  deleteNote: (index) =>
    set((state) => {
      const updatedNotes = state.notes.filter((_, i) => i !== index);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      return {
        notes: updatedNotes,
        searchedNotes: updatedNotes,
      };
    }),
  // Set user data and token, and persist them in localStorage
  setUser: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    set({ user, token });
  },
  // Edit user credentials
  editUser: (username, password) => {
    set((state) => {
      const user = state.user;
      const updatedUser = {
        ...user,
        username: username || user.username,
        password: password || user.password || ''
      }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      return {
        user: updatedUser
      }
    })
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

      return {
        notes: updatedNotes,
        searchedNotes: updatedNotes,
      };
    });
  },
  // Search notes
  searchNotes: (query) => {
    const allNotes = get().notes || [];
    if (!query.trim()) {
      set({ notes: allNotes })
    }
    const updateSearchedNotes = allNotes.filter((note) => {
      const title = note.title ? note.title : '';
      const content = note.note ? note.note : '';
      return title.includes(query) || content.includes(query);
    });

    set({ searchedNotes: updateSearchedNotes })

    localStorage.setItem("searchedNotes", JSON.stringify(updateSearchedNotes));
    return updateSearchedNotes;

  },
  // Filter notes
  filterNotes: (stateFilter) => {
    const allNotes = get().notes || []

    const filteredNotes = allNotes.filter((note) => {
      if (typeof stateFilter === "boolean") {
        // If stateFilter is a boolean, filter based on isStarred
        return note.isStarred === stateFilter;
      } else if (typeof stateFilter === "string") {
        // If stateFilter is a string, filter based on note.state
        return note.state === stateFilter;
      }
      return true; // If stateFilter is undefined or another type, return all notes
    });


    set({ searchedNotes: filteredNotes });
  }




}));

export default useNoteStore;
