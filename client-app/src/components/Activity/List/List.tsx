import ActivityListItem from "../ListItem/ListItem";
import "./List.scss";

const List = () => {
  return (
    <div className="activity-list">
      {Array.from(Array(5).keys()).map((item, index) => (
        <ActivityListItem />
      ))}
    </div>
  );
};

export default List;
