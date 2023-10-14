import { ListingWrapper, ChatRoomName, JoinIcon } from './styles'

interface IChatRoomListingProps {
  chatRoomName: string
  onClickJoin: () => void
}

const ChatRoomListing = ({
  chatRoomName,
  onClickJoin,
}: IChatRoomListingProps) => (
  <ListingWrapper onClick={onClickJoin}>
    <ChatRoomName>{chatRoomName}</ChatRoomName>
    <JoinIcon />
  </ListingWrapper>
)

export default ChatRoomListing
