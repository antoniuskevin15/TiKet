import {
  IonContent,
  IonPage,
  IonIcon,
  IonGrid,
  IonRow,
  IonLabel,
  IonItem,
  IonCol,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonList,
  IonThumbnail,
  IonFab,
  IonFabButton,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from "@ionic/react";
import { addOutline, fish, logoDropbox, personOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import InputAdmin from "../components/InputControlAdmin";
import { PackageContainer } from "../types/type";
import { getPackageByCircleId, getPackageByUserId, useStorage } from "../utils/service";
import "./PackageList.css";

const PackageCard = (props: any) => {
  return (
    <IonCardContent>
      <IonItem className="item-package" routerLink={props.admin ? undefined : `/user/package/detail/${props.id}`}>
        <IonThumbnail className="package-thumbnail" slot="start">
          <img
            alt={props.sender}
            className="package-image"
            src={`https://tiket.adrianfinantyo.com/storage/${props.photoPath}`}
          />
        </IonThumbnail>
        <IonCardHeader>
          <IonCardTitle className="card-package-title">{props.expedition}</IonCardTitle>
          <IonCardSubtitle className="card-package-subtitle">
            <IonIcon icon={logoDropbox} style={{ paddingRight: "1vh" }} />
            {props.receiptNumber}
          </IonCardSubtitle>
        </IonCardHeader>
      </IonItem>
    </IonCardContent>
  );
};

const PackageList: React.FC = () => {
  const [mode, setMode] = useState<"ongoing" | "finished" | "unknown">("ongoing");
  const { auth, app } = useStorage();
  const packages = app.data?.packages;

  const selectModeHandler = (selectedValue: "ongoing" | "finished" | "unknown") => {
    setMode(selectedValue);
  };

  useEffect(() => {
    if (auth.data) {
      app.handler.takePackage();
    }
  }, [auth.data]);

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonRefresher
          slot="fixed"
          pullFactor={0.5}
          pullMin={100}
          pullMax={200}
          onIonRefresh={(e) => {
            app.handler.takePackage().then(e.detail.complete);
          }}
        >
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {auth.data?.user?.admin && (
          <IonFab slot="fixed" vertical="bottom" horizontal="end" className="myAdminFab">
            <IonFabButton color="dark" routerLink="./package/edit">
              <IonIcon icon={addOutline}></IonIcon>
            </IonFabButton>
          </IonFab>
        )}
        <IonGrid>
          <IonRow>
            <IonCol size-sm="12" size-md="8" offset-md="2">
              <IonGrid>
                <IonRow className="ion-margin-bottom">
                  <IonCol>
                    <IonLabel className="header">
                      <b>TikeT</b>
                    </IonLabel>
                    <IonIcon icon={personOutline} style={{ paddingLeft: "10px" }}></IonIcon>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <InputAdmin selectedValue={mode} onSelectValue={selectModeHandler} />
                </IonRow>

                <IonList>
                  {mode === "ongoing" &&
                    packages?.ongoing?.map((p: any, idx: number) => (
                      <PackageCard key={`package-ongoing-item-${idx}`} {...p} admin={auth?.data?.user?.admin} />
                    ))}

                  {mode === "finished" &&
                    packages?.finished?.map((p: any, idx: number) => (
                      <PackageCard key={`package-finished-item-${idx}`} {...p} admin={auth?.data?.user?.admin} />
                    ))}

                  {mode === "unknown" &&
                    packages?.unknown?.map((p: any, idx: number) => (
                      <PackageCard
                        key={`package-unknown-item-${idx}`}
                        {...p}
                        admin={auth?.data?.user?.admin}
                        receiptNumber={
                          auth?.data?.admin
                            ? p.receiptNumber
                            : p.receiptNumber.substring(0, p.receiptNumber?.length - 4) + "****"
                        }
                      />
                    ))}
                </IonList>
              </IonGrid>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default PackageList;
