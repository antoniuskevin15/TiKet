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
import { authEdit, authRegister, useStorage } from "../utils/service";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import "./ProfileEdit.css";
import { Link } from "react-router-dom";
import AvatarPlaceholder from "../assets/avatar-placeholder.png";

const ProfileEdit: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<{
    name: string;
    telephone: string;
    email: string;
    photo: File;
    errors: any;
  }>();
  const history = useHistory();
  const { auth } = useStorage();
  const [presentAlert] = useIonAlert();
  const [tempPhoto, setTempPhoto] = useState<File | null>(null);

  const photoPlaceholder = useRef<HTMLIonImgElement>(null);

  useEffect(() => {
    setValue("name", auth.data?.user.name);
    setValue("telephone", auth.data?.user.telephone);
    setValue("email", auth.data?.user.email);
    console.log(auth);
  });

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("id", auth.data?.user.id);
      formData.append("token", auth.data?.token.value);
      formData.append("name", data.name);
      formData.append("telephone", data.telephone);
      formData.append("email", data.email);
      if (data.photo == undefined) {
        // formData.append("photo", auth.data?.user.photoPath);
      } else {
        formData.append("photo", data.photo);
      }

      const res = await authEdit(formData);
      auth.set(res);
      console.log(auth);
      history.push("/user/home");
    } catch (error: any) {
      presentAlert({
        header: "Error",
        message: error.response.data.message,
        buttons: ["OK"],
        onDidDismiss: () => {
          const errorState = Object.keys(error.response.data.error)[0];
          setError(
            errorState as any,
            { type: "focus", message: error.response.data.error[errorState] },
            {
              shouldFocus: true,
            }
          );
        },
      });
    }
  };

  const showLeaveAlert = () => {
    presentAlert({
      header: "Leave Circle ?",
      message: "Are You Sure Want To Leave This Circle?",
      buttons: ["Sure", "Cancel"],
    });
  }

  const handleTakePhoto = async () => {
    const photo: any = await Camera.getPhoto({
      quality: 70,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    const filePhoto: any = await fetch(photo.webPath).then((res) => res.blob());
    setTempPhoto(filePhoto);

    setValue("photo", filePhoto);
    photoPlaceholder.current?.setAttribute(
      "src",
      URL.createObjectURL(filePhoto)
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/user/profile" />
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
                      <b>Edit Profile</b>
                    </IonLabel>
                    <IonIcon
                      icon={personOutline}
                      style={{ paddingLeft: "10px" }}
                    ></IonIcon>
                    <IonLabel className="subheader">
                      <br />
                      {auth.data.user.admin ? "Admin" : "User"}
                    </IonLabel>
                  </IonCol>
                </IonRow>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <IonRow>
                    <IonCol>
                      <IonItem className="input-register">
                        <IonLabel position="floating">Full Name</IonLabel>
                        <IonInput
                          value={auth.data?.user.name}
                          type="text"
                          {...register("name", {
                            required: "Full name is required",
                          })}
                        />
                      </IonItem>
                      {errors.name && (
                        <IonText
                          className="input-error ion-padding"
                          color="danger"
                        >
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
                          value={auth.data?.user.telephone}
                          {...register("telephone", {
                            required: "Phone number is Required",
                            pattern: {
                              value: /^62[0-9]+$/,
                              message: "Phone number must start with 62",
                            },
                            minLength: {
                              value: 10,
                              message:
                                "Phone number must be at least 10 digits",
                            },
                            maxLength: {
                              value: 13,
                              message:
                                "Phone number must be a maximum of 13 digits",
                            },
                          })}
                        />
                      </IonItem>
                      {errors.telephone && (
                        <IonText
                          className="input-error ion-padding"
                          color="danger"
                        >
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
                          value={auth.data?.user.email}
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
                        <IonText
                          className="input-error ion-padding"
                          color="danger"
                        >
                          {errors.email.message}
                        </IonText>
                      )}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonImg
                        className="photo-placeholder"
                        ref={photoPlaceholder}
                        src={
                          tempPhoto
                            ? URL.createObjectURL(tempPhoto)
                            : `${process.env.REACT_APP_WEB_URL}/storage/${auth.data?.user.photoPath}`
                        }
                        onClick={handleTakePhoto}
                      />
                      {errors.photo && (
                        <IonText
                          className="input-error ion-padding"
                          color="danger"
                        >
                          {errors.photo.message}
                        </IonText>
                      )}
                      <IonButton
                        class="loginBtn"
                        onClick={handleTakePhoto}
                        className="ion-margin-top"
                        color="primary"
                        expand="block"
                      >
                        Change Picture
                      </IonButton>
                    </IonCol>
                  </IonRow>
                  {!auth.data.user.admin &&
                    (
                      <IonRow>
                        <IonCol>
                          <IonButton
                            class="loginBtn"
                            color="danger"
                            expand="block"
                            onClick={showLeaveAlert}
                          >
                            Leave Circle
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    )}
                  <IonRow>
                    <IonCol>
                      <IonButton
                        class="loginBtn"
                        className="margin-vertical"
                        color="primary"
                        expand="block"
                        type="submit"
                      >
                        Update
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </form>

              </IonGrid>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ProfileEdit;
