import { HeaderText, HeaderBar } from './styles'
import BackButton from '../BackButton'
import CloseButton from '../CloseButton'

interface ISidebarHeaderProps {
  onBack?: () => void
  titleText: string
  onOpenToggle?: () => void
}

const SidebarHeader = ({
  onBack,
  titleText,
  onOpenToggle,
}: ISidebarHeaderProps) => (
  <HeaderBar>
    {typeof onBack === 'function' && <BackButton onClick={onBack} />}
    <HeaderText>{titleText}</HeaderText>
    {typeof onOpenToggle === 'function' && (
      <CloseButton onClick={onOpenToggle} />
    )}
  </HeaderBar>
)

export default SidebarHeader
