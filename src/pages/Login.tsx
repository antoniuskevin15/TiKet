import { IonApp, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonLabel, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Login.css';
import {logoGoogle} from 'ionicons/icons';

const Home: React.FC = () => {
  return (
    <IonApp>
      <IonPage>
        <IonContent className='ion-padding'>
          <IonGrid>
            <IonRow>
              <IonLabel className="ion-margin-vertical">
                <h2>
                  Login Account
                </h2>
              </IonLabel>
            </IonRow>
            <IonRow>
              <IonLabel className="ion-margin-vertical">
                <p>Hello, welcome back to our application!</p>
              </IonLabel>
            </IonRow>
            <IonRow>
              <IonSegment class="segment" value="loginOption">
                <IonSegmentButton class="segmentContent" className='segment-activated' value="Email">
                  <IonLabel>Email</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="Phone Number">
                  <IonLabel>Phone Number</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonRow>
            <IonRow>
              <IonInput class="inputForm" className='ion-margin-vertical ion-padding' placeholder='Email address'></IonInput>
            </IonRow>
            <IonRow>
              <IonInput class="inputForm" className='ion-margin-vertical ion-padding' placeholder='Password'></IonInput>
            </IonRow>
            <IonRow className='ion-justify-content-center'>
              <IonLabel class="forgotPW" className='ion-text-right ion-margin'>
                <a>Forgot Password?</a>
              </IonLabel>
            </IonRow>
            <IonRow>
              <IonButton color="tertiary" class="loginBtn" className='ion-text-center ion-justify-content-center'>
                Login
              </IonButton>
            </IonRow>
            <IonRow className='ion-text-center ion-justify-content-center ion-margin'>
              <IonLabel class='forgotPW' >Or signup with</IonLabel>
            </IonRow>
            <IonRow className='ion-text-center ion-justify-content-center'>
              <IonCol>
                <IonButton color="none" href='https://www.instagram.com/vannessiwata/'>
                  <IonIcon icon={logoGoogle}></IonIcon>
                  <IonLabel className="ion-margin-start">Google</IonLabel>
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow className='ion-text-center ion-justify-content-center ion-margin'>
              <IonLabel class='forgotPW' >Not register yet? <b>Create Account</b></IonLabel>
            </IonRow>
          </IonGrid>
        </IonContent >
      </IonPage >
    </IonApp >
  );
};

export default Home;
