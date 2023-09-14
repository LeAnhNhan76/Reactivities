import { observer } from "mobx-react-lite"
import { Card, CardContent, CardHeader, Header, Item, ItemGroup, Label, List } from "semantic-ui-react"
import { colors } from "../../../../constants/style.constants"
import { getAvatar } from "../../../../helpers/file.helper"
import { useActivityStore } from "../../../../stores/store"
import './index.scss'
import { getAuthInfo } from "../../../../utils/localStorage.utils"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

const ActivityMembers = () => {
  const {
    selectedActivity: activity,
    loadActivity
  } = useActivityStore();

  const {id} = useParams();
  
  useEffect(() => {
      if (id) {
          loadActivity(id);
      }
  }, [id, loadActivity]);

  return (
    <div className="activity-members">
      <Card>
        <CardHeader>
          <Header 
            as={'h5'} block inverted style={{
            textAlign: 'center',
            color: colors.$white,
            backgroundColor: colors.$lightTeal
          }}>{activity?.members?.length} people going</Header>
        </CardHeader>
        <CardContent>
          <List divided relaxed>
            <ItemGroup>
              {activity?.members?.map((item, index) => {
                const isHost = activity?.hostId === item.userId;
                return <div style={{position: 'relative'}} className="item-container" key={index}>
                    {isHost && <Label as='a' color='orange' ribbon='right' style={{
                      position: 'absolute',
                      right: '0px'
                    }}>Host</Label>}
                    <Item>
                      <Item.Image size='tiny' src={getAvatar(item.avatar)}/>
                      <Item.Content>
                        <Item.Header as='a'>{item.displayName}</Item.Header>
                        {item.followers.includes(getAuthInfo()?.userId??'') && 
                          <Item.Meta>Following</Item.Meta>}
                      </Item.Content>
                    </Item>
                </div>
              })}
            </ItemGroup>
          </List>
        </CardContent>
      </Card>
    </div>
  )
}

export default observer(ActivityMembers)