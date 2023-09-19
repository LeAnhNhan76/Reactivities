import { Button, Card, Form, Header, Image } from "semantic-ui-react";
import "./Photos.scss";

const Photos = () => {
  return (
    <div className="photos">
      <Form>
        <Form.Group>
          <Form.Field width={12}>
            <Header
              size="tiny"
              content="Photos"
              image={
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAB7CAMAAABjGQ9NAAAAY1BMVEX///8AAADIyMh9fX3FxcX4+Pji4uKwsLC1tbXAwMC5ubnQ0NBYWFjo6OiIiIggICCqqqoaGhpGRkZPT089PT2WlpYWFhaioqI2NjZjY2Px8fEuLi7Z2dmPj48lJSURERFxcXHT7ms5AAACpUlEQVRoge3a65qqIBQG4MhDpmmmmWljdf9XObvaKuASRQ7OzLO+n8rj22GJgGw2GAwGg8FgVOO5iWM2ievBtHsk5nN0ITq1IL+SDunIEk1INLAP1uwDT/sna/bJ5+ytNZqQ7U+082Ep6EmUT9lnQ/Ir1wkbuPu0pZiw+eM6s0P7r9pxFEXxGrbfnF+P43tWsrx520v6HuxS0mMF43Z8JXSq2p4dXwibrP/mhm3vSvhUtuxkQBMS2rFjaARyt2PD4832mmbtDLSb/2cDozZIk9yGHcP2ZUX7YcOuYbstdLP/N9+pffK0Yj9Bu7Riu6DdPklDozZ4gz/bk4ZtYHrz6AYQyrYXD8ZCdJqB3T1KlO0iO94Oe0EDh6PL/pSa7Z0/rQpBm5Kh6Y+pZnfTuVLQyK862anpE0o29XuK8E2dJlVVJQG3qKRiM7/mToTDUbD3bBGJCk637T9YG1gvMmbfCR9+zcaYnQ9ochH2Mvpsvst45yaHL7RHFjyzGm6u0x5dAcu5W9gLnWa0DPZLbMGiI7tA6b+rYuzWX2K3vTiYJ9WwXQ8O9NlAiVNxunZBdywErrLIhuZ3dBqgHdjpyds7MpU3XlfMMajTk7bnLPLm6ba4cceAape1/aUvUU7DfkfS9uCZ5ZzcBv2OpK3yJuPMv4+Ss6dKXBy+05Oyg7GrzkzFGjL2lyLNdnr9jGmGHWt4T9gssxVKnEq5yIbnsyr4bFutxKmk0rZqiVMJJW31EqeylbJrva/Cv2Rs8WhBOg9/vq2pxPt8Hmpz7GLsEstzrefZ4dgFVPIayU/bWkucwsfHJ91xz9Ruj2rSjszte3Da4fuYzQ/5dKadYvzIPQdoo4022mj/anvNfXtr7ldcdZ/mmvtT/5XbevtyV92PjMFgMBgMRiLfJ9IsMrsRMjwAAAAASUVORK5CYII="
              }
              className="title-section"
            ></Header>
          </Form.Field>
          <Form.Field width={4} type="button">
            <Button
              content="Add photos"
              icon="upload"
              floated="right"
              size="small"
            ></Button>
          </Form.Field>
        </Form.Group>
        <Card.Group itemsPerRow={3} style={{ marginTop: "10px" }}>
          {Array.from(Array(10).keys()).map((key) => (
            <Card key={key}>
              <Image
                src="https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=400"
                fluid
              />
              <div className="ui two buttons">
                <Button
                  content={key === 0 ? "Main" : "Extra"}
                  inverted
                  color="green"
                ></Button>
                <Button icon="trash alternate" inverted color="red"></Button>
              </div>
            </Card>
          ))}
        </Card.Group>
      </Form>
    </div>
  );
};

export default Photos;
