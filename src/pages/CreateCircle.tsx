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
  IonTextarea,
  IonImg,
  IonBackButton,
  IonButtons,
  IonSpinner,
  useIonAlert,
} from "@ionic/react";
import { camera, personOutline } from "ionicons/icons";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { circleCreate, useStorage } from "../utils/service";
import "./CreateCircle.css";

const CreateCircle: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError
  } = useForm<{ circleName: string, address: string, desc: string, photo: File }>();
  const { auth, app } = useStorage();
  const history = useHistory();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [presentAlert] = useIonAlert();


  const fileButton = useRef<HTMLIonButtonElement>(null);

  const onSubmit = async (data: any) => {
    console.log(JSON.stringify(data));
    // debugger
    try {
      setLoading(true);
      console.log(auth.data!.token.value); //INI TOKEN

      const formData = new FormData();
      const res = await circleCreate(
        auth.data!.token.value,
        data.circleName,
        data.address,
        data.desc,
        selectedFile!
      );
      // console.log(res.data.id);
      const tempAdminData = auth.data;
      // console.log(auth.data);
      tempAdminData.user.circle_id = res.data.id;
      tempAdminData.user.admin = true;
      auth.set(tempAdminData);
      console.log(auth.data);

      app.handler.takeCircle();
      history.push("/admin/home");
    } catch (error: any) {
      presentAlert({
        header: "Error",
        message: error.response.data.message,
        buttons: ["OK"],
        onDidDismiss: () => {
          const errorState = Object.keys(error.response.data.error)[0];
          console.log(errorState);
          setError(
            errorState as any,
            { type: "focus", message: error.response.data.error[errorState] },
            {
              shouldFocus: true,
            }
          );
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const [takenPhoto, setTakenPhoto] = useState<string>();

  const updateImage = (event: any) => {
    const photo = event.target.files[0];
    console.log(photo);

    if (!photo) {
      return;
    }

    setTakenPhoto(URL.createObjectURL(photo));

    setSelectedFile(photo);
  };

  const takePhotoHandler = async () => {
    document.getElementById("imageUpload")?.click();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons className="toolbarCreate" slot="start">
            <IonBackButton defaultHref="/user/package" />
            <IonLabel className="header">
              <b>TikeT</b>
            </IonLabel>
            <IonIcon
              icon={personOutline}
              style={{ paddingLeft: "10px" }}
            ></IonIcon>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="ion-padding">
        <IonGrid className="tableGrid">
          {/* <IonRow className="ion-margin-bottom">
            <IonCol>
              <IonLabel className="header">
                <b>TikeT</b>
              </IonLabel>
              <IonIcon icon={personOutline} style={{ paddingLeft: "10px" }}></IonIcon>
            </IonCol>
          </IonRow> */}
          <IonRow className="ion-padding-vertical">
            <IonCol className="ion-text-center">
              <IonLabel className="header">
                <b>Create Circle</b>
              </IonLabel>
              <IonLabel className="subheader">
                <br />
                Hello, create your circle here!
              </IonLabel>
            </IonCol>
          </IonRow>
          <form onSubmit={handleSubmit(onSubmit)}>
            <IonRow>
              <IonCol>
                <IonItem className="inputItem ion-padding-right">
                  <IonLabel className="ion-padding-start" position="floating">
                    Circle Name
                  </IonLabel>
                  <IonInput
                    clearInput={true}
                    className="ion-margin-horizontal ion-padding-horizontal"
                    type="text"
                    {...register("circleName", {
                      required: "Full Name is Required",
                    })}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem className="inputItem">
                  <IonLabel className="ion-padding-start" position="floating">
                    Address
                  </IonLabel>
                  <IonInput
                    clearInput={true}
                    className="ion-margin-horizontal"
                    type="text"
                    {...register("address", {
                      required: "Address is Required",
                    })}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem className="inputItem">
                  <IonLabel className="ion-padding-start" position="floating">
                    Description
                  </IonLabel>
                  <IonTextarea
                    autoGrow={true}
                    className="ion-margin-horizontal"
                    {...register("desc", {
                      required: "Description is Required",
                    })}
                  ></IonTextarea>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="container-image">
                <div className="image-preview ion-text-center">
                  {!takenPhoto && <h3>No photo chosen.</h3>}
                  {takenPhoto && (
                    <img
                      className="image-preview-rounded"
                      src={takenPhoto}
                      alt="Preview"
                    />
                  )}
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
                <IonButton
                  fill="clear"
                  onClick={takePhotoHandler}
                  ref={fileButton}
                >
                  <IonIcon slot="start" icon={camera} />
                  <IonLabel>Upload Photo</IonLabel>
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton
                  class="loginBtn"
                  color="primary"
                  expand="block"
                  type="submit"
                >
                  {loading ? <IonSpinner /> : "Create Circle"}
                </IonButton>
              </IonCol>
            </IonRow>
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default CreateCircle;
