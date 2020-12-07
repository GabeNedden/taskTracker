import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function MenuBar() {
  
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'projects' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

    return (

        <Menu pointing secondary size='massive' color='yellow'>
          <Menu.Item
            name='projects'
            active={activeItem === 'projects'}
            onClick={handleItemClick}
            as={Link}
            to='/'
          />
          <Menu.Item
            name='messages'
            active={activeItem === 'messages'}
            onClick={handleItemClick}
          />
          
          <Menu.Menu position='right'>
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to='/login'
          />
            <Menu.Item
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
              as={Link}
            to='/register'
            />
          </Menu.Menu>
        </Menu>
     
    )
  }

  export default MenuBar;
