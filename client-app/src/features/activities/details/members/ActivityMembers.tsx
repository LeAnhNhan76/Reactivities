import { observer } from "mobx-react-lite"
import { Card, CardContent, CardHeader, Header, List, ListItem } from "semantic-ui-react"
import ActivityMember from "../member/ActivityMember"
import { colors } from "../../../../constants/style.constants"

const ActivityMembers = () => {
  return (
    <div className="activity-members">
      <Card>
        <CardHeader>
          <Header 
            as={'h5'} block inverted style={{
            textAlign: 'center',
            color: colors.$white,
            backgroundColor: colors.$lightTeal
          }}>2 people going</Header>
        </CardHeader>
        <CardContent>
          <List divided relaxed>
            <ListItem>
               <ActivityMember></ActivityMember>
            </ListItem>
            <ListItem>
               <ActivityMember></ActivityMember>
            </ListItem>
            <ListItem>
               <ActivityMember></ActivityMember>
            </ListItem>
            <ListItem>
               <ActivityMember></ActivityMember>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </div>
  )
}

export default observer(ActivityMembers)