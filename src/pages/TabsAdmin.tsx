import {
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import React from "react";
import { homeOutline, personCircleOutline, giftOutline } from "ionicons/icons";
import { Redirect, Route } from "react-router";
import Home from './Home';
import PackageUser from './PackageUser';
import Profile from './Profile';
import { Switch } from 'react-router-dom';
import "./TabsAdmin.css";
import PackageDetailUser from "./PackageDetailUser";

const TabsAdmin: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        {/* <Switch> */}
          <Route path="/admin/home" component={Home} />
          <Route path="/admin/package" component={PackageUser} />
          <Route path="/admin/profile" component={Profile} />
          <Route path="/admin/package/detail/:id" component={PackageDetailUser} />
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
