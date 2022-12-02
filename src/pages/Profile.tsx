import { IonButton, IonButtons, IonCard, IonCardHeader, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { createOutline, logOutOutline } from 'ionicons/icons';
import './Profile.css';

const Profile: React.FC = () => {
  return (
    <IonPage>
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
          </IonGrid>

        </IonCard>

      </IonContent>
    </IonPage >
  );
};

export default Profile;
