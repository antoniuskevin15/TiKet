import {
  IonApp,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import "./Login.css";
import { logoGoogle, personOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { authLogin, useStorage } from "../utils/service";
import { Link, useHistory } from "react-router-dom";

const Login: React.FC = () => {
  const [emailActive, setemailActive] = useState<boolean>(true);
  const [phoneActive, setphoneActive] = useState<boolean>(false);
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);
  const history = useHistory();
  const { auth } = useStorage();
  const [presentAlert] = useIonAlert();

  useEffect(() => {
    if (auth.data !== null) {
      console.log(auth.data);
      if (auth.data.user.admin) {
        history.push("/admin/home");
      } else {
        history.push("/user/home");
      }
    }
  }, [auth.data]);

  const handleLogin = async () => {
    const email: string = emailRef?.current?.value as string;
    const pass: string = passwordRef?.current?.value as string;

    try {
      const res = await authLogin(email, pass);
      auth.set(res);
    } catch (error: any) {
      presentAlert({
        header: "Error",
        message: error.response.data.message,
        buttons: ["OK"],
      });
    }
  };

  return (
    <IonApp>
      <IonPage>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol size-sm="12" size-md="8" offset-md="2">
                <IonGrid>
                  <IonRow className="ion-margin">
                    <IonCol>
                      <IonLabel className="header">
                        <b>Login Account</b>
                      </IonLabel>
                      <IonIcon icon={personOutline} style={{ paddingLeft: "10px" }}></IonIcon>
                      <IonLabel className="subheader">
                        <br />
                        Hello, welcome back to our application!
                      </IonLabel>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonSegment className="login-segment" value={emailActive ? "Email" : "Phone Number"}>
                      <IonSegmentButton
                        className="login-segment-button"
                        value="Email"
                        onClick={() => {
                          setphoneActive(false);
                          setemailActive(true);
                        }}
                      >
                        <IonLabel>Email</IonLabel>
                      </IonSegmentButton>
                      <IonSegmentButton
                        className="login-segment-button"
                        value="Phone Number"
                        onClick={() => {
                          setemailActive(false);
                          setphoneActive(true);
                        }}
                      >
                        <IonLabel>Phone Number</IonLabel>
                      </IonSegmentButton>
                    </IonSegment>
                  </IonRow>
                </IonGrid>
                {emailActive && (
                  <IonGrid className="ion-margin">
                    <IonRow>
                      <IonCol>
                        <IonItem className="input-register">
                          <IonLabel position="floating">Email Address</IonLabel>
                          <IonInput type="email" ref={emailRef}></IonInput>
                        </IonItem>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol>
                        <IonItem className="input-register">
                          <IonLabel position="floating">Password</IonLabel>
                          <IonInput type="password" ref={passwordRef}></IonInput>
                        </IonItem>
                      </IonCol>
                    </IonRow>
                    {/* <IonRow className="ion-justify-content-center">
                      <IonLabel class="forgotPW" className="ion-text-right ion-margin">
                        <a>Forgot Password?</a>
                      </IonLabel>
                    </IonRow> */}
                    <IonRow>
                      <IonButton
                        color="primary"
                        class="loginBtn"
                        onClick={handleLogin}
                        className="ion-text-center ion-justify-content-center login-margin-top"
                      >
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
                    <IonRow className="ion-padding ion-text-center ion-justify-content-center ion-margin">
                      <IonLabel class="forgotPW">
                        Not registered yet?{" "}
                        <Link to="/register">
                          <b>Create Account</b>
                        </Link>
                      </IonLabel>
                    </IonRow>
                  </IonGrid>
                )}
                {!emailActive && (
                  <IonGrid className="ion-margin">
                    <IonRow>
                      <IonCol>
                        <IonItem className="input-register">
                          <IonLabel position="floating">Phone Number</IonLabel>
                          <IonInput type="number" ref={passwordRef}></IonInput>
                        </IonItem>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonButton
                        color="primary"
                        class="loginBtn"
                        className="ion-text-center ion-justify-content-center login-margin-top"
                      >
                        <IonLabel>Send OTP</IonLabel>
                      </IonButton>
                    </IonRow>
                    <IonRow className="ion-padding ion-text-center ion-justify-content-center ion-margin">
                      <IonLabel class="forgotPW">
                        Not registered yet?{" "}
                        <Link to="/register">
                          <b>Create Account</b>
                        </Link>
                      </IonLabel>
                    </IonRow>
                  </IonGrid>
                )}
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Login;
