import { useMutation, useQuery } from "@apollo/client";
import {
  Card,
  Col,
  Row,
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Skeleton,
} from "antd";
import moment from "moment";
import { ReactElement, useEffect, useState } from "react";
import { ADD_EVENT, GET_LOCATIONS, GET_USERS } from "./querys";
const { TextArea } = Input;
const { Option } = Select;

function NewPost() {
  const [users, setUsers] = useState<Array<ReactElement>>([]);
  const [locations, setLocations] = useState<Array<ReactElement>>([]);

  const { data: usersData } = useQuery(GET_USERS);
  const { data: locationsData } = useQuery(GET_LOCATIONS);
  const [addEvent, { loading: addLoad }] = useMutation(ADD_EVENT);

  useEffect(() => {
    const onCompleted = (usersData: any) => {
      let children = [];
      for (let i = 0; i < usersData.getUsers.length; i++) {
        children.push(
          <Option key={usersData.getUsers[i].id}>
            {usersData.getUsers[i].username}
          </Option>
        );
      }
      setUsers(children);
    };
    if (usersData) onCompleted(usersData);
  }, [usersData]);

  useEffect(() => {
    const onCompleted = (locationsData: any) => {
      let children = [];
      for (let i = 0; i < locationsData.getLocations.length; i++) {
        children.push(
          <Option key={locationsData.getLocations[i].id}>
            {locationsData.getLocations[i].name}
          </Option>
        );
      }
      setLocations(children);
    };
    if (locationsData) onCompleted(locationsData);
  }, [locationsData]);

  const onFinish = (values: any) => {
    addEvent({
      variables: {
        title: values.title,
        desc: values.desc,
        date: values.time,
        user_id: values.user,
        location_id: values.location,
      },
    });
  };

  return (
    <>
      <Row justify="center" style={{ marginTop: "25px" }}>
        <Col span={20}>
          <Skeleton title={true} loading={addLoad} active>
            <Card>
              <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                  label="Title"
                  required
                  name="title"
                  tooltip="This title is a required field."
                >
                  <Input placeholder="Enter event title" required />
                </Form.Item>
                <Form.Item label="Description" name="desc">
                  <TextArea placeholder="Enter event description." />
                </Form.Item>
                <Form.Item
                  label="Event Date Time"
                  tooltip="Event start time."
                  name="time"
                  initialValue={moment()}
                >
                  <DatePicker showTime />
                </Form.Item>
                <Form.Item label="User" name="user">
                  <Select showSearch placeholder="Select a user.">
                    {users}
                  </Select>
                </Form.Item>
                <Form.Item label="Location" name="location">
                  <Select showSearch placeholder="Select a location.">
                    {locations}
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Skeleton>
        </Col>
      </Row>
    </>
  );
}

export default NewPost;
