import { useMediaQuery, useTheme } from "@mui/material";
import NoteItem from "./NoteItem";
import NoteGrid from "./NoteGrid";
import useNoteStore from "../store";
import { useNavigate } from "react-router-dom";

const NoteList = ({ notes,searchedNotes, deleteNote, isMobileScreen, isSmallScreen, viewMode }) => {
  const { palette } = useTheme()
  const { starNote } = useNoteStore();
  const navigate = useNavigate()
  const isLess600 = useMediaQuery("(max-width: 600px)")

  // Passing note id through tab search prams instead of routing
  // ===========================================================
  const viewNote = (index) => {
    navigate(`/?tab=view/${index}`)
  }
  // Passing note id through tab search prams instead of routing
  // ===========================================================
  const editNote = (index) => {
    navigate(`/?tab=edit/${index}`)
  }

  return (
    <div
      style={{
        display: viewMode !== 'row' && 'flex', 
        flexWrap: viewMode !== 'row' && 'wrap', 
        justifyContent: 'center',
        alignItems: 'stretch', 
        maxWidth: '100%', 
        margin: 'auto', 

        padding: isMobileScreen ? '5px 8px' : '10px 50px',
        background: palette.primary.light,
        borderRadius: '25px',
        maxHeight: '700px', overflowY: 'auto',
        direction: 'rtl'
      }}
    >
    {(searchedNotes && searchedNotes.length > 0) ? (
  searchedNotes.map((note, index) => (
    viewMode === "row" ? (
      <NoteItem
        key={index}
        index={index}
        note={note}
        onDelete={() => deleteNote(index)}
        onStar={() => starNote(index)}
        onClick={() => viewNote(index)}
        onEdit={() => editNote(index)}
      />
    ) : (
      <NoteGrid
        key={index}
        index={index}
        note={note}
        onDelete={() => deleteNote(index)}
        onStar={() => starNote(index)}
        isSmallScreen={isSmallScreen}
        onClick={() => viewNote(index)}
        onEdit={() => editNote(index)}
      />
    )
  ))
) : (
  notes.length > 0 ? (
    notes.map((note, index) => (
      viewMode === "row" ? (
        <NoteItem
          key={index}
          index={index}
          note={note}
          onDelete={() => deleteNote(index)}
          onStar={() => starNote(index)}
          onClick={() => viewNote(index)}
          onEdit={() => editNote(index)}
        />
      ) : (
        <NoteGrid
          key={index}
          index={index}
          note={note}
          onDelete={() => deleteNote(index)}
          onStar={() => starNote(index)}
          isSmallScreen={isSmallScreen}
          onClick={() => viewNote(index)}
          onEdit={() => editNote(index)}
        />
      )
    ))
  ) : (
    <p style={{ direction: "rtl" }}>هنوز یادداشتی وجود ندارد!</p>
  )
)}

    </div>
  );
};

export default NoteList;
