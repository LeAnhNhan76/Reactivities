import { observer } from "mobx-react-lite";
import Loading from "../../../common/ui/Loading/Loading";
import { useStore } from "../../../stores/store";
import ActivityListItem from "../ListItem/ListItem";
import "./List.scss";
import { useEffect } from "react";

const List = () => {
  const { activitiesStore } = useStore();

  useEffect(() => {
    const loadPagingList = async () => {
      await activitiesStore.getPagingList();
    };

    loadPagingList();
  }, [activitiesStore]);

  if (activitiesStore.isLoading) return <Loading />;

  return (
    <div className="activity-list">
      {activitiesStore.activitiesPagingList.map((item, index) => (
        <ActivityListItem key={item.id} activity={item} />
      ))}
    </div>
  );
};

export default observer(List);
