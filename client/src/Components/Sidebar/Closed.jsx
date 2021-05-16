const ClosedSidebar = ({ onOpenToggle }) => {

  return (
    <div>
      <div onClick={onOpenToggle}>&lt;--</div>
      <div>A</div>
      <div>B</div>
      <div>C</div>
    </div>
  )
}

export default ClosedSidebar
