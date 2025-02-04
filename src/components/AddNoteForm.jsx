import React from "react";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
  FormHelperText,
  Switch,
  FormControlLabel,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useForm, Controller } from "react-hook-form";

import DatePicker from "react-multi-date-picker"
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddNoteForm = ({ addNote }) => {
  const navigate = useNavigate()
  const isMobileScreen = useMediaQuery("(max-width: 629px)")
  const isSmallScreen = useMediaQuery("(max-width: 460px)")
  const { handleSubmit, reset, control, watch } = useForm();
  const date = new Date().toLocaleDateString("fa-IR");
  const { palette } = useTheme()
  const selectedState = watch("state");

  const onSubmit = (data) => {
    addNote(data);
    reset();
    toast.success('فرم با موفقیت افزوده شد')
    navigate('/?tab=notes')

  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: 'center',
        padding: "1.5rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: palette.primary.light,
        direction: 'rtl'
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        افزودن یادداشت
      </Typography>

      {/* Title Field */}
      <Box width="100%">
        <Typography variant="body1" component="label" htmlFor="title">
          عنوان
        </Typography>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{ required: "عنوان الزامی است" }}
          render={({ field, fieldState: { error } }) => (
            <Tooltip title="یک عنوان برای یادداشت خود وارد کنید" arrow>
              <TextField
                {...field}
                id="title"
                variant="outlined"
                error={!!error}
                helperText={error ? error.message : null}
                fullWidth
                slotProps={{
                  formHelperText: {
                    style: { textAlign: "right" },
                  },
                }}

              />
            </Tooltip>
          )}
        />
      </Box>

      {/* Note Field */}
      <Box width="100%">
        <Typography variant="body1" component="label" htmlFor="note">
          یادداشت
        </Typography>
        <Controller
          name="note"
          control={control}
          defaultValue=""
          rules={{ required: "یادداشت الزامی است" }}
          render={({ field, fieldState: { error } }) => (
            <Tooltip title="محتوای یادداشت را وارد کنید" arrow>
              <TextField
                {...field}
                id="note"
                multiline
                rows={4}
                variant="outlined"
                error={!!error}
                helperText={error ? error.message : null}
                fullWidth
                slotProps={{
                  formHelperText: {
                    style: { textAlign: "right" }, 
                  },
                }}

              />
            </Tooltip>
          )}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          gap: '1rem',
        }}
      >
        {/* State Select */}
        <Box width="100%">
          <Typography variant="body1" component="label" htmlFor="state">
            وضعیت
          </Typography>
          <Controller
            name="state"
            control={control}
            defaultValue=""
            rules={{ required: "وضعیت الزامی است" }}
            render={({ field, fieldState: { error } }) => (
              <FormControl
                variant="outlined"
                fullWidth
                error={!!error}
              >
                <Select {...field} id="state">
                  <MenuItem value="فعال">فعال</MenuItem>
                  <MenuItem value="غیرفعال">غیرفعال</MenuItem>
                  <MenuItem value="آرشیو شده">آرشیو شده</MenuItem>
                </Select>
                {error && <FormHelperText style={{ textAlign: "right" }}>{error.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </Box>


        {/* Conditional Field: Important */}
        {selectedState === "آرشیو شده" && (
          <Controller
            name="important"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <FormControlLabel
                control={<Switch {...field} color="primary" />}
                label="آیا این یادداشت مهم است؟"
              />
            )}
          />
        )}

        {/* Date Picker */}
        <Box width="100%">
          <Typography variant="body1" component="label" htmlFor="datepicker">
            تاریخ
          </Typography>
          <Controller
            name="date"
            control={control}
            defaultValue={new Date()}
            rules={{ required: "تاریخ پایان اعتبار را وارد کنید" }}
            render={({ field, fieldState: { error } }) => (
              <Tooltip title="تاریخ پایان اعتبار یادداشت را وارد کنید" arrow>
                <div style={{ direction: "rtl", cursor: 'pointer', marginBottom: '1.2rem' }}>
                  <label
                    htmlFor="datepicker"
                    style={{
                      border: `1px solid ${palette.primary.outline}`,
                      borderRadius: '5px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'start',
                      padding: '1rem',
                      gap: '10px',
                    }}

                  >
                    {!isSmallScreen && <CalendarMonthIcon sx={{ cursor: 'pointer' }} />}
                    <DatePicker
                      id="datepicker"
                      {...field}
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      style={{
                        width: isMobileScreen ? '80px' : '100%', transition: 'width 0.3s ease-in-out',
                        padding: '18px', border: 'none',
                        background: "rgba(249, 249, 249, 0.26)"
                      }}
                      value={field.value || date}
                      onChange={(value) => field.onChange(value)}
                    />
                  </label>
                  {error && <span style={{ color: 'red' }}>{error.message}</span>}
                </div>
              </Tooltip>
            )}
          />
        </Box>
      </Box>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{
          background: "linear-gradient(90deg, #2196f3, #6a1b9a)",
          borderRadius: 25,
          width: '50%',
        }}
      >
        افزودن
      </Button>
    </form>
  );
};

export default AddNoteForm;
