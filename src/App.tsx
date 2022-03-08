import Home from "./pages/Home";

import {
  Routes,
  Route,
  useResolvedPath,
  useMatch,
  useNavigate,
} from "react-router-dom";

import { Layout, Menu } from "antd";
import NewPost from "./pages/NewEvent";
import { HomeOutlined, UsergroupAddOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

function App() {
  let resolved = useResolvedPath("/");
  let match = useMatch({ path: resolved.pathname, end: true });
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <Menu
          theme="dark"
          onClick={(menu) => {
            navigate(`${menu.key}`);
          }}
          selectedKeys={[match?.pathname ? match.pathname : ""]}
          mode="horizontal"
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            Home Page
          </Menu.Item>
          <Menu.Item key="/new-event" icon={<UsergroupAddOutlined />}>
            New Event
          </Menu.Item>
        </Menu>
      </Header>
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-event" element={<NewPost />} />
        </Routes>
      </Content>
    </>
  );
}

export default App;
