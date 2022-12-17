import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonModal,
} from "@ionic/react";
import { createOutline, logOutOutline, personOutline, qrCodeOutline } from "ionicons/icons";
import { useRef, useState } from "react";
import { CircleQRCode } from "../components/CircleQRCode";
import "./Profile.css";

import { QRData } from "../data/QRData";
import { authLogout, getCircle, useStorage } from "../utils/service";
import { useHistory } from "react-router";

const Profile: React.FC = () => {
  const pageRef = useRef();
  const [selectedCode, setSelectedCode] = useState<QRData>();
  const history = useHistory();

  const [present, dismiss] = useIonModal(CircleQRCode, {
    dismiss: () => dismiss(),
    code: selectedCode,
  });

  const showQR = async () => {
    const res = await getCircle(auth.data!.token.value, auth.data!.user.circle_id);
    const circle = [res.data];
    {
      circle.map((c) => {
        const qrCode: QRData = {
          id: auth.data!.user.name,
          data: c.name,
        };
        setSelectedCode(qrCode);
        console.log("QR SHOWN");
        console.log(qrCode.id);
        console.log(qrCode.data);

        present({
          presentingElement: pageRef.current,
          swipeToClose: true,
        });
      });
    }
  };

  const handleLogout = async () => {
    try {
      await authLogout(auth.data!.token.value);
      auth.set(null);
      history.push("/login");
    } catch (error: any) {
      console.log(error);
    }
  };

  const { auth } = useStorage();

  var divStyle = {
    // backgroundImage: 'url(' + auth.data?.user.gambar + ')'
    background: "url(../assets/profile.jpeg)",
  };
  // useEffect(()=>{
  //   if(auth.data){
  //     takePackage();
  //   }
  // }, [auth.data]);

  return (
    <IonPage ref={pageRef}>
      <IonContent fullscreen class="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size-sm="12" size-md="8" offset-md="2">
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonLabel className="header">
                      <b>TikeT</b>
                    </IonLabel>
                    <IonIcon icon={personOutline} style={{ paddingLeft: "10px" }}></IonIcon>
                  </IonCol>
                </IonRow>
                <IonCard className="ion-padding">
                  <IonGrid className="ion-text-center">
                    <IonRow className="ion-margin-horizontal ion-justify-content-end"></IonRow>
                    <IonRow className="ion-justify-content-center">
                      <div className="ion-margin profile_image" style={divStyle} />
                      <IonButton className="btnEdit" fill="solid">
                        <IonIcon
                          className="editIcon"
                          src={createOutline}
                          name="create"
                          ios="ios-create"
                          md="md-create"
                        ></IonIcon>
                      </IonButton>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                      <IonLabel color="primary">
                        <h1>
                          <b>{auth.data?.user.name}</b>
                        </h1>
                      </IonLabel>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                      <IonLabel className="ion-margin-top">
                        <h2>{auth.data?.user.telephone}</h2>
                      </IonLabel>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                      <IonLabel className="ion-margin-top">
                        <h2>{auth.data?.user.email}</h2>
                      </IonLabel>
                    </IonRow>
                    <IonRow className="ion-justify-content-center ion-padding-top ion-margin-bottom">
                      <IonButton
                        expand="block"
                        className="btnLogout ion-padding-horizontal"
                        color="danger"
                        size="default"
                        fill="solid"
                        onClick={handleLogout}
                      >
                        <IonIcon
                          className="logoutIcon ion-margin-start"
                          src={logOutOutline}
                          name="create"
                          ios="ios-create"
                          md="md-create"
                        />
                        <IonLabel className="logoutIcon ion-margin-horizontal">Log Out</IonLabel>
                      </IonButton>
                    </IonRow>
                    {auth.data?.user.admin == true && (
                      <IonRow className="ion-justify-content-center ion-margin-bottom">
                        <IonButton
                          expand="block"
                          className="btnLogout ion-padding-horizontal"
                          color="primary"
                          size="default"
                          fill="solid"
                          onClick={() => showQR()}
                        >
                          <IonIcon
                            className="logoutIcon ion-margin-start"
                            src={qrCodeOutline}
                            name="create"
                            ios="ios-create"
                            md="md-create"
                          />
                          <IonLabel className="logoutIcon ion-margin-horizontal">Show QR</IonLabel>
                        </IonButton>
                      </IonRow>
                    )}
                  </IonGrid>
                </IonCard>
              </IonGrid>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
