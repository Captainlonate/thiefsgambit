import { BackButtonStyles } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'

interface IBackButtonProps {
  onClick: () => void
}

const BackButton = ({ onClick }: IBackButtonProps) => (
  <BackButtonStyles onClick={onClick}>
    <FontAwesomeIcon icon={faArrowCircleLeft} />
  </BackButtonStyles>
)

export default BackButton
