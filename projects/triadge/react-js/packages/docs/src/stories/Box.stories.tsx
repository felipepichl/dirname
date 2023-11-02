import type { Meta, StoryObj } from '@storybook/react'
import { Box, BoxProps } from '@triadge-ui/react'

export default {
  title: 'Surfaces/Box',
  component: Box,
  // args: {
  //   children: <Text>Testando o elemento Box</Text>,
  // },
  args: {
    children: (
      <>
        <p>Testando o elemento</p>
      </>
    )
  },
  argTypes: {
    children: {
      control: {
        type: null,
      },
    },
  },
} as Meta<BoxProps>

export const Primary: StoryObj<BoxProps> = {}
