import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
const NoteGrid = ({ notes, deleteNote }) => {
  console.log('note list', notes)
  return (
    <Card
      sx={{
        margin: "16px 0",
        boxShadow: 3,
        borderRadius: "12px",
        overflow: "hidden",
        direction: "rtl",
        cursor: 'pointer',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': { transform: 'scale(1.04)' }
      }}
    >
      <CardContent>

        <Button
          variant="text"
          color="error"
          // onClick={onDelete}
          sx={{
            "&:hover": { textDecoration: "underline" },
          }}
        >
          حذف
        </Button>
      </CardContent>
    </Card>
  );
};

export default NoteGrid;