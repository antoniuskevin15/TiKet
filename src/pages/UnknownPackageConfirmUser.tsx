import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { personOutline } from "ionicons/icons";
import { useHistory, useLocation } from "react-router";
import ExploreContainer from "../components/ExploreContainer";
import { Package } from "../types/type";
import { getPackageById, togglePackage, useStorage } from "../utils/service";
import "./UnknownPackageConfirmUser.css";

const UnknownPackageConfirmUser: React.FC = () => {
  const location = useLocation();
  const packageDataS: Package = location.state as Package;
  const history = useHistory();
  const { auth } = useStorage();

  console.log(packageDataS);

  const handleTakePackage = async () => {};

  const handleNextInput = (event: any) => {
    if (
      (event.key !== "Backspace" && event.keyCode >= 48 && event.keyCode <= 57) ||
      (event.keyCode >= 65 && event.keyCode <= 90)
    ) {
      const form = event.target.form;
      const index = [...form].indexOf(event.target);
      if (index >= 0 && index < 3) {
        form[index + 1].focus();
        event.preventDefault();
      }
    } else if (event.key === "Backspace") {
      const form = event.target.form;
      const index = [...form].indexOf(event.target);
      if (index > 0 && index < 4) {
        form[index - 1].focus();
        event.preventDefault();
      }
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonLabel className="header">
                <b>TikeT</b>
              </IonLabel>
              <IonIcon icon={personOutline} style={{ paddingLeft: "10px" }}></IonIcon>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid className="center ion-text-start ion-margin-horizontal gridSelect">
          <IonRow className="ion-text-start">
            <IonLabel color="primary" className="header ion-text-md-wrap">
              <b>Please Insert the Last 4 Number</b>
            </IonLabel>
          </IonRow>
          <IonRow className="ion-text-start">
            <IonLabel color="medium" className="subheader ion-text-md-wrap">
              on your package receipt
            </IonLabel>
          </IonRow>
          <form>
            <IonRow>
              <IonCol>
                <IonInput
                  type="text"
                  maxlength={1}
                  autofocus
                  className="resiInput"
                  onKeyUp={(e) => handleNextInput(e)}
                />
              </IonCol>
              <IonCol>
                <IonInput type="text" maxlength={1} className="resiInput" onKeyUp={(e) => handleNextInput(e)} />
              </IonCol>
              <IonCol>
                <IonInput type="text" maxlength={1} className="resiInput" onKeyUp={(e) => handleNextInput(e)} />
              </IonCol>
              <IonCol>
                <IonInput type="text" maxlength={1} className="resiInput" onKeyUp={(e) => handleNextInput(e)} />
              </IonCol>
            </IonRow>
          </form>
          <IonRow className="ion-text-start ion-justify-content-center">
            <IonButton expand="block" fill="solid" className="btnSelect" onClick={handleTakePackage}>
              <IonLabel>confirm</IonLabel>
            </IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default UnknownPackageConfirmUser;
