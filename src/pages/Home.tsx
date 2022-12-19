import {
  IonBackButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
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
import { personOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import ExploreContainer from "../components/ExploreContainer";
import { getCircle, useStorage } from "../utils/service";
import "./Home.css";

const Home: React.FC = () => {
  const [descActive, setdescActive] = useState<boolean>(true);
  const [DATA_APART, setDATA_APART] = useState<any>([]);
  const { auth } = useStorage();

  useEffect(() => {
    if (auth.data) {
      takeCircle();
    }
  }, [auth.data?.token]);

  const takeCircle = async () => {
    try {
      console.log(auth.data!.token.value, auth.data!.user.circle_id);
      const res = await getCircle(auth.data!.token.value, auth.data!.user.circle_id);
      setDATA_APART([res.data]);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <IonPage>
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
                <IonRow className="ion-padding">
                  <IonLabel class="headerfont">
                    <h3>Welcome, User</h3>
                  </IonLabel>
                </IonRow>
                {DATA_APART.map((apart: any) => (
                  <IonRow key={apart.id} className="ion-justify-content-center">
                    <IonImg src={`${process.env.REACT_APP_WEB_URL}/storage/${apart.photoURL}`} class="imgApart" />
                  </IonRow>
                ))}
                <IonRow className="ion-padding-horizontal ion-padding-top">
                  <IonSegment className="home-segment" value={descActive ? "Description" : "Members"}>
                    <IonSegmentButton
                      className="home-segment-button"
                      value="Description"
                      onClick={() => {
                        setdescActive(true);
                      }}
                    >
                      <IonLabel>Description</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton
                      className="home-segment-button"
                      value="Members"
                      onClick={() => {
                        setdescActive(false);
                      }}
                    >
                      <IonLabel>Members</IonLabel>
                    </IonSegmentButton>
                  </IonSegment>
                </IonRow>
                <IonRow>
                  {descActive && (
                    <IonGrid className="ion-padding">
                      {DATA_APART.map((apart: any) => (
                        <>
                          <IonRow>
                            <IonLabel>
                              <h1>{apart.name}</h1>
                            </IonLabel>
                          </IonRow>
                          <IonRow>
                            <IonLabel>
                              <h2>{apart.address}</h2>
                            </IonLabel>
                          </IonRow>
                          <IonRow></IonRow>
                          <IonRow>
                            <IonLabel class="detail">
                              <h2>{apart.description}</h2>
                            </IonLabel>
                          </IonRow>
                        </>
                      ))}
                    </IonGrid>
                  )}
                </IonRow>
                <IonRow>
                  {!descActive && (
                    <IonGrid className="ion-padding">
                      {DATA_APART.map((apart: any) => (
                        <>
                          <IonRow>
                            <IonLabel>
                              <h3>
                                <b>Total Member</b>: {apart.users.length}
                              </h3>
                            </IonLabel>
                          </IonRow>
                          {apart.users.map((member: any) => (
                            <IonCard class="roundedCard">
                              <IonGrid>
                                <IonRow className="ion-justify-content-center">
                                  <IonCol class="roundedphoto">
                                    <IonImg
                                      style={{ objectFit: "cover" }}
                                      src={`${process.env.REACT_APP_WEB_URL}/storage/${member.photoPath}`}
                                    ></IonImg>
                                  </IonCol>
                                  <IonCol className="ion-align-items-center">
                                    <IonLabel class="membercard-content">
                                      <h5>{member.name}</h5>
                                    </IonLabel>
                                  </IonCol>
                                </IonRow>
                              </IonGrid>
                            </IonCard>
                          ))}
                        </>
                      ))}
                    </IonGrid>
                  )}
                </IonRow>
              </IonGrid>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
