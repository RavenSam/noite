import { lazy } from "solid-js";
import { Routes, Route } from "@solidjs/router";
import { HopeProvider, NotificationsProvider } from "@hope-ui/solid";

import SideNav from "~/components/ui/SideNav";
import AppWindow from "~/components/ui/AppWindow";
import { config } from "~/components/ui/theme";
import { GlobalContextProvider } from "~/context/store";

const Notes = lazy(() => import("~/pages/Notes"));
const Settings = lazy(() => import("~/pages/Settings"));

export default function App() {
   return (
      <>
         <HopeProvider config={config}>
            <NotificationsProvider placement="bottom-end">

               <AppWindow />
               
               <GlobalContextProvider>
                  <SideNav>
                     <Routes>
                        <Route path="/settings" component={Settings} />

                        <Route path="/" component={Notes} />
                     </Routes>
                  </SideNav>
               </GlobalContextProvider>
            </NotificationsProvider>
         </HopeProvider>
      </>
   );
}
