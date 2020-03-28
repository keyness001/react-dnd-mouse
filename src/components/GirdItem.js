import React, { useRef, useEffect, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import ItemTypes from './ItemTypes'

const GridItem = ({ id, value, index, moveCard, endPos, startPos }) => {
    const ref = useRef(null)
    const [selected, setSelected] = useState(false)
    const [, drop] = useDrop({
      accept: ItemTypes.GRIDITEM,
      drop(item, monitor) {
        if (!ref.current) {
          return
        }
        const dragIndex = item.index
        const dropIndex = index

        if (dragIndex === dropIndex) {
          return
        }

        moveCard(dragIndex, dropIndex)

        item.index = dropIndex
      },
    })

    const [{ isDragging }, drag] = useDrag({
      item: { type: ItemTypes.GRIDITEM, id, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    })

    useEffect(() => {
      if (!ref.current) return

      const {x, y} = ref.current.getBoundingClientRect()

      if (x >= startPos.x && y >= startPos.y && x <= endPos.x && y <= endPos.y) {
        setSelected(true)
      } else {
        setSelected(false)
      }
    },[endPos])

    drag(drop(ref))

    return (
      <div className={`grid-item ${selected ? 'selected' : ''}`} ref={ref}>
          <p>{value}</p>
      </div>
    )
}

export default GridItem