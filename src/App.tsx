import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import SharedLayout from "./pages/SharedLayout";
import Yoga from "./pages/Yoga";
import YogaDetails from "./pages/YogaDetails";
import AddYoga from "./pages/AddYoga";
import EditYoga from "./pages/EditYoga";

function App() {
  return (
    <Routes>
      <Route path="" element={<SharedLayout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/yoga" element={<Yoga />}></Route>
        <Route path="/yoga/:id" element={<YogaDetails />}></Route>
        <Route path="/create-yoga" element={<AddYoga />}></Route>
        <Route path="/edit-yoga/:id" element={<EditYoga />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
