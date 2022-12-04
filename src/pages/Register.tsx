import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonGrid, IonRow, IonLabel, IonItem, IonInput, IonButton, IonCol } from '@ionic/react';
import { personOutline } from 'ionicons/icons';
import './Register.css';

const Register: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonLabel className="header"><b>Register Account</b></IonLabel>
              <IonIcon icon={personOutline} style={{ paddingLeft: '10px' }}></IonIcon>
              <IonLabel className="subheader"><br />Hello, welcome back to our application!</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem >
                <IonLabel className='ion-padding-start' position="floating">Full Name</IonLabel>
                <IonInput className='ion-margin-horizontal' type="text"></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem >
                <IonLabel className='ion-padding-start' position="floating">Phone Number</IonLabel>
                <IonInput className='ion-margin-horizontal' type="number"></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem >
                <IonLabel className='ion-padding-start' position="floating">Email Address</IonLabel>
                <IonInput className='ion-margin-horizontal' type="email"></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem >
                <IonLabel className='ion-padding-start' position="floating">Password</IonLabel>
                <IonInput className='ion-margin-horizontal' type="password"></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem >
                <IonLabel className='ion-padding-start' position="floating">Confirmation Password</IonLabel>
                <IonInput className='ion-margin-horizontal' type="password"></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <div className="addmargin subheader">
                By creating your account, you agree to our <a className="myAnchor"><u><b>Terms & Conditions</b></u></a>
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton className="margin-vertical" color="primary" expand="block">Register</IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-center">
              <div className="account subsubheader">
                Already have account? <a className="myAnchor"><b><u>Login Account</u></b></a>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;
