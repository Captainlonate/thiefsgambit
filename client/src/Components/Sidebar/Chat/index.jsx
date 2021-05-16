import {

} from './styles'

const ChatSidebar = ({ onOpenToggle }) => {

  return (
    <div>
      <div onClick={onOpenToggle}>
        -->
      </div>
      <div>
        <ul>
          <li>Me: Hello</li>
          <li>Them: Greetings</li>
          <li>Me: Hello</li>
          <li>Them: Greetings</li>
          <li>Me: Hello</li>
          <li>Them: Greetings</li>
        </ul>
      </div>
      <div>
        <input type="text" name="" id="" />
      </div>
    </div>
  )
}

export default ChatSidebar
