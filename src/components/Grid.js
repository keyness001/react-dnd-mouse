import React, { useState, useRef, useCallback, useEffect } from 'react'
import { createArrFromNum, createArrObjFromNum, splitBy } from '../utils/common'
import GridItem from './GirdItem'

const Grid = ({ row, column }) => {
    const initRow = 25
    const initColumn = 100
    const gridEl = useRef(null)
    const indexRow = useRef(1)
    const indexColumn = useRef(1)
    const [grid, setGrid] = useState(createArrObjFromNum(0, initColumn * initRow))
    const [startPos, setStartPos] = useState({})
    const [endPos, setEndPos] = useState({})
    const [loading, setLoading] = useState(false)

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom && indexRow.current < row / 25) {
            setLoading(true)
            const extraItems = grid.length + initColumn * initRow;
            indexRow.current++
            setGrid(currentGrid => currentGrid.concat(createArrObjFromNum(grid.length, extraItems)))
            setLoading(false)
        }

        const right = e.target.scrollWidth - e.target.scrollLeft === e.target.clientWidth;
        if (right && indexColumn.current < column / 100) {
            setLoading(true)
            const extraItems = grid.length + initColumn * initRow;
            indexColumn.current++
            setGrid(currentGrid => currentGrid.concat(createArrObjFromNum(grid.length, extraItems)))
            setLoading(false)
        }
    }

    const moveCard = useCallback(
        (dragIndex, hoverIndex) => {
            const currGrid = [...grid]
            const tmp = currGrid[dragIndex];
            currGrid[dragIndex] = currGrid[hoverIndex];
            currGrid[hoverIndex] = tmp;
            setGrid(currGrid)
        },
        [grid],
    )

    const trackingMouseDown = useCallback((e) => {
        setStartPos({ x: e.pageX, y: e.pageY })
    }, [])

    const trackingMouseUp = useCallback((e) => {
        setEndPos({ x: e.pageX, y: e.pageY })
    }, [])

    useEffect(() => {
        if (!gridEl.current) return

        gridEl.current.addEventListener("mousedown", trackingMouseDown)
        gridEl.current.addEventListener("mouseup", trackingMouseUp)

        return () => {
            window.removeEventListener('mousedown', trackingMouseDown);
            window.removeEventListener('mouseup', trackingMouseUp)
        };
    }, [])

    const renderGridArr = splitBy(100 * indexColumn.current, grid)

    if (loading) return <div>Loading...</div>

    return (
        <div className='grid' style={{ 
            height: 900 + 'px',
            width: window.innerWidth + 'px'
        }} onScroll={handleScroll} ref={gridEl}>
            {
                renderGridArr.map((column, cIdx) => 
                    <div key={`column-${cIdx}`} className='column'>
                        {
                            column.map(({ id }, rIdx) => 
                                <div key={`column-${cIdx}-row-${rIdx}`} className='row'>
                                    <GridItem
                                        id={id}
                                        value={id}
                                        index={cIdx + rIdx * initColumn * indexColumn.current}
                                        moveCard={moveCard}
                                        endPos={endPos}
                                        startPos={startPos}
                                    />
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Grid