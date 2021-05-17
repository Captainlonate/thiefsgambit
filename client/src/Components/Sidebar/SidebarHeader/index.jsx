import { HeaderText, HeaderBar, } from './styles'
import BackButton from '../BackButton'
import CloseButton from '../CloseButton'

const SidebarHeader = ({ onBack, titleText, onOpenToggle }) => (
  <HeaderBar>
    {
      (typeof onBack === 'function') && <BackButton onClick={onBack} />
    }
    <HeaderText>{titleText}</HeaderText>
    {
      (typeof onOpenToggle === 'function') && <CloseButton onClick={onOpenToggle} />
    }
  </HeaderBar>
)

export default SidebarHeader
