import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonGrid,
  IonRow,
  IonLabel,
  IonItem,
  IonInput,
  IonButton,
  IonCol,
} from "@ionic/react";
import { personOutline } from "ionicons/icons";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { authRegister, useStorage } from "../utils/service";
import "./Register.css";

const Register: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const { auth } = useStorage();

  useEffect(() => {
    if (auth.data) {
      history.push("/user/home");
    }
  }, [auth]);

  const onSubmit = async (data: any) => {
    console.log(JSON.stringify(data));
    if (data.password == data.confirmPassword) {
      try {
        const res = await authRegister(
          data.fullName,
          data.phoneNumber,
          data.email,
          data.password
        );
        auth.set(res);
        history.push("/select");
      } catch (error: any) {
        console.log(error);
      }
    } else {
      alert("Your password and confirmed password doesn't match");
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonLabel className="header">
                <b>Register Account</b>
              </IonLabel>
              <IonIcon
                icon={personOutline}
                style={{ paddingLeft: "10px" }}
              ></IonIcon>
              <IonLabel className="subheader">
                <br />
                Hello, welcome back to our application!
              </IonLabel>
            </IonCol>
          </IonRow>
          <form onSubmit={handleSubmit(onSubmit)}>
            <IonRow>
              <IonCol>
                <IonItem className="input-register">
                  <IonLabel position="floating">Full Name</IonLabel>
                  <IonInput
                    type="text"
                    {...register("fullName", {
                      required: "Full Name is Required",
                    })}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem className="input-register">
                  <IonLabel position="floating">Phone Number</IonLabel>
                  <IonInput
                    type="number"
                    {...register("phoneNumber", {
                      required: "Phone Number is Required",
                    })}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem className="input-register">
                  <IonLabel position="floating">Email Address</IonLabel>
                  <IonInput
                    type="email"
                    {...register("email", {
                      required: "Email Address is Required",
                    })}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem className="input-register">
                  <IonLabel position="floating">Password</IonLabel>
                  <IonInput
                    type="password"
                    {...register("password", {
                      required: "Password is Required",
                    })}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem className="input-register">
                  <IonLabel position="floating">Confirmation Password</IonLabel>
                  <IonInput
                    type="password"
                    {...register("confirmPassword", {
                      required: "Confirm Password is Required",
                    })}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <div className="addmargin subheader">
                  By creating your account, you agree to our{" "}
                  <a className="myAnchor">
                    <u>
                      <b>Terms & Conditions</b>
                    </u>
                  </a>
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton
                  className="margin-vertical"
                  color="primary"
                  expand="block"
                  type="submit"
                >
                  Register
                </IonButton>
              </IonCol>
            </IonRow>
          </form>
          <IonRow>
            <IonCol className="ion-text-center">
              <div className="account subsubheader">
                Already have account?{" "}
                <a className="myAnchor">
                  <b>
                    <u>Login Account</u>
                  </b>
                </a>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;
