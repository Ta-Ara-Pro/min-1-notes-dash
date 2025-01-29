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

const NoteItem = ({ note, onDelete }) => {
  return (
    <Card
      sx={{
        margin: "16px 0",
        boxShadow: 3,
        borderRadius: "25px",
        overflow: "hidden",
        direction: "rtl",
        cursor: 'pointer',
        transition: 'transform 0.3s ease-in-out', 
        '&:hover': { transform: 'scale(1.04)'} 
      }}
    >
      <CardContent
      sx={{
        background:
          note.state === 'archived'
            ? 'rgb(140, 195, 240)'
            : note.state === 'active'
            ? 'rgb(140, 240, 148)'
            : note.state === 'inactive'
            ? 'rgb(240, 140, 140)'
            : 'transparent', 
      borderRadius:'25px',
      border: 
      note.state === 'archived'
      ? '4px solid rgb(140, 195, 240)'
      : note.state === 'active'
      ? '4px solid rgb(140, 240, 148)'
      : note.state === 'inactive'
      ? '4px solid rgb(240, 140, 140)'
      : '4px solid transparent', 
          
       }}
    >
        {/* <Typography
          variant="h6"
          color="primary"
          gutterBottom
          sx={{ textAlign: "right" }}
        >
          مهارت‌های یک توسعه‌دهنده فرانت‌اند
        </Typography> */}
        <TableContainer component={Paper} sx={{borderRadius:'25px',
          border: 
          note.state === 'archived'
          ? '4px solid rgb(140, 195, 240)'
          : note.state === 'active'
          ? '4px solid rgb(140, 240, 148)'
          : note.state === 'inactive'
          ? '4px solid rgb(240, 140, 140)'
          : '4px solid transparent', 
        }}>
          <Table>
            <TableHead>
              <TableRow >
                <TableCell align="right">عنوان</TableCell>
                <TableCell align="right">یادداشت</TableCell>
                <TableCell align="right">وضعیت</TableCell>
                {
                  note.important ?
                    <TableCell align="right">اهمیت</TableCell>
                    : null
                }

                <TableCell align="right">تاریخ اعتبار</TableCell>
                <TableCell align="right">عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="right">{note.title}</TableCell>
                <TableCell align="right" sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "200px",
                }}
                >{note.note}
                </TableCell>
                <TableCell align="right">{note.state}</TableCell>
                {
                  note.important ?
                    <TableCell align="right">مهم</TableCell>
                    : null
                }
                <TableCell align="right">   {new Date(note.date).toLocaleDateString("fa-IR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="text"
                    color="error"
                    onClick={onDelete}
                    sx={{
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    حذف
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default NoteItem;
