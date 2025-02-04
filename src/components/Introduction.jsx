import { Box, Divider, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import useNoteStore from '../store'

const Introduction = ({ isNonMobileScreens, isMobileScreen }) => {
    const isWidth610 = useMediaQuery("(max-width: 610px)")
    const { mode } = useNoteStore()
    return (
        <Box sx={{
            direction: 'rtl',
            paddingX: isNonMobileScreens ? '3rem' : isMobileScreen ? '1rem' : '2rem',
            paddingY: isNonMobileScreens ? '2rem' : '1rem',
            display: 'flex', flexDirection: 'column', gap: '1rem'
        }}>
            <Typography variant={isWidth610 ? 'h5' : isMobileScreen ? 'h6' : 'h4'}
            sx={{ textShadow: mode === 'light' ? '4px 4px 8px rgba(0, 0, 0, 0.2)' : '4px 4px 8px rgba(231, 231, 231, 0.3)'}}>
                به اپلیکیشن یادداشت‌برداری خوش آمدید!
            </Typography>
            <Divider sx={{ my: '1rem' }} />
            <Box sx={{ display: 'flex', alignSelf: 'center', marginBottom: isWidth610 ? '1rem' : '2rem' }}>
                <img src='/note4.jpg' alt='banner'
                    style={{
                        borderRadius: '1rem',
                        width: '100%',
                        maxWidth: '960px',
                        height: 'auto',
                        boxShadow: mode === 'light' ? '4px 4px 8px rgba(0, 0, 0, 0.2)' : '4px 4px 8px rgba(231, 231, 231, 0.43)'
                    }}
                />
            </Box>
            <Typography variant={isWidth610 ? 'h6' : 'h5'}>
                این اپلیکیشن یک ابزار کاربردی برای مدیریت یادداشت‌های شخصی شماست. با استفاده از این برنامه، می‌توانید به راحتی یادداشت‌های خود را ایجاد، ویرایش، ذخیره و حذف کنید.
            </Typography>
            <Divider sx={{ my: '0.5rem' }} />

            <Typography variant='body1' sx={{ lineHeight: '30px', fontSize: '1.1rem', lineHeight: isNonMobileScreens && '1.9rem' }}>
                ویژگی‌های کلیدی:  <br />
                ✅ ورود به حساب کاربری: کاربران می‌توانند وارد پروفایل خود شوند و اطلاعاتشان را مدیریت کنند.  <br />
                ✅ ذخیره‌سازی در حافظه محلی: تمامی داده‌های شما در حافظه محلی مرورگر ذخیره می‌شوند، بنابراین نیازی به اتصال به سرور نیست.  <br />
                ✅ مدیریت یادداشت‌ها: امکان افزودن، ویرایش، حذف و ذخیره یادداشت‌ها به‌صورت آسان و سریع.  <br />
                ✅ جستجوی پیشرفته: می‌توانید با استفاده از عنوان یا محتوای یادداشت‌ها، به سرعت یادداشت موردنظر خود را پیدا کنید.  <br />
                ✅ فیلتر یادداشت‌ها: امکان فیلتر کردن یادداشت‌ها بر اساس گزینه‌های از پیش تعیین‌شده.  <br />
                ✅ مدیریت پروفایل: کاربران می‌توانند نام کاربری و رمز عبور خود را از طریق صفحه پروفایل تغییر دهند.  <br />

                با این اپلیکیشن، سازماندهی یادداشت‌های شخصی شما ساده‌تر از همیشه خواهد بود!
            </Typography>


        </Box>
    )
}

export default Introduction
