import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import AnimeList from "./pages/AnimeList";
import AnimeDetails from "./pages/AnimeDetails";
import NotFound from "./pages/NotFound";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="AnimeList" element={<AnimeList />} />
                    <Route path="Anime-detail/:id" element={<AnimeDetails />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
}
