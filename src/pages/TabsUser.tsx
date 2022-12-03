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
import Package from './PackageUser';
import Profile from './Profile';
//home waktu itu isiny ap y, w lupa :v
const TabsUser: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/main/home" component={Home} />
        <Route path="/main/package" component={Package} />
        <Route path="/main/profile" component={Profile} />
        <Redirect exact path="/main" to="/main/home" />
      </IonRouterOutlet>
      <IonTabBar slot="bottom" color="secondary">
        <IonTabButton tab="mail" href="/user/home">
          <IonIcon icon={homeOutline} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="meet" href="/user/package">
          <IonIcon icon={giftOutline} />
          <IonLabel>Package</IonLabel>
        </IonTabButton>
        <IonTabButton tab="meet" href="/user/profile">
          <IonIcon icon={personCircleOutline} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabsUser;
