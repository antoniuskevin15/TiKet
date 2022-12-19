import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
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
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { personOutline, scanOutline, stopCircleOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { joinCircle, useStorage } from "../utils/service";
import "./JoinCircle.css";

const JoinCircle: React.FC = () => {
  const [err, setErr] = useState<string>();
  const [hideBg, setHideBg] = useState("");
  const [idCircle, setIdCircle] = useState("");
  const circleRef = useRef<HTMLIonInputElement>(null);
  const { auth } = useStorage();
  const history = useHistory();

  const onSubmit = async () => {
    const circleName: string = circleRef?.current?.value as string;
    console.log(circleName);
    try {
      const res = await joinCircle(auth.data!.token.value, circleName);
      auth.set(res);
      console.log(auth);
      history.push("/user/home");
    } catch (error: any) {
      console.log(error);
    }
  };

  const startScan = async () => {
    BarcodeScanner.hideBackground();
    // make background of WebView transparent
    setHideBg("hideBg");

    const result = await BarcodeScanner.startScan();
    // start scanning and wait for a result
    stopScan();

    // if the result has content
    if (result.hasContent) {
      console.log(result.content);
      setIdCircle(result.content!);
      present(result.content!, [{ text: "OK", role: "cancel" }]);
      // log the raw scanned content
    }
  };

  const stopScan = () => {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    setHideBg("");
  };

  const [present] = useIonAlert();

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const status = await BarcodeScanner.checkPermission({ force: true });

        if (status.granted) {
          return true;
        }

        return false;
      } catch (error: any) {
        setErr(error.message);
        console.log(error);
      }
    };

    checkPermission();

    return () => {};
  }, []);

  if (err) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/user/package" />
              <IonLabel className="header">
                <b>TikeT</b>
              </IonLabel>
              <IonIcon
                icon={personOutline}
                style={{ paddingLeft: "10px" }}
              ></IonIcon>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className={hideBg}>
          <IonGrid hidden={!!hideBg} className="ion-padding">
            {/* <IonRow className="ion-margin-bottom">
            <IonCol>
              <IonLabel className="header">
                <b>TikeT</b>
              </IonLabel>
              <IonIcon icon={personOutline} style={{ paddingLeft: "10px" }}></IonIcon>
            </IonCol>
          </IonRow> */}
            <IonRow>
              <IonCol>
                <IonButtons slot="end">
                  <IonButton color="danger" hidden={!hideBg} onClick={stopScan}>
                    <IonIcon icon={stopCircleOutline} slot="start" />
                    Stop Scan
                  </IonButton>
                </IonButtons>
              </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center">
              <IonCol className="ion-text-center">
                <IonLabel className="header">
                  <b>Join Circle</b>
                </IonLabel>
                <IonIcon
                  icon={personOutline}
                  style={{ paddingLeft: "10px" }}
                ></IonIcon>
                <IonLabel className="subheader">
                  <br />
                  Enter circle code or scan QR code!
                </IonLabel>
              </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center ion-margin">
              <IonCol>
                <IonItem className="input-register">
                  <IonLabel position="floating">Circle Name</IonLabel>
                  <IonInput
                    type="text"
                    placeholder="ID Circle"
                    value={idCircle ? idCircle : ""}
                    ref={circleRef}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center ion-text-center ion-margin-top">
              <IonCol>
                <IonButton
                  color="primary"
                  class="loginBtn"
                  onClick={onSubmit}
                  className="circle-join-button"
                >
                  Join Circle
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/user/package" />
            <IonLabel className="header">
              <b>TikeT</b>
            </IonLabel>
            <IonIcon
              icon={personOutline}
              style={{ paddingLeft: "10px" }}
            ></IonIcon>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className={hideBg}>
        <IonGrid hidden={!!hideBg} className="ion-padding">
          {/* <IonRow className="ion-margin-bottom">
            <IonCol>
              <IonLabel className="header">
                <b>TikeT</b>
              </IonLabel>
              <IonIcon icon={personOutline} style={{ paddingLeft: "10px" }}></IonIcon>
            </IonCol>
          </IonRow> */}
          <IonRow>
            <IonCol>
              <IonButtons slot="end">
                <IonButton color="danger" hidden={!hideBg} onClick={stopScan}>
                  <IonIcon icon={stopCircleOutline} slot="start" />
                  Stop Scan
                </IonButton>
              </IonButtons>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol className="ion-text-center">
              <IonLabel className="header">
                <b>Join Circle</b>
              </IonLabel>
              <IonIcon
                icon={personOutline}
                style={{ paddingLeft: "10px" }}
              ></IonIcon>
              <IonLabel className="subheader">
                <br />
                Enter circle code or scan QR code!
              </IonLabel>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center ion-margin">
            <IonCol>
              <IonItem className="input-register">
                <IonLabel position="floating">Circle Name</IonLabel>
                <IonInput
                  type="text"
                  placeholder="ID Circle"
                  value={idCircle ? idCircle : ""}
                  ref={circleRef}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-center">
              <IonLabel className="or-label">
                <h1>or</h1>
              </IonLabel>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center ion-text-center ion-margin-top">
            <IonCol>
              <IonButton className="circle-button" onClick={startScan}>
                <IonIcon icon={scanOutline} slot="start" />
                Start Scan
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center ion-text-center ion-margin-top">
            <IonCol>
              <IonButton
                color="primary"
                class="loginBtn"
                onClick={onSubmit}
                className="circle-join-button"
              >
                Join Circle
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <div hidden={!hideBg} className="scan-box" />
      </IonContent>
    </IonPage>
  );
};

export default JoinCircle;
