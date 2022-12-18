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

interface PackageContainer {
  ongoing: Package[];
  finished: Package[];
  unknown: Package[];
}

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

const PackageCard = (props: any) => {
  return (
    <IonCardContent>
      <IonItem button className="item-package">
        <IonThumbnail className="package-thumbnail" slot="start">
          <img
            alt={props.sender}
            className="package-image"
            src={`https://tiket.adrianfinantyo.com/storage/${props.photoPath}`}
          />
        </IonThumbnail>
        <IonCardHeader>
          <IonCardTitle className="card-package-title">{props.expedition}</IonCardTitle>
          <IonCardSubtitle className="card-package-subtitle">{props.roomNumber}</IonCardSubtitle>
          <IonCardSubtitle className="card-package-subtitle">
            <IonIcon icon={logoDropbox} style={{ "padding-right": "1vh" }} />
            {props.receiptNumber}
          </IonCardSubtitle>
        </IonCardHeader>
      </IonItem>
    </IonCardContent>
  );
};

const PackageAdmin: React.FC = () => {
  const [mode, setMode] = useState<"ongoing" | "finished" | "unknown">("ongoing");
  const [packages, setPackages] = useState<PackageContainer>({ ongoing: [], finished: [], unknown: [] });
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
      const group = res.packages.reduce(
        (result: any, curr: any) => {
          result[curr.status] = [...(result[curr.status] || []), curr];
          return result;
        },
        { ongoing: [], finished: [], unknown: [] }
      );
      setPackages(group);
      console.log(group);
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
                    packages?.ongoing?.map((p: any, idx: number) => (
                      <PackageCard key={`package-ongoing-item-${idx}`} {...p} />
                    ))}

                  {mode === "finished" &&
                    packages?.finished?.map((p: any, idx: number) => (
                      <PackageCard key={`package-finished-item-${idx}`} {...p} />
                    ))}

                  {mode === "unknown" &&
                    packages?.unknown?.map((p: any, idx: number) => (
                      <PackageCard key={`package-unknown-item-${idx}`} {...p} />
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

export default PackageAdmin;
