import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import Placeholder from "../../../common/ui/Placeholder/Placeholder";
import { useStore } from "../../../stores/store";
import ActivityListItem from "../ListItem/ListItem";
import "./List.scss";
import NoData from "../../../common/ui/NoData/NoData";

const List = () => {
  const { activitiesStore } = useStore();

  useEffect(() => {
    const loadPagingList = async () => {
      await activitiesStore.getPagingList();
    };

    loadPagingList();
  }, [activitiesStore]);

  return (
    <div className="activity-list">
      {activitiesStore.isLoading ? (
        <>
          <Placeholder.Card
            fluid
            headerLines={1}
            lines={12}
            key={1}
          ></Placeholder.Card>
          <Placeholder.Card
            fluid
            headerLines={1}
            lines={12}
            key={2}
          ></Placeholder.Card>
          <Placeholder.Card
            fluid
            headerLines={1}
            lines={5}
            key={3}
          ></Placeholder.Card>
        </>
      ) : (
        <>
          {activitiesStore.activitiesPagingList.length === 0 && (
            <div style={{ height: 110 }}>
              <NoData />
            </div>
          )}
          {activitiesStore.activitiesPagingList.map((item, index) => (
            <ActivityListItem key={item.id} activity={item} />
          ))}
        </>
      )}
    </div>
  );
};

export default observer(List);
