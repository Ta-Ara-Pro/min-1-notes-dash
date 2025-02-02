import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useLocation } from "react-router-dom";
import useNoteStore from "../store";

const ViewNote = ({isNonMobileScreens}) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const tab = searchParams.get("tab");
  const [index, setIndex] = useState(null);

  useEffect(() => {
    if (tab?.startsWith("view/")) {
      const id = Number(tab.split("view/")[1]);
      setIndex(id);
    }
  }, [tab]);

  const { notes } = useNoteStore();
  const note = notes[index];
  const { palette } = useTheme();

  if (!note) return <Typography align="right">یادداشت پیدا نشد</Typography>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        alignItems: "center",
        padding: !isNonMobileScreens ? "1rem" : "1rem 5rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: palette.primary.main,
        direction: "rtl",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
          padding: isSmallScreen ? "1.5rem 1rem" : "1.5rem 2rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: palette.primary.light,
          width: "100%",
          marginTop: "1rem",
          color: palette.text.primary,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          یادداشت
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: "center",
            padding: "0.5rem",
            backgroundColor: palette.primary.light,
            width: "100%",
            marginTop: "1rem",
            color: palette.text.primary,
          }}>
          <Typography variant="body1">{note.title}</Typography>
          <Box sx={{
            display: "flex", fontSize: '1.5rem', alignItems: 'center'
          }}>
            <DatePicker
              value={note.date}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              disabled
              style={{ border: "none", background: "transparent", width: '75px' }}
            />
            <CalendarMonthIcon />
          </Box>
        </Box>

        <Divider sx={{ width: '100%' }} />

        <Typography
          variant="body2"
          sx={{ padding: "2rem", backgroundColor: " #ddd", borderRadius: "5px", width: '80%' }}
        >
          {note.note}
        </Typography>

        <Divider sx={{ width: '50%' }} />

        <Box sx={{ display: 'flex',gap:'5px' }}>
            <Typography
              variant={isSmallScreen ? "body1" : "h6"}
              sx={{
                display: "inline-block",
                width: "auto",
                padding: "2px 8px",
                border: "1px solid gray",
                color: 'grayText',
                borderRadius: "25px",
                fontSize: isSmallScreen ? "0.65rem" : "0.9rem",
                background:
                  note.state === 'فعال'
                    ? ' rgb(212, 247, 237)'
                    : note.state === 'غیرفعال'
                      ? palette.Button.red
                      : note.state === 'آرشیو شده'
                        ? ' rgb(226, 219, 250)'
                        : ' transparent',
              }}
            >
              {note.state}
            </Typography>

            {note.important && note.important === true && (
              <Typography
                variant={isSmallScreen ? "body1" : "h6"}
                sx={{
                  display: "inline-block",
                  width: "auto",
                  padding: "2px 8px",
                  border: "1px solid gray",
                  color: 'grayText',
                  borderRadius: "25px",
                  fontSize: isSmallScreen ? "0.65rem" : "0.9rem",
                  background: 'rgb(250, 186, 236)'
                }}
              >
                مهم
              </Typography>
           )}
        </Box>

      </Box>
    </Box>
  );
};

export default ViewNote;
