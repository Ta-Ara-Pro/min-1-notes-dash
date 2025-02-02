import React, { useEffect, useState } from "react";
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
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useForm, Controller } from "react-hook-form";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useNoteStore from "../store";

const EditNote = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { notes, editNote } = useNoteStore();
    const { palette } = useTheme();
    const isMobileScreen = useMediaQuery("(max-width: 629px)");
    const isSmallScreen = useMediaQuery("(max-width: 460px)");

    // GET QUERY FROM URL PATH ===============
    // =======================================
    const searchPrams = new URLSearchParams(location.search)
    const tab = searchPrams.get("tab");
    const [index, setIndex] = useState(null)
    useEffect(() => {
        if (tab && tab.startsWith("edit/")) {
            const id = parseInt(tab.split("edit/")[1], 10);
            setIndex(Number(id))
        }
    }, [location.search]);

    // FIND THE NOTE FROM LOCAL STORAGE ======
    // =======================================
    const note = notes.find((_, i) => i === index);

    // Initializing the form default values ====
    // ==========================================
    const {
        handleSubmit,
        reset,
        control,
        watch,
        setValue,
    } = useForm({
        defaultValues: {
            title: note?.title || "",
            note: note?.note || "",
            state: note?.state || "",
            important: note?.important || false,
            date: note?.date || new Date().toLocaleDateString("fa-IR"),
        },
    }); 

    const selectedState = watch("state");

    // Update form values when note changes
    // =====================================
    useEffect(() => {
        if (note) {
            reset({
                title: note.title || "",
                note: note.note || "",
                state: note.state || "",
                important: note.important || false,
                date: note.date || new Date().toLocaleDateString("fa-IR"),
            });
        }
    }, [note, reset]);

    const onSubmit = (data) => {
        editNote(index, data);
        navigate('/?tab=notes')
    };


    if (!note) return <Typography align="right">یادداشت پیدا نشد</Typography>;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                alignItems: "center",
                padding: isMobileScreen ? '1rem 1rem' : "1rem 5rem",
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: palette.primary.main,
                direction: "rtl",
                maxHeight: '100vh',
                height: '100vh',
            }}
        >

            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    alignItems: "center",
                    padding: "1.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    backgroundColor: palette.primary.light,
                    direction: "rtl",
                    padding: isMobileScreen ? '1rem 1rem' : '3rem 3rem',
                    width: '100%',
                    marginTop: '1rem',
                    color: palette.text.main,
                    marginY: '0.5rem'

                }}
            >
                <Typography variant="h5" align="center" gutterBottom>
                    اصلاح یادداشت
                </Typography>

                {/* Title Field */}
                <Box width="100%">
                    <Typography variant="body1" component="label" htmlFor="title">
                        عنوان
                    </Typography>
                    <Controller
                        name="title"
                        control={control}
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
                                    slotProps={{ formHelperText: { style: { textAlign: "right" } } }}
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
                                    slotProps={{ formHelperText: { style: { textAlign: "right" } } }}
                                />
                            </Tooltip>
                        )}
                    />
                </Box>

                {/* State Select */}
                <Box width="100%">
                    <Typography variant="body1" component="label" htmlFor="state">
                        وضعیت
                    </Typography>
                    <Controller
                        name="state"
                        control={control}
                        rules={{ required: "وضعیت الزامی است" }}
                        render={({ field, fieldState: { error } }) => (
                            <FormControl variant="outlined" fullWidth error={!!error}>
                                <Select {...field} id="state">
                                    <MenuItem value="فعال">فعال</MenuItem>
                                    <MenuItem value="غیرفعال">غیرفعال</MenuItem>
                                    <MenuItem value="آرشیو شده">آرشیو شده</MenuItem>
                                </Select>
                                {error && (
                                    <FormHelperText style={{ textAlign: "right" }}>
                                        {error.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />
                </Box>

                {/* Conditional Field: Important */}
                {selectedState === "آرشیو شده" && (
                    <Controller
                        name="important"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                        color="primary"
                                    />
                                }
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
                        rules={{ required: "تاریخ پایان اعتبار را وارد کنید" }}
                        render={({ field, fieldState: { error } }) => (
                            <Tooltip title="تاریخ پایان اعتبار یادداشت را وارد کنید" arrow>
                                <div
                                    style={{
                                        direction: "rtl",
                                        cursor: "pointer",
                                        marginBottom: "1.2rem",
                                    }}
                                >
                                    <label
                                        htmlFor="datepicker"
                                        style={{
                                            border: `1px solid ${palette.primary.outline}`,
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "start",
                                            padding: "1rem",
                                            gap: "10px",
                                        }}
                                    >
                                        {!isSmallScreen && (
                                            <CalendarMonthIcon sx={{ cursor: "pointer" }} />
                                        )}
                                        <DatePicker
                                            id="datepicker"
                                            {...field}
                                            calendar={persian}
                                            locale={persian_fa}
                                            calendarPosition="bottom-right"
                                            style={{
                                                width: isMobileScreen ? "120px" : "100%",
                                                transition: "width 0.3s ease-in-out",
                                                padding: "18px",
                                                border: "none",
                                                background: "rgba(233, 232, 232, 0.26)",
                                            }}
                                            value={field.value}
                                            onChange={(value) => field.onChange(value)}
                                        />
                                    </label>
                                    {error && <span style={{ color: "red" }}>{error.message}</span>}
                                </div>
                            </Tooltip>
                        )}
                    />
                </Box>

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                        background: "linear-gradient(90deg, #2196f3, #6a1b9a)",
                        borderRadius: 25,
                        width: isSmallScreen ? "100%" : "50%",
                    }}
                >
                    ذخیره تغییرات
                </Button>
            </form>
        </Box>
    );
};

export default EditNote;
