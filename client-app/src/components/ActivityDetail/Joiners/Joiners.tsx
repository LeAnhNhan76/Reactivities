import { Segment, Item, Label, Grid } from "semantic-ui-react";
import Avatar from "../../../common/ui/Avatar/Avatar";

const Joiners = () => {
  return (
    <div>
      <Segment.Group>
        <Segment textAlign="center" className="segment-secondary">
          2 People going
        </Segment>
        <Segment>
          <Item.Group divided>
            {Array.from(Array(5).keys()).map((item, index) => (
              <Item>
                <Item.Content>
                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column width={10}>
                        <Avatar
                          src={
                            "https://images.pexels.com/photos/18369315/pexels-photo-18369315/free-photo-of-tet-holiday-in-vietnam.png?auto=compress&cs=tinysrgb&w=600&lazy=load"
                          }
                          alt="avatar"
                          title="Andy Row"
                          subTitle="Following"
                        />
                      </Grid.Column>
                      {index === 0 && (
                        <Grid.Column width={6}>
                          <Label as="a" color="red" ribbon="right">
                            Hosting
                          </Label>
                        </Grid.Column>
                      )}
                    </Grid.Row>
                  </Grid>
                </Item.Content>
              </Item>
            ))}
          </Item.Group>
        </Segment>
      </Segment.Group>
    </div>
  );
};

export default Joiners;
