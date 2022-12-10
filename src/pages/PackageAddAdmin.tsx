import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonGrid, IonRow, IonLabel, IonItem, IonInput, IonButton, IonCol, IonSegment, IonSegmentButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonThumbnail, IonFab, IonFabButton, IonFabList, IonDatetime, IonDatetimeButton, IonModal } from '@ionic/react';
import { addOutline, camera, colorPalette, giftOutline, globe, logoDropbox, personOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import InputAdmin from '../components/InputControlAdmin';
import './PackageAddAdmin.css';

import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';

interface Package{
  del: string,
  loc: string,
  id: string,
  pic: string,
  type: string,
}

const AddPackageAdmin: React.FC = () => {
  const [mode, setMode] = useState<"ongoing" | "finished" | "unknown">("ongoing");
  const [packages, setPackages] = useState<Array<Package> | null>(null);
  const id = useParams<{ id: string | undefined }>().id;
  
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
                Add New Package
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
                    // {...register("fullName", {
                    //   required: "Full Name is Required",
                    // })}
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
                    // {...register("fullName", {
                    //   required: "Full Name is Required",
                    // })}
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
                    // {...register("fullName", {
                    //   required: "Full Name is Required",
                    // })}
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
                    // {...register("fullName", {
                    //   required: "Full Name is Required",
                    // })}
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
                <IonDatetimeButton datetime="datetime" mode="md"></IonDatetimeButton>
      
                <IonModal keepContentsMounted={true}>
                  <IonDatetime id="datetime" color="light" mode="md" className="dateTime"></IonDatetime>
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
                  Add Package
                </IonButton>
              </IonCol>
            </IonRow>
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AddPackageAdmin;
