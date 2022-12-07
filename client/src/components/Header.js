import React, { useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from '../managers/UserManager';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { UploadModal } from './UploadModal';

export default function Header({ isLoggedIn, setIsLoggedIn, setImageList }) {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);	

	return (<>
		<div>
			<Navbar color="light" light expand="md">
				<NavbarBrand tag={RRNavLink} to="/"><h1>Sprite[0]</h1></NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="mr-auto" navbar>
						{ /* When isLoggedIn === true, we will render the Home link */}
						{isLoggedIn &&
							<>
								<NavItem>
									<NavLink tag={RRNavLink} to="/">Home</NavLink>
								</NavItem>
								<NavItem>
									<NavLink tag={RRNavLink} to="/search">Search</NavLink>
								</NavItem>
								<NavItem>
									<NavLink tag={RRNavLink} to="/myprofile">My Profile</NavLink>
								</NavItem>
							</>
						}
					</Nav>
					<Nav navbar>
						{isLoggedIn &&
							<>
								<NavItem>
									<UploadModal setImageList={setImageList} />
								</NavItem>								
								<NavItem>
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
		</div>		
	</>
	);
}
