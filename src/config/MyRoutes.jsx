import { Route, Routes } from "react-router";
import App from "../App";
import ShortenerPage from "../components/ShortenerPage";

const MyRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/shorten" element={<ShortenerPage />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
    )
}

export default MyRoutes;