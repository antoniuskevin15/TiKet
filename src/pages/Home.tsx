import { IonBackButton, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonItem, IonLabel, IonList, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import { getCircle, useStorage } from '../utils/service';
import './Home.css';

const Home: React.FC = () => {
  const [descActive, setdescActive] = useState<boolean>(true);
  const [membersActive, setmembersActive] = useState<boolean>(false);
  const [DATA_APART, setDATA_APART] = useState<any>([{
    id: "1", name: "", address: "", description: "", photoURL: "https://www.summareconbekasi.com/public/images/gallery/article/14000/mtown-fc3.jpg",
    users: [{ id: "U1", nama: "Vallen", photo: "https://i.pinimg.com/236x/27/98/15/279815f1c5fa2a4f3f378b4be8612632.jpg" }]
  }]);
  const { auth } = useStorage();

  useEffect(()=>{
    if(auth.data){
      takeCircle();
    }
  }, [auth.data]);

  const takeCircle = async() => {
    const id: number = auth.data!.user.circle_id;
    try {
      const res = await getCircle(auth.data!.token.value, id);
      setDATA_APART([res.data]);
      console.log([res.data]);
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Circle</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {DATA_APART.map((apart:any) => (
          <IonRow key={apart.id} className="ion-justify-content-center">
            <IonImg src={"http://localhost:8080/storage/"+apart.photoURL} class="imgApart" />
          </IonRow>
        ))}
        <IonRow className='ion-padding-horizontal ion-padding-top'>
          <IonSegment class="segmentHome" value={descActive ? "Description" : "Members"}>
            <IonSegmentButton
              class="segmentContent"
              value="Description"
              onClick={() => {
                setmembersActive(false);
                setdescActive(true);
              }}
            >
              <IonLabel>Description</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton
              value="Members"
              onClick={() => {
                setdescActive(false);
                setmembersActive(true);
              }}
            >
              <IonLabel>Members</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonRow>
        <IonRow>
          {descActive && (
            <IonGrid className='ion-padding'>
              {DATA_APART.map((apart:any) => (
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
                  <IonRow>
                  </IonRow>
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
            <IonGrid className='ion-padding'>
              {DATA_APART.map((apart:any) => (
                <>
                  {apart.users.map((member:any) => (
                    <IonCard class="roundedCard">
                      <IonGrid>
                        <IonRow className="ion-justify-content-center">
                          <IonCol class='roundedphoto'>
                            {/* <IonImg src={member.photo}></IonImg> */}
                          </IonCol>
                          <IonCol className='ion-align-items-center'>
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
      </IonContent>
    </IonPage>
  );
};

export default Home;
