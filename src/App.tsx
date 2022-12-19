import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import TabsUser from "./pages/TabsUser";
import SelectCircle from "./pages/SelectCircle";
import CreateCircle from "./pages/CreateCircle";
import TabsAdmin from "./pages/TabsAdmin";
import JoinCircle from "./pages/JoinCircle";
import { StorageProvider } from "./utils/StorageContext";
import { App as AppCap } from "@capacitor/app";
import { useEffect } from "react";
import { useStorage } from "./utils/service";

setupIonicReact();

const App: React.FC = () => {
  AppCap.addListener("backButton", ({ canGoBack }) => {
    // event.detail.register(10, () => {
    //   console.log('Handler was called!');
    // });
    if (!canGoBack) {
      AppCap.exitApp();
    } else {
      window.history.back();
    }
  });

  return (
    <IonApp>
      <IonReactRouter>
        <Switch>
          <StorageProvider>
            <IonRouterOutlet>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/select" component={SelectCircle} />
              <Route exact path="/circle/create" component={CreateCircle} />
              <Route exact path="/circle/join" component={JoinCircle} />
              {/* <Route exact path="/join" component={JoinCircle} /> */}
              <Route path="/user">
                <TabsUser />
              </Route>
              <Route path="/admin">
                <TabsAdmin />
              </Route>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
            </IonRouterOutlet>
          </StorageProvider>
          <Route exact path="/*">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
