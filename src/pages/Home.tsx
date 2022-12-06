import { IonBackButton, IonCard, IonContent, IonGrid, IonHeader, IonImg, IonItem, IonLabel, IonList, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

export const DATA_APART = [{
  id: "1", nama: "Apartemen EM Town", alamat: "Tower A No.26", detail: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi ex voluptatum est fugit sunt officia nisi quia modi. Esse cum cupiditate officiis ut eius consequuntur repellendus possimus minima suscipit qui ab doloremque molestiae architecto in natus, quia maiores tenetur vero sit eos dolorem. Sapiente deserunt laborum placeat ullam perferendis recusandae, porro non aliquid doloremque totam pariatur molestiae! Cupiditate, iure aut deleniti provident veniam assumenda enim eos aperiam quae dignissimos. Delectus pariatur qui odit cumque dignissimos expedita repellat modi consequuntur at architecto nisi quod illo sapiente placeat veniam debitis dolorum magni non saepe, iure dolores blanditiis! Error reprehenderit facere eligendi blanditiis.", photoURL: "https://www.summareconbekasi.com/public/images/gallery/article/14000/mtown-fc3.jpg"
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
        <IonRow className='ion-padding'>
          <IonSegment color="" class="segment" value={descActive ? "Description" : "Members"}>
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
            <IonGrid>
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
                    <IonLabel>
                      <h2>{apart.detail}</h2>
                    </IonLabel>
                  </IonRow>
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
