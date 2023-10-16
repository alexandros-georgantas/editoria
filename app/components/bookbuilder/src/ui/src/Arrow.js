import styled from 'styled-components'
import { DefaultButton } from './Button'

const Arrow = styled(DefaultButton)`
  padding: 0;
  padding-left: 0.5em;
  transition: visibility 0.1s ease-in-out 0.1s;
  visibility: hidden;
  z-index: 1;
`

export default Arrow
