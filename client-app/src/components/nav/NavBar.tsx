import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../../stores/store';

const NavBar = () => {
    const {activityStore} = useStore();
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
                onClick={() => activityStore.openForm()} 
                positive content='Create a new Activity'/>
            </Menu.Item>
          </Container>
      </Menu>
    )
}

export default observer(NavBar);