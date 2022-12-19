import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonGrid,
  IonRow,
  IonLabel,
  IonButton,
  IonCol,
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonBackButton,
  IonButtons,
  IonCardContent,
  IonText,
  useIonAlert,
} from "@ionic/react";
import { personOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { getPackageById, togglePackage, useStorage } from "../utils/service";
import moment from "moment";
import "./PackageDetailUser.css";

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

const PackageDetailUser: React.FC = () => {
  const [packages, setPackages] = useState<Package>({} as Package);
  const idPackage = useParams<{ idPackage: string }>().idPackage;
  const { auth } = useStorage();
  const [presentAlert] = useIonAlert();
  const history = useHistory();

  useEffect(() => {
    takePackageById();
  }, [auth.data]);

  const takePackageById = async () => {
    try {
      const res = await getPackageById(
        auth.data!.token.value,
        parseInt(idPackage)
      );
      setPackages(res.packages);
    } catch (error: any) {
      console.log(error);
    }
  };

  const triggerApiCall = async (status: "finished" | "unknown") => {
    try {
      await togglePackage(
        auth?.data?.token?.value,
        parseInt(idPackage),
        status
      );
      history.push("/user/package", { idPackage });
    } catch (error: any) {
      presentAlert({
        header: "Error",
        message: error.message,
        buttons: ["OK"],
      });
    }
  };

  const handleTogglePackage = async (status: "finished" | "unknown") => {
    if (packages?.status !== "unknown") {
      if (status === "unknown") {
        await presentAlert({
          header: "Are you sure?",
          message: "You can't change this status again",
          buttons: [
            {
              text: "No",
              role: "cancel",
            },
            {
              text: "Yes",
              handler: () => triggerApiCall(status),
            },
          ],
        });
      } else {
        triggerApiCall(status);
      }
    } else {
      history.push("/user/package/unknown/confirm", { packages });
    }
  };

  return (
    <IonPage className="package-detail">
      <IonContent
        fullscreen
        className="ion-padding"
        style={{
          background: `url(${process.env.REACT_APP_WEB_URL}/storage/${packages?.photoPath})`,
        }}
      >
        <IonHeader>
          <IonToolbar className="toolbarDetail">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/user/package" />
            </IonButtons>
            <IonTitle>Package</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow className="ion-margin-bottom">
            <IonCol>
              <IonLabel className="header">
                <b>TikeT</b>
              </IonLabel>
              <IonIcon
                icon={personOutline}
                style={{ paddingLeft: "10px" }}
              ></IonIcon>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCard className="package-card-bottom ion-padding">
              <IonCardTitle className="ion-margin-horizontal">
                <h1>
                  <b>Package from {packages?.sender}</b>
                </h1>
              </IonCardTitle>
              <IonCardSubtitle className="ion-margin-horizontal">
                By {packages?.expedition} -{" "}
                {packages?.status === "unknown"
                  ? packages?.receiptNumber?.substring(
                    0,
                    packages?.receiptNumber?.length - 4
                  ) + "****"
                  : packages?.receiptNumber}
              </IonCardSubtitle>
              <IonCardContent className="ion-margin ion-no-padding">
                {packages?.status !== "finished" ? (
                  <>
                    <IonText>
                      <h1>
                        <b>Is this your packages?</b>
                      </h1>
                    </IonText>
                    <IonGrid>
                      <IonRow className="ion-margin-top">
                        <IonCol>
                          <IonButton
                            className="btnhitam"
                            onClick={() => handleTogglePackage("finished")}
                          >
                            Yes, it's mine
                          </IonButton>
                        </IonCol>
                        {packages?.status !== "unknown" && (
                          <>
                            <IonCol>
                              <IonButton
                                className="btnputih"
                                onClick={() => handleTogglePackage("unknown")}
                              >
                                Not mine
                              </IonButton>
                            </IonCol>
                          </>
                        )}
                      </IonRow>
                    </IonGrid>
                  </>
                ) : (
                  <>
                    <IonText>
                      <h1>
                        <b>
                          Package already received on{" "}
                          {moment(packages?.updated_at).format(
                            "dddd, DD MMMM YYYY"
                          )}
                        </b>
                      </h1>
                    </IonText>
                  </>
                )}
              </IonCardContent>
            </IonCard>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default PackageDetailUser;
