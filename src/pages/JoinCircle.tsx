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
  IonSpinner,
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<{ name: string; roomNo: string }>();

  const [hideBg, setHideBg] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const { auth } = useStorage();
  const history = useHistory();
  const [presentAlert] = useIonAlert();

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const res = await joinCircle(auth.data!.token.value, data.name, data.roomNo);
      const tempAuthData = auth.data;
      tempAuthData.user.circle_id = res.data.circle_id;
      tempAuthData.user.roomNumber = res.data.roomNumber;
      auth.set(tempAuthData);
      history.push("/user/home");
    } catch (error: any) {
      presentAlert({
        header: "Error",
        message: error.response.data.message,
        buttons: ["OK"],
        onDidDismiss: () => {
          const errorState = Object.keys(error.response.data.error)[0];
          console.log(errorState);
          setError(
            errorState as any,
            { type: "focus", message: error.response.data.error[errorState] },
            {
              shouldFocus: true,
            }
          );
        },
      });
    } finally {
      setLoading(false);
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
      setValue("name", result.content as string);
      presentAlert({
        header: "Scan Result",
        message: result.content,
        buttons: ["OK"],
      });
    }
  };

  const stopScan = () => {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    setHideBg("");
  };

  const checkPermission = async () => {
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        return true;
      }
      return false;
    } catch (error: any) {
      // setErr(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    checkPermission();
  }, []);

  // if (err) {
  //   return (
  //     <IonPage className="ion-padding">
  //       <IonHeader>
  //         <IonToolbar className="toolbarJoin">
  //           <IonButtons className="toolbarJoin" slot="start">
  //             <IonBackButton defaultHref="/user/package" />
  //             <IonLabel className="header">
  //               <b>TikeT</b>
  //             </IonLabel>
  //             <IonIcon
  //               icon={personOutline}
  //               style={{ paddingLeft: "10px" }}
  //             ></IonIcon>
  //           </IonButtons>
  //         </IonToolbar>
  //       </IonHeader>
  //       <IonContent className={hideBg}>
  //         <IonGrid hidden={!!hideBg} className="ion-padding">
  //           {/* <IonRow className="ion-margin-bottom">
  //           <IonCol>
  //             <IonLabel className="header">
  //               <b>TikeT</b>
  //             </IonLabel>
  //             <IonIcon icon={personOutline} style={{ paddingLeft: "10px" }}></IonIcon>
  //           </IonCol>
  //         </IonRow> */}
  //           <IonRow>
  //             <IonCol>
  //               <IonButtons slot="end">
  //                 <IonButton color="danger" hidden={!hideBg} onClick={stopScan}>
  //                   <IonIcon icon={stopCircleOutline} slot="start" />
  //                   Stop Scan
  //                 </IonButton>
  //               </IonButtons>
  //             </IonCol>
  //           </IonRow>
  //           <IonRow className="ion-justify-content-center">
  //             <IonCol className="ion-text-center">
  //               <IonLabel className="header">
  //                 <b>Join Circle</b>
  //               </IonLabel>
  //               <IonIcon
  //                 icon={personOutline}
  //                 style={{ paddingLeft: "10px" }}
  //               ></IonIcon>
  //               <IonLabel className="subheader">
  //                 <br />
  //                 Enter circle code or scan QR code!
  //               </IonLabel>
  //             </IonCol>
  //           </IonRow>
  //           <IonRow className="ion-justify-content-center ion-margin">
  //             <IonCol>
  //               <IonItem className="input-register">
  //                 <IonLabel position="floating">Circle Name</IonLabel>
  //                 <IonInput
  //                   type="text"
  //                   placeholder="ID Circle"
  //                   value={idCircle ? idCircle : ""}
  //                   ref={circleRef}
  //                 ></IonInput>
  //               </IonItem>
  //             </IonCol>
  //           </IonRow>
  //           <IonRow className="ion-justify-content-center ion-text-center ion-margin-top">
  //             <IonCol>
  //               <IonButton
  //                 color="primary"
  //                 class="loginBtn"
  //                 onClick={onSubmit}
  //                 className="circle-join-button"
  //               >
  //                 Join Circle
  //               </IonButton>
  //             </IonCol>
  //           </IonRow>
  //         </IonGrid>
  //       </IonContent>
  //     </IonPage>
  //   );
  // }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar >
          <IonButtons className="toolbarJoin" slot="start">
            <IonBackButton defaultHref="/user/package" />
            <IonLabel className="header">
              <b>TikeT</b>
            </IonLabel>
            <IonIcon icon={personOutline} style={{ paddingLeft: "10px" }}></IonIcon>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className={hideBg}>
        <IonGrid hidden={!!hideBg} className="ion-padding">
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <IonRow className="ion-justify-content-center">
              <IonCol className="ion-text-center">
                <IonLabel className="header">
                  <b>Join Circle</b>
                </IonLabel>
                <IonIcon icon={personOutline} style={{ paddingLeft: "10px" }}></IonIcon>
                <IonLabel className="subheader">
                  <br />
                  Enter circle code or scan QR code!
                </IonLabel>
              </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center ion-margin-top">
              <IonCol size="9">
                <IonItem className="input-register">
                  <IonLabel position="floating">Circle Name</IonLabel>
                  <IonInput
                    placeholder="Input your circle name"
                    {...register("name", { required: "Circle name is required" })}
                  />
                </IonItem>
              </IonCol>
              <IonCol size="3">
                <IonButton
                  className="circle-button ion-align-items-center ion-justify-content-center"
                  onClick={startScan}
                  type="button"
                  expand="block"
                >
                  <IonIcon icon={scanOutline} />
                </IonButton>
              </IonCol>
            </IonRow>
            {errors.name && (
              <IonRow>
                <IonCol>
                  <IonText className="input-error ion-padding" color="danger">
                    {errors.name.message}
                  </IonText>
                </IonCol>
              </IonRow>
            )}
            <IonRow>
              <IonCol>
                <IonItem className="input-register">
                  <IonLabel position="floating">Room Number</IonLabel>
                  <IonInput
                    placeholder="Input your room number"
                    {...register("roomNo", { required: "Room number is required" })}
                  />
                </IonItem>
                {errors.roomNo && (
                  <IonText className="input-error ion-padding" color="danger">
                    {errors.roomNo.message}
                  </IonText>
                )}
              </IonCol>
            </IonRow>

            <IonRow className="ion-text-center ion-margin-top">
              <IonCol>
                <IonButton type="submit" color="primary" class="loginBtn" className="circle-join-button" expand="block">
                  {loading ? <IonSpinner /> : "Join Circle"}
                </IonButton>
              </IonCol>
            </IonRow>
          </form>
        </IonGrid>
        <div hidden={!hideBg} className="scan-box" />
      </IonContent>
    </IonPage>
  );
};

export default JoinCircle;
