import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import logo from '../../assets/logo_dottyland.svg'
import style from './NavBar.module.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useConnect, useDisconnect } from 'wagmi'

const NavBar = () => {
	const {
		walletAddress,
		isLoggedIn
	} = useContext(UserContext)

	return (
		<div className={style.NavBar}>
			<div className={style.NavContent}>
				<img src={logo} alt="" className={style.NavLogo} />
				<ConnectButton />
			</div>
		</div>
	)
}

export default NavBar;