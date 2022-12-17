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
  IonItem,
  IonInput,
  IonButton,
  IonCol,
  IonSegment,
  IonSegmentButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonList,
  IonThumbnail,
  IonFab,
  IonFabButton,
  IonFabList,
} from "@ionic/react";
import { addOutline, colorPalette, globe, logoDropbox, personOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import InputAdmin from "../components/InputControlAdmin";
import { getPackageByCircleId, useStorage } from "../utils/service";
import "./PackageAdmin.css";

interface Package {
  created_at: string;
  expedition: string;
  id: number;
  isTaken: number;
  photoPath: string;
  receiptNumber: string;
  roomNumber: string;
  sender: string;
  updated_id: string;
  user_id: number;
}

const PackageAdmin: React.FC = () => {
  const [mode, setMode] = useState<"ongoing" | "finished" | "unknown">("ongoing");
  const [packages, setPackages] = useState<Package[]>([]);
  const { auth } = useStorage();

  const selectModeHandler = (selectedValue: "ongoing" | "finished" | "unknown") => {
    setMode(selectedValue);
  };

  useEffect(() => {
    if (auth.data) {
      takePackage();
    }
  }, [auth.data]);

  const takePackage = async () => {
    try {
      const res = await getPackageByCircleId(auth.data!.token.value, auth.data!.user.circle_id);
      setPackages(res.packages);
      console.log(res.packages);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonFab slot="fixed" vertical="bottom" horizontal="end" className="myAdminFab">
          <IonFabButton color="dark" routerLink="./package/detail">
            <IonIcon icon={addOutline}></IonIcon>
          </IonFabButton>
        </IonFab>
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
                    packages?.map(
                      (p: any, idx: number) =>
                        p.isTaken == 0 && (
                          <IonCardContent key={`package-item-${idx}`}>
                            <IonItem button className="item-package">
                              <IonThumbnail className="package-thumbnail" slot="start">
                                <img
                                  alt={p.sender}
                                  className="package-image"
                                  src={`https://tiket.adrianfinantyo.com/storage/${p.photoPath}`}
                                />
                              </IonThumbnail>
                              <IonCardHeader>
                                <IonCardTitle className="card-package-title">{p.expedition}</IonCardTitle>
                                <IonCardSubtitle className="card-package-subtitle">{p.roomNumber}</IonCardSubtitle>
                                <IonCardSubtitle className="card-package-subtitle">
                                  <IonIcon icon={logoDropbox} style={{ "padding-right": "1vh" }} />
                                  {p.receiptNumber}
                                </IonCardSubtitle>
                              </IonCardHeader>
                            </IonItem>
                          </IonCardContent>
                        )
                    )}

                  {mode === "finished" &&
                    packages?.map(
                      (p) =>
                        p.isTaken == 1 && (
                          <IonCardContent>
                            <IonItem className="item-package">
                              <IonThumbnail className="package-thumbnail" slot="start">
                                <img
                                  alt=""
                                  className="package-image"
                                  src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                                />
                              </IonThumbnail>
                              <IonCardHeader>
                                <IonCardTitle className="card-package-title">{p.expedition}</IonCardTitle>
                                <IonCardSubtitle className="card-package-subtitle">{p.roomNumber}</IonCardSubtitle>
                                <IonCardSubtitle className="card-package-subtitle">
                                  <IonIcon icon={logoDropbox} style={{ "padding-right": "1vh" }} />
                                  {p.receiptNumber}
                                </IonCardSubtitle>
                              </IonCardHeader>
                            </IonItem>
                          </IonCardContent>
                        )
                    )}

                  {mode === "unknown" &&
                    packages?.map(
                      (p) =>
                        p.isTaken == 0 && (
                          <IonCardContent>
                            <IonItem className="item-package">
                              <IonThumbnail className="package-thumbnail" slot="start">
                                <img
                                  alt=""
                                  className="package-image"
                                  src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                                />
                              </IonThumbnail>
                              <IonCardHeader>
                                <IonCardTitle className="card-package-title">{p.expedition}</IonCardTitle>
                                <IonCardSubtitle className="card-package-subtitle">{p.roomNumber}</IonCardSubtitle>
                                <IonCardSubtitle className="card-package-subtitle">
                                  <IonIcon icon={logoDropbox} style={{ "padding-right": "1vh" }} />
                                  {p.receiptNumber}
                                </IonCardSubtitle>
                              </IonCardHeader>
                            </IonItem>
                          </IonCardContent>
                        )
                    )}
                </IonList>
              </IonGrid>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default PackageAdmin;
