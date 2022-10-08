import React from 'react'

const Box = ({value,handleClickFxn,ind}) => {
    
  return (
    <div className={value === 'x'?'box text-danger' :'box text-blue'} onClick={()=>value === null && handleClickFxn(ind)}>{value}</div>
  )
}

export default Box