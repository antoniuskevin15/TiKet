import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonGrid, IonRow, IonLabel, IonItem, IonInput, IonButton, IonCol, IonSegment, IonSegmentButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonThumbnail } from '@ionic/react';
import { logoDropbox, personOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import InputControl from '../components/InputControl';
import './PackageUser.css';

interface Package{
  del: string,
  loc: string,
  id: string,
  pic: string,
  isDone: boolean
}

const PackageUser: React.FC = () => {
  const [mode, setMode] = useState<"new" | "hist">("new");
  const [packages, setPackages] = useState<Array<Package> | null>(null);
  
  const selectModeHandler = (selectedValue: "new" | "hist") => {
    setMode(selectedValue);
  };

  useEffect(() => {
    setPackages([{
      del: "Shopee - SiLambat",
      loc: "Apartemen Truck-Kun",
      id: "123456789****",
      pic: "test.png",
      isDone: false
    },
    {
      del: "Tokopedia - SiLambat",
      loc: "Apartemen KW",
      id: "124324234****",
      pic: "test.png",
      isDone: false
    },
    {
      del: "Tokopedia - SiLambat",
      loc: "Apartemen KW",
      id: "124324234****",
      pic: "test.png",
      isDone: false
    },
    {
      del: "Tokopedia - SiLambat",
      loc: "Apartemen KW",
      id: "124324234****",
      pic: "test.png",
      isDone: false
    },
    {
      del: "Tokopedia - SiLambat",
      loc: "Apartemen KW",
      id: "124324234****",
      pic: "test.png",
      isDone: false
    },
    {
      del: "Tokopedia - SiLambat",
      loc: "Apartemen KW",
      id: "124324234****",
      pic: "test.png",
      isDone: false
    },
    {
      del: "Tokopedia - SiLambat",
      loc: "Apartemen KW",
      id: "124324234****",
      pic: "test.png",
      isDone: false
    },
    {
      del: "SiCepat",
      loc: "Apartemen Bhagaspati",
      id: "666666666****",
      pic: "test.png",
      isDone: true
    },
  ])
  }, [])

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonLabel className="header"><b>TikeT</b></IonLabel>
              <IonIcon icon={personOutline} style={{paddingLeft: '10px'}}></IonIcon>
            </IonCol>
          </IonRow>
          <IonRow>
            <InputControl selectedValue={mode}
              onSelectValue={selectModeHandler} />
          </IonRow>

          <IonList>
            {mode === "new" && 
            (packages?.map((p) => (!p.isDone &&
              <IonCardContent>
                <IonItem button>
                  <IonThumbnail slot="start">
                    <img alt="" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                  </IonThumbnail>
                  <IonCardHeader>
                    <IonCardTitle>{p.del}</IonCardTitle>
                    <IonCardSubtitle>{p.loc}</IonCardSubtitle>
                    <IonCardSubtitle><IonIcon icon={logoDropbox} style={{"padding-right": "1vh"}}/>{p.id}</IonCardSubtitle>
                  </IonCardHeader>
                </IonItem>
              </IonCardContent>
            )))
          }

          {mode === "hist" &&
            (packages?.map((p) => (p.isDone &&
              <IonCardContent>
                  <IonItem>
                    <IonThumbnail slot="start">
                      <img alt="" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                    </IonThumbnail>
                    <IonCardHeader>
                      <IonCardTitle>{p.del}</IonCardTitle>
                      <IonCardSubtitle>{p.loc}</IonCardSubtitle>
                      <IonCardSubtitle><IonIcon icon={logoDropbox} style={{"padding-right": "1vh"}}/>{p.id}</IonCardSubtitle>
                    </IonCardHeader>
                  </IonItem>
              </IonCardContent>
              )))
            }
          </IonList>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default PackageUser;
