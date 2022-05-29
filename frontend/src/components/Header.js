import React from 'react'
import { Navbar, Nav, Container,NavDropdown } from 'react-bootstrap'
import { Link ,useHistory} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'

import { logout } from '../actions/userActions'

const Header = () => {
  const userLogin=useSelector(state=>state.userLogin)
  const {userInfo}=userLogin
  const dispatch=useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }
  const history=useHistory()

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Link to='/'>
              <Navbar.Brand>ProShop</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link>
                 <Link to='/cart' style={{color:'white',textDecoration:'none'}}>
                    <i className='fas fa-shopping-cart'></i> Cart
                 </Link>
              </Nav.Link>
              {userInfo? <NavDropdown title={userInfo.name || 'User'} id='username'>
                  <NavDropdown.Item onClick={()=>history.push('/profile')}>Profile</NavDropdown.Item>  
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>: <Nav.Link>
                 <Link to='/signin' style={{color:'white',textDecoration:'none'}}>
                      <i className='fas fa-user'></i> Sign In
                 </Link>
              </Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header