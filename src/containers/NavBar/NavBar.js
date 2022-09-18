import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import style from './NavBar.module.css';

const NavBar = () => {
	const {
		walletAddress,
		isLoggedIn
	} = useContext(UserContext)

	return (
		<div className={style.NavBar}>
			<div className={style.NavContent}>
				<span>logo</span>
				{isLoggedIn ?
					<button>
						{walletAddress}
					</button> : <button>
						connect wallet
					</button>
				}
			</div>
		</div>
	)
}

export default NavBar;