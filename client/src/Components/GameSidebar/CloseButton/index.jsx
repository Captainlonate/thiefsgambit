import { CloseButtonStyles } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const CloseButton = ({ onClick }) => (
  <CloseButtonStyles onClick={onClick}>
    <FontAwesomeIcon icon={faTimesCircle} />
  </CloseButtonStyles>
)

export default CloseButton
