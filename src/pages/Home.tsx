import { IonBackButton, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonItem, IonLabel, IonList, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

export const DATA_APART = [{
  id: "1", nama: "Apartemen EM Town", alamat: "Tower A No.26", detail: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi ex voluptatum est fugit sunt officia nisi quia modi. Esse cum cupiditate officiis ut eius consequuntur repellendus possimus minima suscipit qui ab doloremque molestiae architecto in natus, quia maiores tenetur vero sit eos dolorem. Sapiente deserunt laborum placeat ullam perferendis recusandae, porro non aliquid doloremque totam pariatur molestiae! Cupiditate, iure aut deleniti provident veniam assumenda enim eos aperiam quae dignissimos. Delectus pariatur qui odit cumque dignissimos expedita repellat modi consequuntur at architecto nisi quod illo sapiente placeat veniam debitis dolorum magni non saepe, iure dolores blanditiis! Error reprehenderit facere eligendi blanditiis.", photoURL: "https://www.summareconbekasi.com/public/images/gallery/article/14000/mtown-fc3.jpg",
  members: [{ id: "U1", nama: "Vallen", photo: "https://i.pinimg.com/236x/27/98/15/279815f1c5fa2a4f3f378b4be8612632.jpg" }, { id: "U2", nama: "Antonius Kevin", photo: "data:image/jpeg;base64,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" }, { id: "U3", nama: "Iwa", photo: "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" }, { id: "U4", nama: "Reynard", photo: "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" }]
}];

const Home: React.FC = () => {
  const [descActive, setdescActive] = useState<boolean>(true);
  const [membersActive, setmembersActive] = useState<boolean>(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonBackButton></IonBackButton>
          <IonTitle>Circle</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {DATA_APART.map(apart => (
          <IonRow key={apart.id} className="ion-justify-content-center">
            <IonImg src={apart.photoURL} class="imgApart" />
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
              {DATA_APART.map(apart => (
                <>
                  <IonRow>
                    <IonLabel>
                      <h1>{apart.nama}</h1>
                    </IonLabel>
                  </IonRow>
                  <IonRow>
                    <IonLabel>
                      <h2>{apart.alamat}</h2>
                    </IonLabel>
                  </IonRow>
                  <IonRow>
                  </IonRow>
                  <IonRow>
                    <IonLabel class="detail">
                      <h2>{apart.detail}</h2>
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
              {DATA_APART.map(apart => (
                <>
                  {apart.members.map(member => (
                    <IonCard class="roundedCard">
                      <IonGrid>
                        <IonRow className="ion-justify-content-center">
                          <IonCol class='roundedphoto'>
                            <IonImg src={member.photo}></IonImg>
                          </IonCol>
                          <IonCol className='ion-align-items-center'>
                            <IonLabel class="membercard-content">
                              <h5>{member.nama}</h5>
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
