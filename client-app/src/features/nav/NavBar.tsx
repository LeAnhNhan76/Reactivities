import { observer } from 'mobx-react-lite';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../../stores/store';

const NavBar = () => {
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
              <Button onClick={() => activityStore.openForm()} positive content='Create a new Activity'/>
            </Menu.Item>
          </Container>
      </Menu>
    )
}

export default observer(NavBar);