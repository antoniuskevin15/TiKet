import { IonApp, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonLabel, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Login.css';
import { logoGoogle } from 'ionicons/icons';
import { useRef, useState } from 'react';
import axios from 'axios';

const Home: React.FC = () => {
  const [emailActive, setemailActive] = useState<boolean>(true);
  const [phoneActive, setphoneActive] = useState<boolean>(false);
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);

  const login = () => {
    const email = emailRef?.current?.value;
    const pass = passwordRef?.current?.value;

    axios.post("https://tiket.vallencius.my.id/api/user/login", {email:email, password:pass}).then(
      function(response:any){
        console.log(process.env.REACT_APP_BASE_URL);
        document.cookie = `token=Bearer ${response.data.token.value}`;
        
        window.location.href=`${process.env.REACT_APP_BASE_URL}user/home`
      }
    ).catch(
      function(error:any){
        console.log(error);
      }
    )
  }

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
              <IonSegment class="segment" value={emailActive ? "Email" : "Phone Number"}>
                <IonSegmentButton class="segmentContent" value="Email" onClick={() => {
                  setphoneActive(false);
                  setemailActive(true);
                }}>
                  <IonLabel>Email</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="Phone Number" onClick={() => {
                  setemailActive(false);
                  setphoneActive(true);
                }}>
                  <IonLabel>Phone Number</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonRow>
          </IonGrid>
          {emailActive && (
            <IonGrid>
              <IonRow>
                <IonInput class="inputForm" className='ion-margin-vertical ion-padding' placeholder='Email address' ref={emailRef}></IonInput>
              </IonRow>
              <IonRow>
                <IonInput class="inputForm" className='ion-margin-vertical ion-padding' placeholder='Password' ref={passwordRef}></IonInput>
              </IonRow>
              <IonRow className='ion-justify-content-center'>
                <IonLabel class="forgotPW" className='ion-text-right ion-margin'>
                  <a>Forgot Password?</a>
                </IonLabel>
              </IonRow>
              <IonRow>
                <IonButton color="tertiary" class="loginBtn" onClick={login}  className='ion-text-center ion-justify-content-center'>
                  Login
                </IonButton>
              </IonRow>
              {/* <IonRow className='ion-text-center ion-justify-content-center ion-margin'>
                <IonLabel class='forgotPW' >Or signup with</IonLabel>
              </IonRow>
              <IonRow className='ion-text-center ion-justify-content-center'>
                <IonCol>
                  <IonButton color="none" href='https://www.instagram.com/vannessiwata/'>
                    <IonIcon icon={logoGoogle}></IonIcon>
                    <IonLabel className="ion-margin-start">Google</IonLabel>
                  </IonButton>
                </IonCol>
              </IonRow> */}
              <IonRow className='ion-padding ion-text-center ion-justify-content-center ion-margin'>
                <IonLabel class='forgotPW' >Not register yet? <b>Create Account</b></IonLabel>
              </IonRow>
            </IonGrid>
          )}
          {!emailActive && (
            <IonGrid>
              <IonRow>
                <IonInput class="inputForm" className='ion-margin-vertical ion-padding' placeholder='Phone Number'></IonInput>
              </IonRow>
              <IonRow>
                <IonButton color="tertiary" class="loginBtn" className='ion-text-center ion-justify-content-center'>
                  <IonLabel>Send OTP</IonLabel>
                </IonButton>
              </IonRow>
              <IonRow className='ion-padding ion-text-center ion-justify-content-center ion-margin'>
                <IonLabel class='forgotPW' >Not register yet? <b>Create Account</b></IonLabel>
              </IonRow>
            </IonGrid>
          )}
        </IonContent >
      </IonPage >
    </IonApp >
  );
};

export default Home;
