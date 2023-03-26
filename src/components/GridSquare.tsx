import React from 'react'

export default function GridSquare({
  val,
  clickHandler,
}: {
  val: number
  clickHandler: (event: React.MouseEvent | React.KeyboardEvent) => void
}) {
  return (
    <div
      role={'button'}
      tabIndex={val}
      id={`square-${val}`}
      key={val}
      className={'cell' + (val === 1 ? ' current' : '')}
      onClick={clickHandler}
      onKeyDown={clickHandler}
    >
      {val}
    </div>
  )
}
