import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import React, { useEffect } from "react";
import { homeOutline, personCircleOutline, giftOutline } from "ionicons/icons";
import { Redirect, Route, useHistory } from "react-router";
import Home from "./Home";
import Profile from "./Profile";
import { Switch } from "react-router-dom";
import "./TabsUser.css";
import PackageDetailUser from "./PackageDetailUser";
import { useStorage } from "../utils/service";
import ProfileEdit from "./ProfileEdit";
import UnknownPackageConfirmUser from "./UnknownPackageConfirmUser";
import PackageList from "./PackageList";

const TabsUser: React.FC = () => {
  const { auth } = useStorage();
  const history = useHistory();

  return (
    <IonTabs>
      <IonRouterOutlet>
        {/* <Switch> */}
        <Route path="/user/home" component={Home} />
        <Route path="/user/package" exact={true} component={PackageList} />
        <Route path="/user/package/unknown/confirm" component={UnknownPackageConfirmUser} />
        <Route path="/user/package/detail/:idPackage" component={PackageDetailUser} />
        <Route path="/user/profile" component={Profile} />
        <Route path="/user/editProfile" component={ProfileEdit} />
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
