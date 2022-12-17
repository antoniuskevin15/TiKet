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
  IonImg,
  IonBackButton,
  IonButtons,
  useIonAlert,
  IonText,
} from "@ionic/react";
import { camera, personOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { authRegister, useStorage } from "../utils/service";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import "./Register.css";
import { Link } from "react-router-dom";
import AvatarPlaceholder from "../assets/avatar-placeholder.png";

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<{
    name: string;
    telephone: string;
    email: string;
    password: string;
    confirmPassword: string;
    photo: File;
    errors: any;
  }>();
  const history = useHistory();
  const { auth } = useStorage();
  const [presentAlert] = useIonAlert();
  const [tempPhoto, setTempPhoto] = useState<File | null>(null);

  const password = useRef({});
  password.current = watch("password", "");

  const photoPlaceholder = useRef<HTMLIonImgElement>(null);

  useEffect(() => {
    if (auth.data && tempPhoto == null) {
      history.push("/user/home");
    }
  }, [auth.data]);

  useEffect(() => {
    register("photo", { required: "Photo is required" });
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("telephone", data.telephone);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("photo", data.photo);

      const res = await authRegister(formData);
      auth.set(res);
      // history.push("/select");
    } catch (error: any) {
      presentAlert({
        header: "Error",
        message: error.response.data.message,
        buttons: ["OK"],
      });
    }
  };

  const handleTakePhoto = async () => {
    const photo: any = await Camera.getPhoto({
      quality: 70,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      allowEditing: true,
    });

    const filePhoto: any = await fetch(photo.webPath).then((res) => res.blob());
    setTempPhoto(filePhoto);

    setValue("photo", filePhoto);
    photoPlaceholder.current?.setAttribute("src", URL.createObjectURL(filePhoto));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size-sm="12" size-md="8" offset-md="2">
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonLabel className="header">
                      <b>Register Account</b>
                    </IonLabel>
                    <IonIcon icon={personOutline} style={{ paddingLeft: "10px" }}></IonIcon>
                    <IonLabel className="subheader">
                      <br />
                      Please register yourself here!
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
                          {...register("name", {
                            required: "Full name is required",
                          })}
                        />
                      </IonItem>
                      {errors.name && (
                        <IonText className="input-error ion-padding" color="danger">
                          {errors.name.message}
                        </IonText>
                      )}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem className="input-register">
                        <IonLabel position="floating">Phone Number</IonLabel>
                        <IonInput
                          {...register("telephone", {
                            required: "Phone number is Required",
                            pattern: {
                              value: /^62[0-9]+$/,
                              message: "Phone number must start with 62",
                            },
                            minLength: {
                              value: 10,
                              message: "Phone number must be at least 10 digits",
                            },
                            maxLength: {
                              value: 13,
                              message: "Phone number must be a maximum of 13 digits",
                            },
                          })}
                        />
                      </IonItem>
                      {errors.telephone && (
                        <IonText className="input-error ion-padding" color="danger">
                          {errors.telephone.message}
                        </IonText>
                      )}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem className="input-register">
                        <IonLabel position="floating">Email Address</IonLabel>
                        <IonInput
                          type="email"
                          {...register("email", {
                            required: "Email address is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                        />
                      </IonItem>
                      {errors.email && (
                        <IonText className="input-error ion-padding" color="danger">
                          {errors.email.message}
                        </IonText>
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
                    <IonCol>
                      <IonItem className="input-register">
                        <IonLabel position="floating">Confirmation Password</IonLabel>
                        <IonInput
                          type="password"
                          {...register("confirmPassword", {
                            validate: (value) => value === password.current || "The passwords do not match",
                          })}
                        />
                      </IonItem>
                      {errors.confirmPassword && (
                        <IonText className="input-error ion-padding" color="danger">
                          {errors.confirmPassword.message}
                        </IonText>
                      )}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonImg
                        className="photo-placeholder"
                        ref={photoPlaceholder}
                        src={tempPhoto ? URL.createObjectURL(tempPhoto) : AvatarPlaceholder}
                        onClick={handleTakePhoto}
                      />
                      {errors.photo && (
                        <IonText className="input-error ion-padding" color="danger">
                          {errors.photo.message}
                        </IonText>
                      )}
                      <IonButton onClick={handleTakePhoto} className="ion-margin-top" color="primary" expand="block">
                        Take Pictrue
                      </IonButton>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <div className="addmargin subheader">
                        By creating your account, you agree to our{" "}
                        <a
                          className="myAnchor"
                          target="blank"
                          href="https://www.termsfeed.com/live/531eb5ee-4de2-4199-8d76-f1a1bfb22f01"
                        >
                          <u>
                            <b>Terms & Conditions</b>
                          </u>
                        </a>
                      </div>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonButton className="margin-vertical" color="primary" expand="block" type="submit">
                        Register
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </form>
                <IonRow>
                  <IonCol className="ion-text-center">
                    <div className="account subsubheader">
                      Already have account?{" "}
                      <Link to="/login">
                        <b>
                          <u>Login Account</u>
                        </b>
                      </Link>
                      {/* <a className="myAnchor" href="/login">
                  <IonCol className="ion-text-center">
                    <div className="account subsubheader">
                      Already have account?{" "}
                      <Link to="/login">
                        <b>
                          <u>Login Account</u>
                        </b>
                      </Link>
                      {/* <a className="myAnchor" href="/login">
                      <b>
                        <u>Login Account</u>
                      </b>
                    </a> */}
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;
