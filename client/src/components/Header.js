import React, { useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from '../managers/UserManager';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { UploadModal } from './UploadModal';

export default function Header({ isLoggedIn, setIsLoggedIn, setImageList, changeColor }) {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	return (<>
		<div >
			<div id="header">
				<Navbar id='navbar' expand="md">

					<NavbarToggler onClick={toggle} />
					<Collapse id='whole-nav' isOpen={isOpen} navbar>
						<Nav id='nav-1' className="mr-auto" navbar>
							{ /* When isLoggedIn === true, we will render the Home link */}
							{isLoggedIn &&
								<>
									<NavItem onClick={changeColor} className='i-navitem'>
										<NavLink tag={RRNavLink} to="/">Home</NavLink>
									</NavItem>
									<NavItem onClick={changeColor} className='i-navitem'>
										<NavLink tag={RRNavLink} to="/search/undefined">Search</NavLink>
									</NavItem>
									<NavItem onClick={changeColor} className='i-navitem'>
										<NavLink tag={RRNavLink} to="/myprofile">My Profile</NavLink>
									</NavItem>
								</>
							}
						</Nav>
						<NavbarBrand id='nav-2' tag={RRNavLink} to="/"><h1>Sprite[0]</h1></NavbarBrand>
						<Nav id='nav-3' navbar>
							{isLoggedIn &&
								<>
									<NavItem className='i-navitem'>
										<UploadModal setImageList={setImageList} />
									</NavItem>
									<NavItem className='i-navitem'>
										<a aria-current="page" className="nav-link"
											style={{ cursor: "pointer" }} onClick={() => {
												logout()
												setIsLoggedIn(false)
											}}>Logout</a>
									</NavItem>
								</>
							}
							{!isLoggedIn &&
								<>
									<NavItem>
										<NavLink tag={RRNavLink} to="/login">Login</NavLink>
									</NavItem>
									<NavItem>
										<NavLink tag={RRNavLink} to="/register">Register</NavLink>
									</NavItem>
								</>
							}
						</Nav>
					</Collapse>
				</Navbar>
				{/* <hr id='hr'></hr> */}			
			</div>
		</div>
	</>
	);
}
