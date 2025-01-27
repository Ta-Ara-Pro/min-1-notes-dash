import NoteItem from "./NoteItem";

const NoteList = ({ notes, deleteNote }) => {
  console.log('note list', notes)
  return (
    <div className="p-4">
      {notes.length > 0 ? (
        notes.map((note, index) => (
          <NoteItem
            key={index}
            note={note}
            onDelete={() => deleteNote(index)}
          />
        ))
      ) : (
        <p className="text-gray-500">هنوز یادداشتی وجود ندارد!</p>
      )}
    </div>
  );
};

export default NoteList;
