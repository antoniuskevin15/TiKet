import {
  IonBackButton,
  IonButton,
  IonButtons,
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
  useIonAlert,
} from "@ionic/react";
import { personOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import ExploreContainer from "../components/ExploreContainer";
import { getPackageById, togglePackage, useStorage } from "../utils/service";
import "./UnknownPackageConfirmUser.css";

interface Package {
  created_at: string;
  expedition: string;
  id: number;
  isTaken: number;
  photoPath: string;
  receiptNumber: string;
  status: "ongoing" | "finished" | "unknown";
  sender: string;
  updated_id: string;
  user_id: number;
  updated_at: string;
}

const UnknownPackageConfirmUser: React.FC = () => {
  const location = useLocation();
  const packageDataS: any = location.state;
  const history = useHistory();
  const satuRef = useRef<HTMLIonInputElement>(null);
  const duaRef = useRef<HTMLIonInputElement>(null);
  const tigaRef = useRef<HTMLIonInputElement>(null);
  const empatRef = useRef<HTMLIonInputElement>(null);
  const { auth } = useStorage();
  const [presentAlert] = useIonAlert();

  console.log(packageDataS);

  const handleTakePackage = async () => {};

  const handleNextInput = (event: any, prev: number, next: number) => {
    if (event.key !== "Backspace" && next != -1 && event.keyCode >= 48 && event.keyCode <= 57) {
      switch (next) {
        case 1:
          setTimeout(() => duaRef.current?.setFocus(), 50);
          break;
        case 2:
          setTimeout(() => tigaRef.current?.setFocus(), 50);
          break;
        case 3:
          setTimeout(() => empatRef.current?.setFocus(), 50);
        // const form = event.target.form;
        // const index = [...form].indexOf(event.target);
        // if (index >= 0 && index < 3) {
        //   form[index + 1].focus();
        //   event.preventDefault();
        // }
      }
    } else if (event.key === "Backspace" && prev != -1) {
      // const form = event.target.form;
      // const index = [...form].indexOf(event.target);
      // if (index > 0 && index < 4) {
      //   form[index - 1].focus();
      //   event.preventDefault();
      // }
      switch (prev) {
        case 0:
          setTimeout(() => satuRef.current?.setFocus(), 50);
          break;
        case 1:
          setTimeout(() => duaRef.current?.setFocus(), 50);
          break;
        case 2:
          setTimeout(() => tigaRef.current?.setFocus(), 50);
      }
    }
  };

  const submitForm = () => {
    const satu: string = satuRef?.current?.value as string;
    const dua: string = duaRef?.current?.value as string;
    const tiga: string = tigaRef?.current?.value as string;
    const empat: string = empatRef?.current?.value as string;

    const input = satu + dua + tiga + empat;
    console.log(satu + dua + tiga + empat);
    const packageCur: Package = packageDataS.packages;
    const lastString = packageCur?.receiptNumber?.substring(
      packageCur?.receiptNumber?.length - 4,
      packageCur?.receiptNumber?.length
    );
    console.log(lastString);
    if (lastString == input) {
      triggerApiCall("finished");
    } else {
      presentAlert({
        header: "Error",
        message: "Nomor resi tidak sesuai!",
        buttons: ["OK"],
      });
    }
  };

  const triggerApiCall = async (status: "finished" | "unknown") => {
    try {
      const packageCur: Package = packageDataS.packages;
      await togglePackage(auth?.data?.token?.value, packageCur.id, status, auth?.data?.user?.id);
      window.location.href = "/user/package";
    } catch (error: any) {
      presentAlert({
        header: "Error",
        message: error.message,
        buttons: ["OK"],
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="toolbarDetail">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/user/package" />
          </IonButtons>
          <IonTitle>Package</IonTitle>
        </IonToolbar>
      </IonHeader>
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
                  type="tel"
                  maxlength={1}
                  autofocus
                  className="resiInput"
                  inputmode="tel"
                  onKeyDown={(e) => handleNextInput(e, -1, 1)}
                  ref={satuRef}
                />
              </IonCol>
              <IonCol>
                <IonInput
                  type="tel"
                  maxlength={1}
                  className="resiInput"
                  inputmode="tel"
                  onKeyDown={(e) => handleNextInput(e, 0, 2)}
                  ref={duaRef}
                />
              </IonCol>
              <IonCol>
                <IonInput
                  type="tel"
                  maxlength={1}
                  className="resiInput"
                  inputmode="tel"
                  onKeyDown={(e) => handleNextInput(e, 1, 3)}
                  ref={tigaRef}
                />
              </IonCol>
              <IonCol>
                <IonInput
                  type="tel"
                  maxlength={1}
                  className="resiInput"
                  inputmode="tel"
                  onKeyDown={(e) => handleNextInput(e, 2, -1)}
                  ref={empatRef}
                />
              </IonCol>
            </IonRow>
          </form>
          <IonRow className="ion-text-start ion-justify-content-center">
            <IonButton expand="block" fill="solid" className="btnSelect" onClick={submitForm}>
              <IonLabel>confirm</IonLabel>
            </IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default UnknownPackageConfirmUser;
