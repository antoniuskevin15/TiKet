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
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import "./Login.css";
import { logoGoogle, personOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { authLogin, useStorage } from "../utils/service";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
  }>();

  const [emailActive, setemailActive] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const { auth } = useStorage();
  const [presentAlert] = useIonAlert();

  const onSubmitPassword = async (data: any) => {
    try {
      setLoading(true);
      const res = await authLogin(data.email, data.password);
      auth.set(res);
      if (res.user.admin) {
        history.push("/admin/home");
      } else {
        history.push("/user/home");
      }
    } catch (error: any) {
      presentAlert({
        header: "Error",
        message: error.response.data.message,
        buttons: ["OK"],
      });
    } finally {
      setLoading(false);
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
                          setemailActive(true);
                        }}
                      >
                        <IonLabel>Email</IonLabel>
                      </IonSegmentButton>
                      <IonSegmentButton
                        disabled
                        className="login-segment-button"
                        value="Phone Number"
                        onClick={() => {
                          setemailActive(false);
                        }}
                      >
                        <IonLabel>Phone Number</IonLabel>
                      </IonSegmentButton>
                    </IonSegment>
                  </IonRow>
                </IonGrid>
                {emailActive && (
                  <form onSubmit={handleSubmit(onSubmitPassword)}>
                    <IonGrid className="ion-margin">
                      <IonRow>
                        <IonCol>
                          <IonItem className="input-register">
                            <IonLabel position="floating">Email Address</IonLabel>
                            <IonInput
                              {...register("email", {
                                required: "Email is required",
                              })}
                            />
                          </IonItem>
                          {errors.email && (
                            <IonRow>
                              <IonCol>
                                <IonText className="input-error ion-padding" color="danger">
                                  {errors.email.message}
                                </IonText>
                              </IonCol>
                            </IonRow>
                          )}
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>
                          <IonItem className="input-register">
                            <IonLabel position="floating">Password</IonLabel>
                            <IonInput
                              type="password"
                              {...register("password", {
                                required: "Password is required",
                              })}
                            />
                          </IonItem>
                          {errors.password && (
                            <IonText className="input-error ion-padding" color="danger">
                              {errors.password.message}
                            </IonText>
                          )}
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonButton
                          color="primary"
                          class="loginBtn"
                          type="submit"
                          className="ion-text-center ion-justify-content-center login-margin-top"
                        >
                          {loading ? <IonSpinner /> : "Login"}
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
                  </form>
                )}

                {!emailActive && (
                  <IonGrid className="ion-margin">
                    <IonRow>
                      <IonCol>
                        <IonItem className="input-register">
                          <IonLabel position="floating">Phone Number</IonLabel>
                          <IonInput />
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
