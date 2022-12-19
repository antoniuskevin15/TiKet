import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { personOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import ExploreContainer from "../components/ExploreContainer";
import "./SelectCircle.css";

const SelectCircle: React.FC = () => {
  const history = useHistory();
  const goToCreate = () => {
    history.push("circle/create");
  };
  const goToJoin = () => {
    history.push("circle/join");
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons className="toolbarCreate" slot="start">
            <IonBackButton defaultHref="/user/package" />
            <IonLabel className="header">
              <b>TikeT</b>
            </IonLabel>
            <IonIcon icon={personOutline} style={{ paddingLeft: "10px" }}></IonIcon>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonGrid className="center ion-text-start ion-margin-horizontal gridSelect">
          <IonRow className="ion-text-start">
            <IonLabel color="primary" className="header ion-text-md-wrap">
              <b>Do you already have a TikeT's Circle?</b>
            </IonLabel>
          </IonRow>
          <IonRow className="ion-text-start">
            <IonLabel color="medium" className="subheader ion-text-md-wrap">
              Circle is a virtual environment used to manage your packages.
            </IonLabel>
          </IonRow>
          <IonRow className="ion-text-start ion-justify-content-center">
            <IonButton expand="block" fill="solid" className="btnSelect" onClick={goToJoin}>
              <IonLabel>Yes, join an existing Circle</IonLabel>
            </IonButton>
          </IonRow>
          <IonRow className="ion-text-start ion-justify-content-center">
            <IonButton expand="block" fill="solid" className="btnSelect" onClick={goToCreate}>
              <IonLabel>No, create a new one</IonLabel>
            </IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SelectCircle;
