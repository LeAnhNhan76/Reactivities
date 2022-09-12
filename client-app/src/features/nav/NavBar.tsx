import React, { useContext } from 'react';
import { Container, Menu, Button } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store';

const NavBar : React.FC = () => {
    const {activityStore} = useStore();
    return (
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item header>
              <img src="/assets/logo.png" alt="logo" style={{marginRight:'10px'}} />
              Reactivities
            </Menu.Item>
            <Menu.Item name='Activities' />
            <Menu.Item>
              <Button onClick={() => activityStore.openForm} positive content='Create a new Activity'/>
            </Menu.Item>
          </Container>
      </Menu>
    )
}

export default observer(NavBar);