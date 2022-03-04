import { List, Row, Col, Skeleton, Card, Collapse } from "antd";

import { gql, useQuery } from "@apollo/client";

const EVENTS = gql`
  query getEvents {
    getEvents {
      id
      title
      desc
      date
      participant {
        user {
          username
        }
      }
    }
  }
`;

const { Panel } = Collapse;
/**
 * ? Liste bir skeleton içerisine alınarak loading mesajının gösterimi kaldırıldı.
 * ? Katılımcılar (Participants) Açılabilir bir panelin içindeki listeden gösterilmektedir.
 * * Etkinlikler Title, date, desc ile gösterilmektedir.
 * ! İki return olan bir yapı yazılmadığı için data gelene kadar boş dizi verildi.
 */
function Home() {
  const { loading, data } = useQuery(EVENTS);
  return (
    <>
      <Row justify="center">
        <Col span={20}>
          <Skeleton title={true} loading={loading} active>
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
          </Skeleton>
        </Col>
      </Row>
    </>
  );
}

export default Home;
