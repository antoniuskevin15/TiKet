import { IonButton, IonButtons, IonCard, IonCardHeader, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, useIonModal } from '@ionic/react';
import { createOutline, logOutOutline, qrCodeOutline } from 'ionicons/icons';
import { useRef, useState } from 'react';
import { CircleQRCode } from '../components/CircleQRCode';
import './Profile.css';

import { QRData } from '../data/QRData';

const Profile: React.FC = () => {
  const pageRef = useRef();
  const [role, setRole] = useState("Admin");
  const [selectedCode, setSelectedCode] = useState<QRData>();

  const [present, dismiss] = useIonModal(CircleQRCode, {
    dismiss: () => dismiss(),
    code: selectedCode
  });

  const showQR = () => {
    const qrCode: QRData = {
      id: "MASUKIN NAMA PEMILIK DI SINI",
      data: "MASUKIN ID CIRCLE DI SINI"
    }
    setSelectedCode(qrCode);
    console.log("QR SHOWN");
    console.log(qrCode.id);
    console.log(qrCode.data);

    present({
      presentingElement: pageRef.current,
      swipeToClose: true,
    });
  }

  return (
    <IonPage ref={pageRef}>
      <IonHeader>
        <IonToolbar>
          <IonTitle><h2><b>Profile</b></h2></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard className='ion-padding'>
          <IonGrid className='ion-text-center' >
            <IonRow className='ion-margin-horizontal ion-justify-content-end'>

            </IonRow>
            <IonRow className='ion-justify-content-center'>
              <div className="ion-margin profile_image" />
              <IonButton className='btnEdit' fill='solid'>
                <IonIcon className='editIcon' src={createOutline} name='create' ios='ios-create' md='md-create'></IonIcon>
              </IonButton>
            </IonRow>
            <IonRow className='ion-justify-content-center'>
              <IonLabel color='primary'>
                <h1><b>Antonius Kevin B S</b></h1>
              </IonLabel>
            </IonRow>
            <IonRow className='ion-justify-content-center'>
              <IonLabel className='ion-margin-top'>
                <h2>081226220516</h2>
              </IonLabel>
            </IonRow>
            <IonRow className='ion-justify-content-center'>
              <IonLabel className='ion-margin-top'>
                <h2>antonius.saputra@student.umn.ac.id</h2>
              </IonLabel>
            </IonRow>
            <IonRow className='ion-justify-content-center ion-padding-top ion-margin-bottom'>
              <IonButton expand='block' className='btnLogout ion-padding-horizontal' color="danger" size='default' fill='solid'>
                <IonIcon className='logoutIcon ion-margin-start' src={logOutOutline} name='create' ios='ios-create' md='md-create' />
                <IonLabel className='logoutIcon ion-margin-horizontal'>Log Out</IonLabel>
              </IonButton>
            </IonRow>
            {role === "Admin" && (
              <IonRow className='ion-justify-content-center ion-margin-bottom'>
                <IonButton expand='block' className='btnLogout ion-padding-horizontal' color="primary" size='default' fill='solid' onClick={() => showQR()}>
                  <IonIcon className='logoutIcon ion-margin-start' src={qrCodeOutline} name='create' ios='ios-create' md='md-create' />
                  <IonLabel className='logoutIcon ion-margin-horizontal'>Show QR</IonLabel>
                </IonButton>
              </IonRow>
            )}
          </IonGrid>

        </IonCard>

      </IonContent>
    </IonPage >
  );
};

export default Profile;
