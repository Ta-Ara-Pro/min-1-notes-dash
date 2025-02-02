import React, { useEffect, useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogActions,
  useTheme,
  IconButton,
} from "@mui/material";
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from "react-router-dom";

const NoteItem = ({ index, note, onDelete, onStar, onClick, isSmallScreen }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isStarred, setIsStarred] = useState(note.isStarred || false);
  const navigate = useNavigate()
  const { palette } = useTheme();

  useEffect(() => {
    setIsStarred(note.isStarred);
  }, [note.isStarred]);


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
      <CardContent
        sx={{

          borderRadius: '12px',


        }}
      >

        <TableContainer component={Paper} sx={{
          borderRadius: '25px',
          border:
            note.state === 'آرشیو شده'
              ? '2px solid rgb(192, 173, 255)'
              : note.state === 'فعال'
                ? '2px solid rgb(174, 230, 214)'
                : note.state === 'غیرفعال'
                  ? '2px solid rgb(240, 140, 140)'
                  : '2px solid transparent',
        }}
        >
          <Table>
            <TableHead>
              <TableRow ><TableCell align="right" ></TableCell>
                <TableCell align="right">عنوان</TableCell>
                <TableCell align="right">یادداشت</TableCell>
                <TableCell align="right">وضعیت</TableCell>
                {
                  note.important ?
                    <TableCell align="right">اهمیت</TableCell>
                    : null
                }

                <TableCell align="right">تاریخ اعتبار</TableCell>
                <TableCell align="right" >عملیات</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow >
                <TableCell align="right" >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize={isSmallScreen ? "0.65rem" : "0.775rem"}
                    // backgroundColor={palette.background.paper}
                    backgroundColor={palette.text.light}
                    borderRadius='50px'
                    display='inline-flex'
                  >
                    <IconButton onClick={onStar} >
                      {isStarred ? <StarIcon sx={{ fontSize: 24 }} /> : <StarOutlineOutlinedIcon sx={{ fontSize: 24 }} />}
                    </IconButton>
                  </Typography>
                </TableCell>
                <TableCell align="right" >{note.title}</TableCell>
                <TableCell align="right" sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "200px",
                }}
                >{note.note}
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant={isSmallScreen ? "body1" : "h6"}
                    sx={{
                      display: "inline-block",
                      width: "auto",
                      padding: "8px 10px",
                      color: 'grayText',
                      borderRadius: "12px",
                      fontSize: isSmallScreen ? "0.65rem" : "0.9rem",
                      background:
                        note.state === 'آرشیو شده'
                          ? 'rgb(226, 219, 250)'
                          : note.state === 'فعال'
                            ? 'rgb(212, 247, 237)'
                            : note.state === 'غیرفعال'
                              ? 'rgb(255,202,202)'
                              : 'transparent',
                    }}
                  >
                    {note.state}
                  </Typography></TableCell>
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
                <TableCell align="right" sx={{ display: 'flex', justifyContent: 'start', gap: 2 }}>
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => setOpenDeleteDialog(true)}
                    sx={{
                      display: "inline-block",
                      width: "auto",
                      padding: "8px 10px",
                      color: palette.Button.redBgColor,
                      borderRadius: "12px",
                      background: 'rgb(250, 151, 151)',
                      fontSize: isSmallScreen ? "0.65rem" : "0.9rem",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    حذف
                  </Button>
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => navigate(`?tab=edit/${index}`)}
                    sx={{
                      display: "inline-block",
                      width: "auto",
                      padding: "8px 10px",
                      color: palette.Button.blueBgColor,
                      borderRadius: "12px",
                      background: palette.Button.blue,
                      fontSize: isSmallScreen ? "0.65rem" : "0.9rem",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    اصلاح
                  </Button>
                  <Button
                    variant="text"
                    color="error"
                    onClick={onClick}
                    sx={{
                      display: "inline-block",
                      width: "auto",
                      padding: "8px 10px",
                      color: palette.Button.blueBgColor,
                      borderRadius: "12px",
                      background: 'rgb(211, 202, 238)',
                      fontSize: isSmallScreen ? "0.65rem" : "0.9rem",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    مشاهده
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        sx={{ direction: 'rtl' }}
      >
        <DialogTitle>آیا از پاک کردن این یادداشت اطمینان دارید؟</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} >
            انصراف
          </Button>
          <Button onClick={() => deleteNote} color="error">
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default NoteItem;
