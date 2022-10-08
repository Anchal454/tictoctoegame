import React from 'react'

const Score = ({ score,firstPlayer }) => {
    return (
        <div className='shadow rounded d-flex text-center my-5'>
            <div className={`w-50 py-4 px-4 cp ${firstPlayer && 'inActive'}`}>
                <h3 className='text-blue'>O - {score.computer}</h3>
            </div>
            <div className={`w-50 py-4 px-4 text-danger us ${!firstPlayer && 'inActive'}`}>
                <h3 className='text-danger'>
                    X - {score.user}
                </h3>
            </div>
        </div>
    )
}

export default Score