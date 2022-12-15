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
} from "@ionic/react";
import { personOutline } from "ionicons/icons";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { circleCreate, useStorage } from "../utils/service";
import "./CreateCircle.css";

const CreateCircle: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const { auth } = useStorage();
  const history = useHistory();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [fileName, setFileName] = useState('');

  const fileButton = useRef<HTMLIonButtonElement>(null);

  // const uploadHandler = (event:any) => {
  //   const file = event.target.files[0];
  //   console.log(file);
  // }

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target!.files![0]);
    setFileName(event.target!.files![0].name);
    fileButton.current!.innerHTML = event.target.files![0].name;
  };

  const onSubmit = async (data: any) => {
    console.log(JSON.stringify(data));
    try {
      console.log(auth.data!.token.value); //INI TOKEN
      const formData = new FormData();
      const res = await circleCreate(auth.data!.token.value, data.circleName, data.address, data.desc, selectedFile!);
      history.push("/user/home"); //HARUSNYA KE ADMIN
    } catch (error: any) {
      console.log(error);
    }
  };

  const openFileUpload = () => {
    document.getElementById("imageUpload")?.click();
  }

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonGrid className="tableGrid">
          <IonRow className="ion-margin-bottom">
            <IonCol>
              <IonLabel className="header"><b>TikeT</b></IonLabel>
              <IonIcon icon={personOutline} style={{paddingLeft: '10px'}}></IonIcon>
            </IonCol>
          </IonRow>
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
            {/* <IonRow>
              <IonCol>
                <IonItem className="inputItem">
                  <input type="file" onChange={fileChangeHandler}/>
                </IonItem>
              </IonCol>
            </IonRow> */}
            <IonRow>
              <IonCol>
                <IonImg src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" style={{width: "30vh", margin: "auto"}} />
                <input
                  type="file"
                  id="imageUpload"
                  hidden
                  {...register("photo", {
                    required: "Photo is Required",
                  })}
                  onChange={fileChangeHandler}
                />
                <IonButton ref={fileButton} onClick={openFileUpload} className="ion-margin-top file-button" color="primary" expand="block">
                  Upload Image
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton color="primary" expand="block" type="submit">
                  Create
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
