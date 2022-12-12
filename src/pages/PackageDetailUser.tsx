import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonGrid, IonRow, IonLabel, IonItem, IonInput, IonButton, IonCol, IonSegment, IonSegmentButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonThumbnail, IonBackButton, IonButtons, IonAvatar, IonImg, IonModal, IonSearchbar } from '@ionic/react';
import { url } from 'inspector';
import { arrowBackOutline } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { getPackageById, useStorage } from '../utils/service';
import './PackageDetailUser.css';

interface Package{
  created_at: string,
  expedition: string,
  id: number,
  isTaken: number,
  photoPath: string,
  receiptNumber: string,
  roomNumber: string,
  sender: string,
  updated_id: string,
  user_id: number,
}

const PackageDetailUser: React.FC = () => {

  // const [id, setId] = useState<string>();
  const modalOpen = true;
  const [packages, setPackages] = useState<Package[]>([]);
  const modal = useRef<HTMLIonModalElement>(null);
  const idPackage = useParams<{idPackage: string}>().idPackage;
  const { auth } = useStorage();

  useEffect(() => {
    takePackageById();
  }, [auth.data?.token]);

  
  const takePackageById = async() => {
    try {
      const res = await getPackageById(auth.data!.token.value, parseInt(idPackage));
      setPackages(res.packages);
      console.log(res.packages);
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <IonPage>
    {packages?.map(p=>
      <IonContent fullscreen class="ion-padding" style={{"--background": `url('${process.env.REACT_APP_WEB_URL}/storage/${p?.photoPath}')`}}>
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
                <IonCardTitle className="ion-margin"><b>Package from {p?.sender}</b></IonCardTitle>
                <IonCardSubtitle>By {p?.expedition} - {p?.receiptNumber}</IonCardSubtitle>
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
      </IonContent>)}
    </IonPage>
  );
};

export default PackageDetailUser;
