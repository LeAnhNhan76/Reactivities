import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Confirm, Container, Dropdown, DropdownItem, DropdownMenu, Menu } from 'semantic-ui-react';
import { getAvatarUrl } from '../../constants/files.constants';
import { useActivityStore, useAuthStore } from '../../stores/store';
import { getAuthInfo } from '../../utils/localStorage.utils';
import Avatar, { AvatarSizes } from '../avatar/Avatar';
import { getAvatar } from '../../helpers/file.helper';

const NavBar = () => {
    const { openForm } = useActivityStore();
    const { isAlreadyLoggedIn, signOut } = useAuthStore();
    const authInfo = getAuthInfo();
    const [isSignOut, setIsSignOut] = useState<boolean>(false);
    
    const options = [
      {
        key: 'signOut',
        text: 'Sign Out',
        value: 'signOut',
        onclick: () => setIsSignOut(true)
      },
      {
        key: 'viewProfile',
        text: 'View Profile',
        value: 'viewProfile',
        onclick: () => {
          window.alert('Need to implement');
        }
      }
    ];

    const navigate = useNavigate();
    
    return (
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as={NavLink} to='/' header>
              <img src="/assets/logo.png" alt="logo" style={{marginRight:'10px'}} />
              Reactivities
            </Menu.Item>
            <Menu.Item as={NavLink} to='/activities' name='Activities' />
            <Menu.Item>
              <Button 
                as={NavLink}
                to='/createActivities'
                onClick={() => openForm()} 
                positive content='Create a new Activity'/>
            </Menu.Item>
            { isAlreadyLoggedIn() === true && <>
              <Menu.Item position='right'>
                <Avatar src={getAvatar(authInfo?.avatar)} size={AvatarSizes.TINY}></Avatar>
                <span style={{paddingLeft: '5px'}}>{authInfo?.displayName}</span>
                <span>
                  <Dropdown>
                    <DropdownMenu>
                      {options.map(x => <DropdownItem
                        key={x.key}
                        text={x.text}
                        onClick={x.onclick}
                      ></DropdownItem>)}
                    </DropdownMenu>
                  </Dropdown>
                </span>
              </Menu.Item>
              <Menu.Item></Menu.Item>
            </>} 
            <Confirm
              open={isSignOut}
              header={'Signout'}
              content={'Are you sure Sign out app?'}
              onCancel={() => setIsSignOut(false)}
              onConfirm={async () => {
                await signOut();
                navigate('/');
              }}>
            </Confirm>
                        
          </Container>
      </Menu>
    )
}

export default observer(NavBar);