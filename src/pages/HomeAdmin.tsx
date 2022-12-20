import {
  IonBackButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import ExploreContainer from "../components/ExploreContainer";
import { getCircle, getPackageByCircleId, useStorage } from "../utils/service";
import { cubeOutline, personCircleOutline, personOutline } from "ionicons/icons";
import "./HomeAdmin.css";
import { Circle } from "../types/type";

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

const HomeAdmin: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  // const [DATA_APART, setDATA_APART] = useState<any>([]);
  const { auth, app } = useStorage();

  useEffect(() => {
    if (auth.data) {
      app.handler.takeCircle();
      app.handler.takePackage();
      console.log(app?.data);
    }
  }, [auth.data]);

  return (
    <IonPage>
      <IonContent class="homeadmin" className="ion-padding">
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
                <IonRow className="ion-padding">
                  <IonLabel class="headerfont">
                    <h3>Welcome, Admin</h3>
                  </IonLabel>
                </IonRow>
                <IonRow class="header-card">
                  <IonCard>
                    <IonCardHeader className="ion-padding">
                      <IonCardSubtitle>Circle Name</IonCardSubtitle>
                      <IonCardTitle class="cardTitle">
                        <IonLabel>
                          <h1>{app?.data?.circle?.name}</h1>
                        </IonLabel>
                      </IonCardTitle>
                    </IonCardHeader>
                  </IonCard>
                </IonRow>
                <IonRow className="ion-padding">
                  <IonLabel class="status">
                    <h2>Status</h2>
                  </IonLabel>
                </IonRow>
                <IonRow className="ion-justify-content-center ion-align-items-center" class="header-card">
                  <IonCard>
                    <IonCardContent>
                      <IonRow>
                        <IonCol size="auto" class="icon-size" className="ion-justify-content-center ion-no-padding">
                          <IonIcon icon={personCircleOutline}></IonIcon>
                        </IonCol>
                        <IonCol>
                          <IonCardSubtitle>Total Resident</IonCardSubtitle>
                          <IonCardTitle>{app?.data?.circle?.users?.length}</IonCardTitle>
                        </IonCol>
                      </IonRow>
                    </IonCardContent>
                  </IonCard>
                </IonRow>
                <IonRow className="ion-justify-content-center ion-align-items-center" class="content-card">
                  <IonCard>
                    <IonCardContent>
                      <IonRow>
                        <IonCol size="auto" class="icon-size" className="ion-justify-content-center ion-no-padding">
                          <IonIcon icon={cubeOutline}></IonIcon>
                        </IonCol>
                        <IonCol>
                          <IonCardSubtitle>Total Package</IonCardSubtitle>
                          <IonCardTitle>{app?.data?.packages?.unknown?.length + app?.data?.packages?.finished?.length + app?.data?.packages?.ongoing?.length + 0}</IonCardTitle>
                        </IonCol>
                      </IonRow>
                    </IonCardContent>
                  </IonCard>
                </IonRow>
              </IonGrid>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomeAdmin;
