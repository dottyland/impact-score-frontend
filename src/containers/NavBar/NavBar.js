import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import logo from '../../assets/logo.svg'
import style from './NavBar.module.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const NavBar = () => {
	const {
		walletAddress,
		isLoggedIn
	} = useContext(UserContext)

	return (
		<div className={style.NavBar}>
			<div className={style.NavContent}>
				
				<img src={logo} alt="" className={style.NavLogo} />
				<button className={style.NavConnectButton}>
					<span className={style.ButtonText}>
						{
							isLoggedIn ?
								walletAddress
								:
								'connect wallet'
						}
					</span>
				</button>
        <ConnectButton/>
			</div>
		</div>
	)
}

export default NavBar;