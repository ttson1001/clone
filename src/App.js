import { BrowserRouter,  Route, Routes } from "react-router-dom";
import "./App.css";
import Project from "./pages/Projects/Project";
import Default from "./pages/Deafault";
import ProjectList from "./pages/ProjectList";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Default/>}>
      <Route index element={<ProjectList />} />
      <Route path="/project" element={<Project/>}/>
      <Route path="/project-list" element={<ProjectList/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
    
  );
}

export default App;
