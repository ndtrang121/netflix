import { Link } from 'react-router-dom'

function Header() {
	return (
		<nav>
			<ul>
				<li>
					<Link to='/'>
						Home
					</Link>
				</li>
				<li>
					<Link to='/genre'>
						TV Shows
					</Link>
				</li>
				<li>
					<Link to='/movies'>
						Movies
					</Link>
				</li>
				<li>
					<Link to='/favorite'>
						Favorite
					</Link>
				</li>
				<li>
					<Link to='/latest'>
						Trending
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Header;