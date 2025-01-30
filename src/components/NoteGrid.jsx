import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Card, CardContent, useMediaQuery, useTheme, IconButton, Dialog, DialogTitle, DialogActions } from "@mui/material";
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import StarIcon from '@mui/icons-material/Star';
const NoteGrid = ({ note, deleteNote, onStar }) => {
  const theme = useTheme();
  const [isStarred, setIsStarred] = useState(note.isStarred || false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  useEffect(() => {
    setIsStarred(note.isStarred);
  }, [note.isStarred]);

  return (
    <Card
      sx={{
        display: 'block',
        maxWidth: '300px',
        margin: "16px 12px",
        boxShadow: 3,
        borderRadius: "12px",
        overflow: "hidden",
        direction: "rtl",
        cursor: "pointer",
        transition: "transform 0.3s ease-in-out",
        "&:hover": { transform: "scale(1.04)" },
      }}
    >
      <CardContent>
        {/* Upper Part */}
        <div style={{
          background:
            note.state === 'active'
              ? ' rgb(212, 247, 237)'
              : note.state === 'inactive'
                ? ' rgb(251, 226, 243)'
                : note.state === 'archived'
                  ? ' rgb(226, 219, 250)'
                  : ' transparent',
          padding: isSmallScreen ? "12px" : "16px",
          borderRadius: "12px"
        }}>


          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={isSmallScreen ? 1 : 2}
            flexWrap="wrap"


          >
            <Typography
              variant={isSmallScreen ? "body1" : "h6"}
              fontWeight="bold"
              backgroundColor='white'
              padding='2px 8px'
              borderRadius='12px'
              fontSize={isSmallScreen ? "0.65rem" : "0.9rem"}
            >
              {new Date(note.date).toLocaleDateString("fa-IR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              fontSize={isSmallScreen ? "0.65rem" : "0.775rem"}
              backgroundColor='white'
              borderRadius='50%'
            >
              <IconButton onClick={onStar} >
                {isStarred ? <StarIcon sx={{ fontSize: 20 }} /> : <StarOutlineOutlinedIcon sx={{ fontSize: 20 }} />}
              </IconButton>

            </Typography>
          </Box>

          {/* Main Content */}
          <Box mb={isSmallScreen ? 1 : 2}>
            <Typography
              variant="caption"
              fontWeight="bold"
              color="text.secondary"
              fontSize={isSmallScreen ? "0.8rem" : "1rem"}
            >
              {note.title}
            </Typography>
            <Typography
              variant="body1"
              mt={1}
              fontSize={isSmallScreen ? "0.875rem" : "1rem"}
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              overflow="hidden"
            >
              {note.note}
            </Typography>
          </Box>
          <Typography
              variant={isSmallScreen ? "body1" : "h6"}
              sx={{
                display: "inline-block", 
                width: "auto",
                padding: "2px 8px",
                border: "1px solid gray",
                color:'grayText',
                borderRadius: "25px",
                fontSize: isSmallScreen ? "0.65rem" : "0.9rem",
              }}
            >
              {note.state}
            </Typography>
        </div>

        {/* Bottom Part */}
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="text"
            color="white"
            // onClick={deleteNote}
            sx={{
              fontSize: isSmallScreen ? "0.75rem" : "0.8rem",
              background:'rgb(240, 113, 113)',
              borderRadius:'20px',
              margin:'10px 0px'
            }}
            onClick={() => setOpenDeleteDialog(true)}
          >
            حذف
          </Button>
        </Box>
      </CardContent>
       {/* Delete Confirmation Dialog */}
       <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        sx={{padding:'2rem',
          direction:'rtl'
        }}
        
      >
        <DialogTitle>آیا از پاک کردن این یادداشت اطمینان دارید؟</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} >
            انصراف
          </Button>
          <Button onClick={() => deleteNote } color="error">
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default NoteGrid;
