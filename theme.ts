'use client';
import { createTheme, rem } from '@mantine/core';

export const theme = createTheme({
  colors: {
    // Add your color
    paleBlue: [
      "#f7ecff",
      "#e7d6fb",
      "#caaaf1",
      "#ac7ce8",
      "#9354e0",
      "#833bdb",
      "#7b2eda",
      "#6921c2",
      "#5d1cae",
      "#501599"
    ],
    // or replace default theme color
    blue: [
      "#f5f9f1",
      "#eaf0e3",
      "#d1dfc1",
      "#b7ce9c",
      "#a1c07d",
      "#93b768",
      "#8bb25d",
      "#789c4d",
      "#698b43",
      "#597835"
    ]
    
    
    
    // [ Actual blue
    //   "#e7fdfe",
    //   "#d7f8f8",
    //   "#aeeff0",
    //   "#83e6e7",
    //   "#62dee0",
    //   "#4ed9dc",
    //   "#40d7da",
    //   "#30bfc1",
    //   "#1eaaac",
    //   "#009395"
    // ],
  },

  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },

  headings: {
    fontFamily: 'Roboto, sans-serif',
    sizes: {
      h1: { fontSize: rem(36) },
    },
  },
});
