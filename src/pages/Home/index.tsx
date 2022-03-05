import { List, Row, Col, Skeleton, Card, Collapse, Badge } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { EVENTS, EVENT_SUBS } from "./querys";

const { Panel } = Collapse;
/**
 * ? Liste bir skeleton içerisine alınarak loading mesajının gösterimi kaldırıldı.
 * ? Katılımcılar (Participants) Açılabilir bir panelin içindeki listeden gösterilmektedir.
 * * Etkinlikler Title, date, desc ile gösterilmektedir.
 * ! İki return olan bir yapı yazılmadığı için data gelene kadar boş dizi verildi.
 */
function Home() {
  const [count, setCount] = useState(0);
  const { loading, data, subscribeToMore } = useQuery(EVENTS);

  // * Data yüklendiğinde data uzunluğunu badge için olan "count" state değişkenine atama
  useEffect(() => {
    const onCompleted = (data: any) => {
      const counter: number = data.getEvents.length;
      setCount(counter);
    };
    if (data) onCompleted(data);
  }, [data]);

  // * Subscripe işlemlerinde datayı yenileme
  useEffect(() => {
    subscribeToMore({
      document: EVENT_SUBS,
      updateQuery: (prev, { subscriptionData }) => {
        const newArray = [
          subscriptionData.data.eventCreated,
          ...prev.getEvents,
        ];
        const counter: number = newArray.length;
        setCount(counter);
        return {
          getEvents: newArray,
        };
      },
    });
  }, []);

  return (
    <>
      <Row justify="center">
        <Col span={20}>
          <Skeleton title={true} loading={loading} active>
            <Badge count={count}>
              <List
                itemLayout="horizontal"
                dataSource={data ? data.getEvents : []}
                renderItem={(item: any) => (
                  <List.Item>
                    <Card size="small" title={item.title} extra={item.date}>
                      <p>{item.desc}</p>
                      <Collapse>
                        <Panel header="Participants" key={item.id}>
                          <List
                            size="small"
                            bordered
                            dataSource={item.participant}
                            renderItem={(item: any) => (
                              <List.Item>{item.user.username}</List.Item>
                            )}
                          />
                        </Panel>
                      </Collapse>
                    </Card>
                  </List.Item>
                )}
              />
            </Badge>
          </Skeleton>
        </Col>
      </Row>
    </>
  );
}

export default Home;
