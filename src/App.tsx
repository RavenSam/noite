import { lazy } from "solid-js"
import { Routes, Route } from "@solidjs/router"
import { HopeProvider, NotificationsProvider } from "@hope-ui/solid"

import SideNav from "~/components/ui/SideNav"
import AppWindow from "~/components/ui/AppWindow"
import { config } from "~/components/ui/theme"
import { GlobalContextProvider } from "~/context/store"

import Notes from "~/pages/Notes"
const Settings = lazy(() => import("~/pages/Settings"))
const Folders = lazy(() => import("~/pages/Folders"))
const Folder = lazy(() => import("~/pages/Folder"))

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

                        <Route path="/folders" component={Folders} />

                        <Route path="/folders/:id" component={Folder} />

                        <Route path="/" component={Notes} />
                     </Routes>
                  </SideNav>
               </GlobalContextProvider>
            </NotificationsProvider>
         </HopeProvider>
      </>
   )
}
