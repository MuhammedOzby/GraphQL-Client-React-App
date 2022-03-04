import Home from "./pages/Home";

import {
  Routes,
  Route,
  useResolvedPath,
  useMatch,
  useNavigate,
} from "react-router-dom";

import { Tabs } from "antd";
const { TabPane } = Tabs;

function App() {
  let resolved = useResolvedPath("/");
  let match = useMatch({ path: resolved.pathname, end: true });
  const navigate = useNavigate();

  return (
    <div className="container">
      <Tabs
        activeKey={match?.pathname ? match.pathname : ""}
        onChange={(key) => {
          navigate(`${key}`);
        }}
        centered
      >
        <TabPane tab="Home" key="/"></TabPane>
        <TabPane tab="Tab 2" key="/about"></TabPane>
        <TabPane tab="Tab 3" key="/test"></TabPane>
      </Tabs>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
