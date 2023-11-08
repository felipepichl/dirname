import { createStitches } from '@stitches/react'

import { colors } from '@/tokens'

export const {
  config,
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
} = createStitches({
  theme: {
    colors,
  },
})
