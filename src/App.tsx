import { lazy } from "solid-js";
import { Routes, Route } from "@solidjs/router";
import { HopeProvider } from "@hope-ui/solid";

import SideNav from "./components/ui/SideNav";

const Notes = lazy(() => import("./pages/Notes"));
const Home = lazy(() => import("./pages/Home"));

export default function App() {
   return (
      <>
         <HopeProvider>
            <SideNav>
               <Routes>
                  <Route path="/notes" component={Notes} />
                  <Route path="/" component={Home} />
               </Routes>
            </SideNav>
         </HopeProvider>
      </>
   );
}
