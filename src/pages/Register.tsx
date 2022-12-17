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
} from "@ionic/react";
import { camera, personOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { authRegister, useStorage } from "../utils/service";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import "./Register.css";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();
  const history = useHistory();
  const { auth } = useStorage();

  const fileButton = useRef<HTMLIonButtonElement>(null);

  useEffect(() => {
    if (auth.data) {
      history.push("/user/home");
    }
  }, [auth]);

  const onSubmit = async (data: any) => {
    if (data.password == data.confirmPassword) {
      try {
        const res = await authRegister(data.fullName, data.phoneNumber, data.email, data.password);
        auth.set(res);
        window.location.href = "/select";
        // history.push("/select");
      } catch (error: any) {
        console.log(error);
      }
    } else {
      alert("Your password and confirmed password doesn't match");
    }
  };

  const handleTakePhoto = async () => {
    const photo = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      width: 500,
    });

    if (!photo || !photo.webPath) {
      return;
    }

    if (!photo || !photo.webPath) {
      return;
    }
  };

  const [takenPhoto, setTakenPhoto] = useState<string>();

  const updateImage = (event: any) => {
    const photo = event.target.files[0];
    console.log(photo);

    if(!photo){
        return;
    }

    setTakenPhoto(
      URL.createObjectURL(photo)
    );
  }

  const takePhotoHandler = async () => {
    document.getElementById("imageUpload")?.click();
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
        <IonGrid >
          <IonRow >
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
                    <div></div>
                  </IonCol>
                </IonRow>
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
                  <IonCol className='container-image'>
                    <div className="image-preview ion-text-center">
                        {!takenPhoto && <h3>No photo chosen.</h3>}
                        {takenPhoto && <img className="image-preview-rounded" src={takenPhoto} alt="Preview" />}
                    </div>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol className="containerTakePhoto">
                    <input
                      type="file"
                      id="imageUpload"
                      hidden
                      {...register("photo", {
                        required: "Photo is Required",
                      })}
                      onChange={updateImage}
                    />
                    <IonButton fill="clear" onClick={takePhotoHandler} ref={fileButton}>
                        <IonIcon slot="start" icon={camera}/>
                        <IonLabel>Upload Photo</IonLabel>
                    </IonButton>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <div className="addmargin subheader">
                      By creating your account, you agree to our{" "}
                      <a className="myAnchor" target="blank" href="https://www.termsfeed.com/live/531eb5ee-4de2-4199-8d76-f1a1bfb22f01">
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
