import StudioNavigation from "./components/studio/StudioNavigation";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudioSpotlight from "./components/studio/StudioSpotlight";
import RouteMetadata from "./components/studio/RouteMetadata";
import NotFound from "./pages/NotFound";

const Studio = lazy(() => import("./pages/Studio"));
const StudioSearch = lazy(() => import("./pages/StudioSearch"));
const StudioCollection = lazy(() => import("./pages/StudioCollection"));
const StudioDetail = lazy(() => import("./pages/StudioDetail"));
const StudioResume = lazy(() => import("./pages/StudioResume"));


const App = () => (
      <BrowserRouter>
        <RouteMetadata />
        <StudioNavigation />
        <StudioSpotlight />
        <Routes>
          <Route path="/" element={<Suspense fallback={<div role="status">Loading studio…</div>}><Studio /></Suspense>} />
          <Route path="/studio" element={<Suspense fallback={<div role="status">Loading studio…</div>}><Studio /></Suspense>} />
          <Route path="/studio/search" element={<Suspense fallback={<div role="status">Loading search…</div>}><StudioSearch /></Suspense>} />
          <Route path="/studio/resume" element={<Suspense fallback={<div role="status">Loading resume…</div>}><StudioResume /></Suspense>} />
          {["work", "lab"].map((kind: "work" | "lab") => <Route key={kind} path={`/studio/${kind}`} element={<Suspense fallback={<div role="status">Loading collection…</div>}><StudioCollection kind={kind} /></Suspense>} />)}
          {["work", "lab"].map((kind: "work" | "lab") => <Route key={kind} path={`/studio/${kind}/:id`} element={<Suspense fallback={<div role="status">Loading details…</div>}><StudioDetail kind={kind} /></Suspense>} />)}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
);

export default App;
