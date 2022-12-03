import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonGrid, IonRow, IonLabel, IonItem, IonInput, IonButton, IonCol, IonSegment, IonSegmentButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonThumbnail } from '@ionic/react';
import { url } from 'inspector';
import { logoDropbox, personOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './PackageDetailUser.css';

interface Package{
  del: string,
  loc: string,
  id: string,
  pic: string,
  isDone: boolean
}

const PackageDetailUser: React.FC = () => {

  const [id, setId] = useState<string>();

  useEffect(() => {
    setId(useParams());
  }, [])

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding" style={{"--background": "url('https://ionicframework.com/docs/img/demos/thumbnail.svg')"}}>
        <IonGrid>
          
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default PackageDetailUser;
