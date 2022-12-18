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
  IonSegment,
  IonSegmentButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonList,
  IonThumbnail,
  IonFab,
  IonFabButton,
  IonFabList,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonBackButton,
  IonButtons,
  IonText,
  IonSelect,
  IonSelectOption,
  useIonAlert,
  IonImg,
  IonSpinner,
} from "@ionic/react";
import {
  addOutline,
  camera,
  colorPalette,
  giftOutline,
  globe,
  logoDropbox,
  personOutline,
} from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { base64FromPath } from "@capacitor-community/react-hooks/filesystem";
import "./PackageAddAdmin.css";

import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { useForm } from "react-hook-form";
import { addPackage, useStorage, getCircle } from "../utils/service";

interface Package {
  created_at: string;
  expedition: string;
  id: number;
  isTaken: number;
  photoPath: string;
  receiptNumber: string;
  roomNumber: string;
  sender: string;
  updated_id: string;
  user_id: number;
}

const AddPackageAdmin: React.FC = () => {
  const [mode, setMode] = useState<"ongoing" | "finished" | "unknown">(
    "ongoing"
  );
  const [packages, setPackages] = useState<Package[] | null>(null);
  const dateRef = useRef<HTMLIonDatetimeElement>(null);
  const id = useParams<{ id: string | undefined }>().id;
  const history = useHistory();

  const [loading, setLoading] = useState<boolean>(false);
  const [circle, setCircle] = useState<any>({});

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<{
    sender: string;
    expedition: string;
    receiptNumber: string;
    roomNumber: string;
    photo: File;
    user_id: number;
    errors: any;
  }>();
  const { auth } = useStorage();

  const [presentAlert] = useIonAlert();
  const [tempPhoto, setTempPhoto] = useState<File | null>(null);

  const fetchData = async () => {
    try {
      const res = await getCircle(
        auth.data!.token.value,
        auth.data!.user.circle_id
      );
      setCircle(res.data);
      console.log(res.data.users);
    } catch (error: any) {
      console.log(error);
    }
    console.log("test");
  };

  useEffect(() => {
    if (auth.data) {
      fetchData();
      register("photo", { required: "Photo is required" });
    }
  }, [auth.data]);

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("sender", data.sender);
      formData.append("expedition", data.expedition);
      formData.append("receiptNumber", data.receiptNumber);
      formData.append("roomNumber", data.roomNumber);
      formData.append("photo", data.photo);
      formData.append("user_id", data.user_id);

      await addPackage(auth?.data?.token?.value, formData);
      history.push("/admin/package");
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
    } finally {
      setLoading(false);
    }
  };

  const handleTakePhoto = async () => {
    const photo: any = await Camera.getPhoto({
      quality: 70,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    const filePhoto: any = await fetch(photo.webPath).then((res) => res.blob());
    setTempPhoto(filePhoto);

    setValue("photo", filePhoto);
  };

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonHeader className="myMdHeader">
          <IonToolbar className="myToolbar">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/admin/package" />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol size-sm="12" size-md="8" offset-md="2">
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonLabel className="header">
                      <b>Tiket</b>
                    </IonLabel>
                    <IonIcon
                      icon={personOutline}
                      style={{ paddingLeft: "10px" }}
                    ></IonIcon>
                    <IonLabel className="subheader">
                      <br />
                      {id === undefined ? "Add New Package" : "Update Package"}
                    </IonLabel>
                  </IonCol>
                </IonRow>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <IonRow>
                    <IonCol>
                      <IonItem className="input-register">
                        <IonLabel position="floating">Sender</IonLabel>
                        <IonInput
                          type="text"
                          {...register("sender", {
                            required: "Sender is Required",
                          })}
                        ></IonInput>
                      </IonItem>
                      {errors.sender && (
                        <IonText
                          className="input-error ion-padding"
                          color="danger"
                        >
                          {errors.sender.message}
                        </IonText>
                      )}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem className="input-register">
                        <IonLabel position="floating">Expedition</IonLabel>
                        <IonInput
                          type="text"
                          {...register("expedition", {
                            required: "Expedition is Required",
                          })}
                        ></IonInput>
                      </IonItem>
                      {errors.expedition && (
                        <IonText
                          className="input-error ion-padding"
                          color="danger"
                        >
                          {errors.expedition.message}
                        </IonText>
                      )}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem className="input-register">
                        <IonLabel position="floating">Receipt Number</IonLabel>
                        <IonInput
                          type="text"
                          {...register("receiptNumber", {
                            required: "Receipt number is required",
                          })}
                        ></IonInput>
                      </IonItem>
                      {errors.receiptNumber && (
                        <IonText
                          className="input-error ion-padding"
                          color="danger"
                        >
                          {errors.receiptNumber.message}
                        </IonText>
                      )}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem className="input-register">
                        <IonLabel position="floating">Recepient</IonLabel>
                        <IonSelect
                          {...register("user_id", {
                            required: "Recepient is required",
                          })}
                        >
                          {circle?.users?.map((user: any, idx: number) => (
                            <IonSelectOption key={idx} value={user.id}>
                              {user.name}
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                      </IonItem>
                      {errors.user_id && (
                        <IonText
                          className="input-error ion-padding"
                          color="danger"
                        >
                          {errors.user_id.message}
                        </IonText>
                      )}
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem className="input-register">
                        <IonLabel position="floating">Room Number</IonLabel>
                        <IonInput
                          type="text"
                          {...register("roomNumber", {
                            required: "Room number is required",
                          })}
                        ></IonInput>
                      </IonItem>
                      {errors.roomNumber && (
                        <IonText
                          className="input-error ion-padding"
                          color="danger"
                        >
                          {errors.roomNumber.message}
                        </IonText>
                      )}
                    </IonCol>
                  </IonRow>
                  {/* <IonRow>
                    <IonCol>
                      <IonDatetimeButton datetime="datetime" />
                      <IonModal keepContentsMounted={true}>
                        <IonDatetime id="datetime" className="dateTime" />
                      </IonModal>
                    </IonCol>
                  </IonRow> */}
                  <IonRow>
                    <IonCol className="container-image">
                      <div className="image-preview ion-text-center">
                        {tempPhoto ? (
                          <IonImg src={URL.createObjectURL(tempPhoto)} />
                        ) : (
                          <h3>No photo chosen.</h3>
                        )}
                        {errors.photo && (
                          <IonText
                            className="input-error ion-padding"
                            color="danger"
                          >
                            {errors.photo.message}
                          </IonText>
                        )}
                      </div>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol className="containerTakePhoto">
                      <IonButton fill="clear" onClick={handleTakePhoto}>
                        <IonIcon slot="start" icon={camera} />
                        <IonLabel>Take Photo</IonLabel>
                      </IonButton>
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
                        {loading ? (
                          <IonSpinner />
                        ) : (
                          <>
                            <IonIcon icon={giftOutline} slot="start" />
                            {id === undefined
                              ? "Add Package"
                              : "Update Package"}
                          </>
                        )}
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

export default AddPackageAdmin;
