import {
  IonApp,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Login.css";
import { logoGoogle } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { authLogin, useStorage } from "../utils/service";
import { Link, useHistory } from "react-router-dom";

const Login: React.FC = () => {
  const [emailActive, setemailActive] = useState<boolean>(true);
  const [phoneActive, setphoneActive] = useState<boolean>(false);
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);
  const history = useHistory();
  const { auth } = useStorage();

  useEffect(() => {
    if (auth.data) {
      console.log(auth.data.user.admin == true);
      if (auth.data.user.admin) {
        // window.location.href = "/admin/home";
        history.push("/admin/home");
        console.log("admin");
      } else {
        console.log("user");
        // window.location.href = "/user/home";
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
      console.log(res);
      if (res.user.admin == true) {
        window.location.href = "/admin/home";
        // history.push("/admin/home");
      } else {
        window.location.href = "/user/home";
        // history.push("/user/home");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <IonApp>
      <IonPage>
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonLabel className="ion-margin-vertical">
                <h2>Login Account</h2>
              </IonLabel>
            </IonRow>
            <IonRow>
              <IonLabel className="ion-margin-vertical">
                <p>Hello, welcome back to our application!</p>
              </IonLabel>
            </IonRow>
            <IonRow>
              <IonSegment class="segment" value={emailActive ? "Email" : "Phone Number"}>
                <IonSegmentButton
                  class="segmentContent"
                  value="Email"
                  onClick={() => {
                    setphoneActive(false);
                    setemailActive(true);
                  }}
                >
                  <IonLabel>Email</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton
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
            <IonGrid>
              <IonRow>
                <IonInput
                  class="inputForm"
                  className="ion-margin-vertical ion-padding"
                  placeholder="Email address"
                  type="email"
                  ref={emailRef}
                ></IonInput>
              </IonRow>
              <IonRow>
                <IonInput
                  class="inputForm"
                  className="ion-margin-vertical ion-padding"
                  placeholder="Password"
                  type="password"
                  ref={passwordRef}
                ></IonInput>
              </IonRow>
              <IonRow className="ion-justify-content-center">
                <IonLabel class="forgotPW" className="ion-text-right ion-margin">
                  <a>Forgot Password?</a>
                </IonLabel>
              </IonRow>
              <IonRow>
                <IonButton
                  color="primary"
                  class="loginBtn"
                  onClick={handleLogin}
                  className="ion-text-center ion-justify-content-center"
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
                  Not register yet?{" "}
                  <Link to="/register">
                    <b>Create Account</b>
                  </Link>
                </IonLabel>
              </IonRow>
            </IonGrid>
          )}
          {!emailActive && (
            <IonGrid>
              <IonRow>
                <IonInput
                  class="inputForm"
                  className="ion-margin-vertical ion-padding"
                  placeholder="Phone Number"
                ></IonInput>
              </IonRow>
              <IonRow>
                <IonButton color="primary" class="loginBtn" className="ion-text-center ion-justify-content-center">
                  <IonLabel>Send OTP</IonLabel>
                </IonButton>
              </IonRow>
              <IonRow className="ion-padding ion-text-center ion-justify-content-center ion-margin">
                <IonLabel class="forgotPW">
                  Not register yet? <b>Create Account</b>
                </IonLabel>
              </IonRow>
            </IonGrid>
          )}
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Login;
