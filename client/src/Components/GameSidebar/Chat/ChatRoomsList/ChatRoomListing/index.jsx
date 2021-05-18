import { ListingWrapper, ChatRoomName, JoinIcon, } from './styles'

const ChatRoomListing = ({ chatRoomName, onClickJoin }) => (
  <ListingWrapper onClick={onClickJoin}>
    <ChatRoomName>{chatRoomName}</ChatRoomName>
    <JoinIcon />
  </ListingWrapper>
)

export default ChatRoomListing
