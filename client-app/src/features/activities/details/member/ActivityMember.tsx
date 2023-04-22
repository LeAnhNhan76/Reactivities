import { observer } from "mobx-react-lite";
import { Image, Label } from 'semantic-ui-react';
import './index.scss';

const ActivityMember = () => {
  return (
    <div className="activity-member">
        <Label as={'a'} color="orange" ribbon="right">Host</Label>
        <div className="user-info">
            <Image 
                src='https://images.pexels.com/photos/13536123/pexels-photo-13536123.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
                verticalAlign="top"
            >
            </Image>
            <div className="text">
                <p className="display-name">Bob</p>
                <p className="following">Folling</p>
            </div>
        </div>
    </div>
  )
}

export default observer(ActivityMember)