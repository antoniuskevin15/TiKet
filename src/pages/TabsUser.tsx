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
import "./TabsUser.css";
import PackageDetailUser from "./PackageDetailUser";

const TabsUser: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        {/* <Switch> */}
          <Route path="/user/home" component={Home} />
          <Route path="/user/package" component={PackageUser} />
          <Route path="/user/profile" component={Profile} />
          <Route path="/user/package/detail/:id" component={PackageDetailUser} />
          <Redirect exact path="/user" to="/user/home" />
        {/* </Switch> */}
      </IonRouterOutlet>
      <IonTabBar slot="bottom" color="light">
        <IonTabButton tab="home" href="/user/home">
          <IonIcon icon={homeOutline} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="package" href="/user/package">
          <IonIcon icon={giftOutline} />
          <IonLabel>Package</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/user/profile">
          <IonIcon icon={personCircleOutline} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabsUser;
