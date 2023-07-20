import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Project from "./pages/Projects/Project";
import Default from "./pages/Deafault";
import ProjectList from "./pages/ProjectList/ProjectList";
import Error from "./pages/Error/Error";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Default />}>
          <Route index element={<ProjectList />} />
          <Route path="/project" element={<Project />}>
            <Route path=":projectId" element={<Project/>} />
          </Route>
          <Route path="/project-list" element={<ProjectList />} />
        </Route>
     
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Navigate to="/project-list" />}/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
