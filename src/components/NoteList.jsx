import { useMediaQuery, useTheme } from "@mui/material";
import NoteItem from "./NoteItem";
import NoteGrid from "./NoteGrid";
import useNoteStore from "../store";

const NoteList = ({ notes, deleteNote, isMobileScreen, isSmallScreen, viewMode }) => {
  const { palette } = useTheme()
  const { starNote } = useNoteStore();
  const isLess600 = useMediaQuery("(max-width: 600px)")
  return (
    <div
      style={{
        display: viewMode !== 'row' && 'flex', 
        flexWrap: viewMode !== 'row' && 'wrap', 
        // marginLeft:  viewMode !== 'row' && isLess600 ? '0.1rem' :'1rem',
        justifyContent: 'center',
        alignItems: 'stretch', // Stretch items to equal height
        maxWidth: '100%', // Allow responsiveness
        margin: 'auto', // Center the card

        padding: isMobileScreen ? '5px 8px' : '10px 50px',
        background: palette.primary.light,
        borderRadius: '25px',
        maxHeight: '600px', overflowY: 'auto',
        direction: 'rtl'
      }}
    >
      {notes.length > 0 ? (
        notes.map((note, index) => (
          viewMode === 'row' ?
            <NoteItem
              key={index}
              note={note}
              onDelete={() => deleteNote(index)}
              onStar={() => starNote(index)}
            />
            :
            <NoteGrid
              key={index}
              note={note}
              onDelete={() => deleteNote(index)}
              onStar={() => starNote(index)}
              isSmallScreen={isSmallScreen}
            />

        ))
      ) : (
        <p style={{ direction: 'rtl' }}>هنوز یادداشتی وجود ندارد!</p>
      )}
    </div>
  );
};

export default NoteList;
