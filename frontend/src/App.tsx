import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/dashboard/:email" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
