export const range = (start, end) => {
    return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);
}

export const createArrFromNum = (start, end) => {
    return range(start, end).map( i => { 
        return i 
    })
}

export const createArrObjFromNum = (start, end) => {
    return range(start, end).map( i => { 
        return { id: i }
    })
}

export const splitBy = (size, list) => {
    const arr = [ ...Array(size).keys()].map( i => { 
        return []
    })

    list.forEach((item, idx) => {
        const curr = idx % size
        arr[curr].push(item)
    })

    return arr
}
