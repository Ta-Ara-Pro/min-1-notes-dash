import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
  FormHelperText,
  Switch,
  FormControlLabel,
  Box,
} from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useForm, Controller } from "react-hook-form";

import DatePicker from "react-multi-date-picker"
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'


const AddNoteForm = ({ addNote }) => {

  const { handleSubmit, reset, control, watch } = useForm();
  const date = new Date().toLocaleDateString("fa-IR")
  const selectedState = watch("state");

  const onSubmit = (data) => {
    console.log(data); 
    addNote(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "100%",
        alignItems: 'center',
        padding: "1.5rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9", minWidth: 220,
        direction: 'rtl'
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        افزودن یادداشت
      </Typography>

      {/* Title Field */}
      <Controller
        name="title"
        control={control}
        defaultValue=""
        rules={{ required: "عنوان الزامی است" }}
        render={({ field, fieldState: { error } }) => (
          <Tooltip title="یک عنوان برای یادداشت خود وارد کنید" arrow>
            <TextField
              {...field}
              label="عنوان"
              variant="outlined"
              error={!!error}
              helperText={error ? error.message : null}
              fullWidth
            />
          </Tooltip>
        )}
      />

      {/* Note Field */}
      <Controller
        name="note"
        control={control}
        defaultValue=""
        rules={{ required: "یادداشت الزامی است" }}
        render={({ field, fieldState: { error } }) => (
          <Tooltip title="محتوای یادداشت را وارد کنید" arrow>
            <TextField
              {...field}
              label="یادداشت"
              multiline
              rows={4}
              variant="outlined"
              error={!!error}
              helperText={error ? error.message : null}
              fullWidth
            />
          </Tooltip>
        )}
      />
      <Box
        sx={{
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between', width: '100%', gap: '1rem'
        }}>
        {/* State Select */}
        <Controller
          name="state"
          control={control}
          defaultValue=""
          rules={{ required: "وضعیت الزامی است" }}
          render={({ field, fieldState: { error } }) => (
            <FormControl variant="outlined" fullWidth error={!!error}>
              <InputLabel>وضعیت</InputLabel>
              <Select {...field} label="وضعیت">
                <MenuItem value="فعال">فعال</MenuItem>
                <MenuItem value="غیرفعال">غیرفعال</MenuItem>
                <MenuItem value="آرشیو شده">آرشیو شده</MenuItem>
              </Select>
              {error && <FormHelperText>{error.message}</FormHelperText>}
            </FormControl>
          )}
        />

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
        )
        }

        {/* Date Picker */}
        <Controller
          name="date"
          control={control}
          defaultValue={date}
          rules={{ required: "تاریخ پایان اعتبار را وارد کنید" }}
          render={({ field, fieldState: { error } }) => (
            <Tooltip title=" تاریخ پایان اعتبار یادداشت را وارد کنید" arrow>
            <div style={{ direction: "rtl",cursor: 'pointer', marginBottom:'1.2rem' }}>
              <label htmlFor="datepicker"
              style={{
                border: "1px solid lightgray",cursor: 'pointer', display: 'flex',
                 alignItems: 'center', justifyContent: 'start',padding:'1rem',gap:'10px' }}>
                <CalendarMonthIcon sx={{ cursor: 'pointer'}} />
                <DatePicker
                  id="datepicker"
                  {...field}
                  calendar={persian} // استفاده از تقویم جلالی
                  locale={persian_fa} // تنظیم زبان فارسی
                  calendarPosition="bottom-right"
                  style={{padding:'18px',border:'none'}}
                  value={field.value} // مقدار انتخاب شده
                  onChange={(value) => field.onChange(value)} // هنگام تغییر تاریخ
                />
              </label>
              {error && <span style={{ color: 'red' }}>{error.message}</span>}
            </div>
            </Tooltip>
          )}
        />
      </Box>

      {/* Submit Button */}
      <Button type="submit" variant="contained" size="large"
        sx={{
          background: "linear-gradient(90deg, #2196f3, #6a1b9a)",
          borderRadius: 25, width: '50%'
        }} >
        افزودن
      </Button>
    </form>
  );
};

export default AddNoteForm;
