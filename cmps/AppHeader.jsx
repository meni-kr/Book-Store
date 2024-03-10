

export function AppHeader({ setPage }) {

	function onSetPage(ev, page) {
		ev.preventDefault()
		setPage(page)
	}

	return <header className="app-header full flex justify-between align-center">
		<h1>Miss Store</h1>

		<nav className="app-nav">
			<a href="" onClick={(ev) => onSetPage(ev, 'home')} >Home</a> |
			<a href="" onClick={(ev) => onSetPage(ev, 'about')} >About</a> |
			<a href="" onClick={(ev) => onSetPage(ev, 'book')}>Books</a>
		</nav>
	</header>
}