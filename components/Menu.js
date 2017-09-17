import React from 'react'
import { withRouter } from 'next/router'
import { Button, Icon } from 'antd'




const menuItems = [
	{ name: 'home', icon: 'home', link: '/' },
	{ name: 'login', icon: 'user', link: '/login' }
]
export default withRouter(({ router }) => (
    <nav>
        <div className="menu-buttons left">
            <Button
            ghost={router.pathname.charAt(1) ? false : true }
            size="large"
            className="menu-button effect-fade-in" 
            onClick={() => router.push('/')}>
                <Icon type="home"/> Home
            </Button>
        </div>
        <div className="menu-buttons right">
            <Button.Group>
            <Button
            type="primary"
            ghost={router.pathname === "/login" ? true : false }        
            size="large"
            className="effect-fade-in" 
            onClick={() => router.push('/login')}>
                Login
            </Button>
            <Button
            type="default"
            ghost={router.pathname === "/register" ? true : false }        
            size="large"
            className="effect-fade-in" 
            onClick={() => router.push('/register')}>
                 Register
            </Button>
            </Button.Group>
        </div>
        {console.log(router.pathname)}
    </nav>
))
