import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonGrid, IonRow, IonLabel, IonItem, IonInput, IonButton, IonCol, IonSegment, IonSegmentButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonThumbnail, IonBackButton, IonButtons, IonAvatar, IonImg, IonModal, IonSearchbar } from '@ionic/react';
import { url } from 'inspector';
import { arrowBackOutline } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
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
  const modalOpen = true;
  //const [package, setPackage] = useState<Package | null>(null);
  const modal = useRef<HTMLIonModalElement>(null);

  useEffect(() => {
    
  }, [])

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding" style={{"--background": "url('https://ionicframework.com/docs/img/demos/thumbnail.svg')"}}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref='/user/package'/>
            </IonButtons>
            <IonTitle>Package</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
            <IonRow>
              <IonCol>
              </IonCol>
            </IonRow>
            <IonRow>
            <IonCard className="package-card-bottom ion-text-center">
              <IonCardTitle className="ion-margin"><b>Package from Tokopedia</b></IonCardTitle>
              <IonCardSubtitle>By JNE - 12345789****</IonCardSubtitle>
              <IonCardTitle className="ion-margin package-title-2"><b>Is this your package?</b></IonCardTitle>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonButton className="btnhitam">Yes, it's mine</IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton className='btnputih'>Not mine.</IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCard>
            </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default PackageDetailUser;
