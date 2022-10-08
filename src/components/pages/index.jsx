import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Box from './box'
import Score from './score'

let init = Array(9).fill(null)
let initmsg = { isMsg: false, msg: 'X' }
const Index = () => {
	const [board, setBoard] = useState(init)
	const [firstPlayer, setFirstPlayer] = useState(true)
	const [user, setUser] = useState(0)
	const [computer, setComputer] = useState(0)
	const [massege, setMassege] = useState(initmsg)
	const [isGameover, setIsGameover] = useState(false)

	useEffect(()=>{
		getBoard()
	},[])

	useEffect(()=>{
		setTimeout(()=>{
		setMassege(init)
	},5000)
	},[massege])
	
	const win_condition = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]
	const handleClickFxn = (id) => {
		console.log(id);
		const updatedBoard = board.map((item, ids) => ids === id ? firstPlayer ? 'x' : 'o' : item)
		const winner = checkWinner(updatedBoard)
		if (winner) {
			// if (winner === 'x') {
			// 	let { user } = score
			// 	user += 1
			// 	setScore({ ...score, user })
			// }else{
			// 	let { computer } = score
			// 	computer += 1
			// 	setScore({ ...score, computer })
			// }
			setMassege({['isMsg']:true,['msg']:winner})
			let obj = {
				board :board,
				winner :winner
			}
			addBoard(obj)
		}
		getBoard()
		setBoard(updatedBoard)
		setFirstPlayer(!firstPlayer)
		
	}

	const addBoard = async (obj) => {
		let { data } = await axios.post(`http://localhost:8040/tictoc`, obj)
		let board = data.data.board
	}
	const getBoard = async (obj) => {
		let resp = await axios.get(`http://localhost:8040/tictoc`,)
		let board = resp.data
		
         console.log(board , "adiuyhqwieyhiduQWYAI2Y");
		 let user =0 
		 let computer = 0
		board.map((item)=>{
			console.log(item.winner)
			if (item.winner === 'x') {
				user += 1
				setUser(user)
			}
			if (item.winner === 'o') {
				console.log(computer);
				computer += 1
				setComputer(computer)
			}
		})

	}

	const checkWinner = (board) => {
		for (let i = 0; i < win_condition.length; i++) {
			const [x, y, z] = win_condition[i]
			if (board[x] && board[x] === board[y] && board[y] === board[z]) {
				console.log(board[x]);
				setIsGameover(true)
				return board[x];
			}
		}

	}
	const reset=()=>{
		setBoard(init)
		setIsGameover(false)
	}
	return (
		<>
			<div className='conatiner'>
			<div className='row justify-content-center'>
			<div className='col-4'>
					<Score score={{user , computer}} firstPlayer={firstPlayer}/>
					{massege.isMsg && <h6 className='alert  alert-success py-2 px-4'>🎉 {massege.msg} is Winner ...🎉</h6>}
				</div>
			</div>
				<div className='row justify-content-center'>
					<div className='col-6 bord'>
						{board && board.map((box, ind) => {
							return <Box value={box} handleClickFxn={isGameover ?reset : handleClickFxn} ind={ind} key={ind} />
						})}
					</div>
				</div>
				<div className='text-center my-4'>
				<button onClick={reset} className="btn btn-warning">Reset</button>
				</div>
			</div>
		</>
	)
}

export default Index