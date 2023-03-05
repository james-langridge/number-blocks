import React from 'react'

export default function GridSquare(props: {
  val: number
  clickHandler: (event: React.MouseEvent | React.KeyboardEvent) => void
}) {
  const {val, clickHandler} = props

  return (
    <div
      role={'button'}
      tabIndex={val}
      id={`square-${val}`}
      key={val}
      className="grid-item"
      onClick={clickHandler}
      onKeyDown={clickHandler}
    >
      {val}
    </div>
  )
}
