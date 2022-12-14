import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import React, { useEffect } from "react";
import { homeOutline, personCircleOutline, giftOutline } from "ionicons/icons";
import { Redirect, Route, useHistory } from "react-router";
import Home from "./Home";
import Profile from "./Profile";
import { Switch } from "react-router-dom";
import "./TabsAdmin.css";
import AddPackageAdmin from "./PackageAddAdmin";
import HomeAdmin from "./HomeAdmin";
import { useStorage } from "../utils/service";
import ProfileEdit from "./ProfileEdit";
import PackageList from "./PackageList";
import Splash from "./Splash";

const TabsAdmin: React.FC = () => {
  const { auth } = useStorage();
  const history = useHistory();

  return (
    <IonTabs>
      <IonRouterOutlet>
        {/* <Switch> */}
        <Route path="/admin/home" component={HomeAdmin} />
        <Route exact path="/admin/package" component={PackageList} />
        <Route path="/admin/package/edit/:id?" component={AddPackageAdmin} />
        <Route path="/admin/profile" component={Profile} />
        <Route path="/admin/editProfile" component={ProfileEdit} />
        <Route path="/admin/splash" component={Splash} />
        <Redirect exact path="/admin" to="/admin/home" />
        {/* </Switch> */}
      </IonRouterOutlet>
      <IonTabBar slot="bottom" color="light">
        <IonTabButton tab="home" href="/admin/home">
          <IonIcon icon={homeOutline} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="package" href="/admin/package">
          <IonIcon icon={giftOutline} />
          <IonLabel>Package</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/admin/profile">
          <IonIcon icon={personCircleOutline} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabsAdmin;
