import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonGrid, IonRow, IonLabel, IonItem, IonInput, IonButton, IonCol, IonSegment, IonSegmentButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonThumbnail, IonFab, IonFabButton, IonFabList, IonDatetime, IonDatetimeButton, IonModal, IonBackButton, IonButtons } from '@ionic/react';
import { addOutline, camera, colorPalette, giftOutline, globe, logoDropbox, personOutline } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { base64FromPath } from "@capacitor-community/react-hooks/filesystem";
import './PackageAddAdmin.css';

import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import { useForm } from 'react-hook-form';
import { addPackage, useStorage } from '../utils/service';

interface Package{
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
  const [mode, setMode] = useState<"ongoing" | "finished" | "unknown">("ongoing");
  const [packages, setPackages] = useState<Package[] | null>(null);
  const dateRef = useRef<HTMLIonDatetimeElement>(null);
  const id = useParams<{ id: string | undefined }>().id;
  const { register, handleSubmit } = useForm();
  const { auth } = useStorage();

  const onSubmit = async (data: any) => {
    
    const base64Data = await base64FromPath(takenPhoto!.preview!);
    console.log(JSON.stringify(data));
    console.log("asd");
    console.log(takenPhoto!.path);
    try {
      const res = await addPackage(
        auth.data!.token.value,
        data.sender,
        data.expedition,
        data.resi,
        data.nomorKamar,
        base64Data
      );
      window.location.href = "/select";
      // history.push("/select");
    } catch (error: any) {
      console.log(error);
    }
  };
  
  const [takenPhoto, setTakenPhoto] = useState<{
    path: string | undefined; //store original url
    preview: string //store preview url for web
  }>();

  const takePhotoHandler = async () => {
    const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 80,
        width: 500
    });
    console.log(photo);

    if(!photo || !photo.webPath){
        return;
    }

    setTakenPhoto({
        path: photo.path,
        preview: photo.webPath
    });
};

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonHeader className="myMdHeader">
          <IonToolbar className="myToolbar">
            <IonButtons slot="start">
              <IonBackButton defaultHref='/admin/package'/>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonGrid >
          <IonRow >
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
                <form /*onSubmit={handleSubmit(onSubmit)}*/>
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
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem className="input-register">
                        <IonLabel position="floating">Resi</IonLabel>
                        <IonInput
                          type="number"
                          {...register("resi", {
                            required: "Resi is Required",
                          })}
                        ></IonInput>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem className="input-register">
                        <IonLabel position="floating">No Kamar</IonLabel>
                        <IonInput
                          type="text"
                          {...register("noRoom", {
                            required: "Room Number is Required",
                          })}
                        ></IonInput>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      {/* <IonItem className="input-register">
                        <IonLabel position="floating">Date</IonLabel>
                        <IonInput
                          type="text"
                          // {...register("fullName", {
                          //   required: "Full Name is Required",
                          // })}
                        ></IonInput>
                      </IonItem> */}
                      <IonDatetimeButton datetime="datetime" ></IonDatetimeButton>
            
                      <IonModal keepContentsMounted={true}>
                        <IonDatetime id="datetime" className="dateTime"></IonDatetime>
                      </IonModal>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol className='container-image'>
                      <div className="image-preview ion-text-center">
                          {!takenPhoto && <h3>No photo chosen.</h3>}
                          {takenPhoto && <img src={takenPhoto.preview} alt="Preview" />}
                      </div>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol className="containerTakePhoto">
                      <IonButton fill="clear" onClick={takePhotoHandler}>
                          <IonIcon slot="start" icon={camera}/>
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
                        <IonIcon icon={giftOutline} slot="start" />
                        {id === undefined ? "Add Package" : "Update Package"}
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
