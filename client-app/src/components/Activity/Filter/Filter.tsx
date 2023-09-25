import { Header, Menu } from "semantic-ui-react";
import Calendar from "react-calendar";
import "./Filter.scss";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";
import { ActivityFilterType } from "../../../types/activity.type";
import { Value } from "react-calendar/dist/cjs/shared/types";

const Filter = () => {
  const { activitiesStore } = useStore();
  const { pagingParams } = activitiesStore;

  const handleChangeType = (type: ActivityFilterType) => {
    activitiesStore.setFilterType(type);
  };

  const handleChangeDate = (date: Value) => {
    activitiesStore.setFilterDate(date as Date);
  };

  return (
    <div className="activity-filter">
      <Menu vertical fluid>
        <Menu.Item header>
          <Header content="Filter" icon={"filter"} size="small" color="brown" />
        </Menu.Item>
        <Menu.Item
          content="All activities"
          active={!pagingParams.isGoing && !pagingParams.isHosting}
          onClick={() => handleChangeType("all")}
        />
        <Menu.Item
          content="I'm going"
          active={pagingParams.isGoing}
          onClick={() => handleChangeType("going")}
        />
        <Menu.Item
          content="I'm hosting"
          active={pagingParams.isHosting}
          onClick={() => handleChangeType("hosting")}
        />
      </Menu>
      <Calendar onChange={(value) => handleChangeDate(value)} />
    </div>
  );
};

export default observer(Filter);
