import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  ThemedLayout,
  ThemedSider,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { AlbumCreate, AlbumEdit, AlbumList, AlbumShow } from "./pages/albums";
import {
  ArtistCreate,
  ArtistEdit,
  ArtistList,
  ArtistShow,
} from "./pages/artists";
import { GenreCreate, GenreEdit, GenreList, GenreShow } from "./pages/genres";
import { SongCreate, SongEdit, SongList, SongShow } from "./pages/songs";
import { UserCreate, UserEdit, UserList, UserShow } from "./pages/users";
import { Login } from "./pages/login";
import { dataProvider } from "./providers/data";
import { authProvider } from "./providers/authProvider";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                authProvider={authProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerProvider}
                resources={[
                  {
                    name: "genre",
                    list: "/genres",
                    create: "/genres/create",
                    edit: "/genres/edit/:id",
                    show: "/genres/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "artist",
                    list: "/artists",
                    create: "/artists/create",
                    edit: "/artists/edit/:id",
                    show: "/artists/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "album",
                    list: "/albums",
                    create: "/albums/create",
                    edit: "/albums/edit/:id",
                    show: "/albums/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "song",
                    list: "/songs",
                    create: "/songs/create",
                    edit: "/songs/edit/:id",
                    show: "/songs/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "user",
                    list: "/users",
                    create: "/users/create",
                    edit: "/users/edit/:id",
                    show: "/users/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  projectId: "FXs4cg-tJNyCm-VBU9J3",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayout
                          Header={() => <Header sticky />}
                          Sider={(props) => <ThemedSider {...props} fixed />}
                        >
                          <Outlet />
                        </ThemedLayout>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="genre" />}
                    />
                    <Route path="/genres">
                      <Route index element={<GenreList />} />
                      <Route path="create" element={<GenreCreate />} />
                      <Route path="edit/:id" element={<GenreEdit />} />
                      <Route path="show/:id" element={<GenreShow />} />
                    </Route>
                    <Route path="/artists">
                      <Route index element={<ArtistList />} />
                      <Route path="create" element={<ArtistCreate />} />
                      <Route path="edit/:id" element={<ArtistEdit />} />
                      <Route path="show/:id" element={<ArtistShow />} />
                    </Route>
                    <Route path="/albums">
                      <Route index element={<AlbumList />} />
                      <Route path="create" element={<AlbumCreate />} />
                      <Route path="edit/:id" element={<AlbumEdit />} />
                      <Route path="show/:id" element={<AlbumShow />} />
                    </Route>
                    <Route path="/songs">
                      <Route index element={<SongList />} />
                      <Route path="create" element={<SongCreate />} />
                      <Route path="edit/:id" element={<SongEdit />} />
                      <Route path="show/:id" element={<SongShow />} />
                    </Route>
                    <Route path="/users">
                      <Route index element={<UserList />} />
                      <Route path="create" element={<UserCreate />} />
                      <Route path="edit/:id" element={<UserEdit />} />
                      <Route path="show/:id" element={<UserShow />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
