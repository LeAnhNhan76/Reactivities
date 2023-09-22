import { Header, Menu } from "semantic-ui-react";
import Calendar from "react-calendar";
import "./Filter.scss";

const Filter = () => {
  return (
    <div className="activity-filter">
      <Menu vertical fluid>
        <Menu.Item header>
          <Header content="Filter" icon={"filter"} size="small" color="brown" />
        </Menu.Item>
        <Menu.Item content="All activities" />
        <Menu.Item content="I'm going" />
        <Menu.Item content="I'm hosting" />
      </Menu>
      <Calendar />
    </div>
  );
};

export default Filter;
