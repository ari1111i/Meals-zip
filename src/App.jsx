import { useEffect, useState } from 'react'
import Expenses from './components/expenses/Expenses'
import NewExpense from './components/new-expense/NewExpense'
import './App.css'
import Header from './components/header/Header'
import Login from './components/login/Login'
import Users from './components/users/Users'

function App() {

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLogin = () => {
	  setIsLoggedIn(true);
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
	  };


	const [expenses, setExpenses] = useState([])

	const addNewExpenseHandler = (newExpense = {}) => {
		setExpenses((prevExpenses) => {
			return [...prevExpenses, newExpense]
		})

		localStorage.setItem(
			'EXPENSES',
			JSON.stringify([...expenses, newExpense]),
		)
	}

	useEffect(() => {
		const savedExpenses = JSON.parse(localStorage.getItem('EXPENSES')) || []
		setExpenses(
			savedExpenses.map((e) => ({ ...e, date: new Date(e.date) })),
		)
	}, [])

	const deleteExpenseByIdHandler = (id) => {
		setExpenses((prevExpenses) =>
			prevExpenses.filter((expense) => expense.id !== id),
		)

		localStorage.setItem(
			'EXPENSES',
			JSON.stringify(expenses.filter((expense) => expense.id !== id)),
		)
	}

	return (
		<>
			<Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
			{!isLoggedIn && <Login onLogin={handleLogin} />}
			<Users />
			{isLoggedIn &&	<NewExpense onAddNewExpense={addNewExpenseHandler} />}
			{isLoggedIn && 	<Expenses
				expenses={expenses}
				onDeleteExpense={deleteExpenseByIdHandler}/>}
		</>
	)
}

export default App
