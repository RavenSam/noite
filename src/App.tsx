import { lazy } from "solid-js";
import { Routes, Route } from "@solidjs/router";
import { HopeProvider } from "@hope-ui/solid";

import SideNav from "./components/ui/SideNav";

const Notes = lazy(() => import("./pages/Notes"));
const Settings = lazy(() => import("./pages/Settings"));

export default function App() {
   return (
      <>
         <HopeProvider>
            <SideNav>
               <Routes>
                  <Route path="/settings" component={Settings} />
                  <Route path="/" component={Notes} />
               </Routes>
            </SideNav>
         </HopeProvider>
      </>
   );
}
