/** @jsx jsx */
import { jsx } from 'theme-ui'

import styled from '@emotion/styled'
const StyledText = styled.p`
  margin: 0;
`

export const MText = ({ variant = 'default', ...props }) => (
  <StyledText
    {...props}
    sx={{
      m: 0,
      variant: `text.${variant}`,
    }}
  />
)

export default {}
