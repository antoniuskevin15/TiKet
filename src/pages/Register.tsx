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
              <IonIcon icon={personOutline} style={{paddingLeft: '10px'}}></IonIcon>
              <IonLabel className="subheader"><br/>Hello, welcome back to our application!</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
            <IonItem className="input-register">
              <IonLabel position="floating">Full Name</IonLabel>
              <IonInput type="text"></IonInput>
            </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
            <IonItem className="input-register">
              <IonLabel position="floating">Phone Number</IonLabel>
              <IonInput type="number"></IonInput>
            </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem className="input-register">
                <IonLabel position="floating">Email Address</IonLabel>
                <IonInput type="email"></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
            <IonItem className="input-register">
              <IonLabel position="floating">Password</IonLabel>
              <IonInput type="password"></IonInput>
            </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
            <IonItem className="input-register">
              <IonLabel position="floating">Confirmation Password</IonLabel>
              <IonInput type="password"></IonInput>
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
              <IonButton className="margin-vertical register-button" color="primary" expand="block">Register</IonButton>
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