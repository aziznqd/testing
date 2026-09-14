'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

type ThemeToggleProps = {
  onClick: () => void
}


export function ThemeToggle({onClick}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  function handleClick() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    onClick()
    setTimeout(() => {
      setTheme(nextTheme)
    }, 1000);
  }


  return (
    <button
      onClick={handleClick}
        className='flex items-center gap-1.5 px-3 py-1 rounded-full  hover:bg-white/20 transition-all duration-200 cursor-pointer active:scale-95 transition-all ease-in-out duration-300'>
      {theme === 'dark' ? <DarkModeIcon/> : <LightModeIcon/>}
    </button>
  )
}