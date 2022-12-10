import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonGrid, IonRow, IonLabel, IonItem, IonInput, IonButton, IonCol, IonSegment, IonSegmentButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonThumbnail, IonFab, IonFabButton, IonFabList } from '@ionic/react';
import { addOutline, colorPalette, globe, logoDropbox, personOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import InputAdmin from '../components/InputControlAdmin';
import './PackageAdmin.css';

interface Package{
  del: string,
  loc: string,
  id: string,
  pic: string,
  type: string,
}

const PackageAdmin: React.FC = () => {
  const [mode, setMode] = useState<"ongoing" | "finished" | "unknown">("ongoing");
  const [packages, setPackages] = useState<Array<Package> | null>(null);
  
  const selectModeHandler = (selectedValue: "ongoing" | "finished" | "unknown") => {
    setMode(selectedValue);
  };

  useEffect(() => {
    setPackages([{
      del: "Shopee - SiLambat",
      loc: "Apartemen Truck-Kun",
      id: "123456789****",
      pic: "test.png",
      type: "ongoing",
    },
    {
      del: "Tokopedia - SiLambat",
      loc: "Apartemen KW",
      id: "124324234****",
      pic: "test.png",
      type: "finished",
    },
    {
      del: "Tokopedia - SiLambat",
      loc: "Apartemen KW",
      id: "124324234****",
      pic: "test.png",
      type: "ongoing",
    },
    {
      del: "Tokopedia - SiLambat",
      loc: "Apartemen KW",
      id: "124324234****",
      pic: "test.png",
      type: "unknown",
    },
    {
      del: "Tokopedia - SiLambat",
      loc: "Apartemen KW",
      id: "124324234****",
      pic: "test.png",
      type: "finished",
    },
    {
      del: "Tokopedia - SiLambat",
      loc: "Apartemen KW",
      id: "124324234****",
      pic: "test.png",
      type: "ongoing",
    },
    {
      del: "Tokopedia - SiLambat",
      loc: "Apartemen KW",
      id: "124324234****",
      pic: "test.png",
      type: "finished",
    },
    {
      del: "SiCepat",
      loc: "Apartemen Bhagaspati",
      id: "666666666****",
      pic: "test.png",
      type: "unknown",
    },
  ])
  }, [])

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonFab slot="fixed" vertical="bottom" horizontal="end" className='myAdminFab'>
          <IonFabButton color="dark">
            <IonIcon icon={addOutline}></IonIcon>
          </IonFabButton>
        </IonFab>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonLabel className="header"><b>TikeT</b></IonLabel>
              <IonIcon icon={personOutline} style={{paddingLeft: '10px'}}></IonIcon>
            </IonCol>
          </IonRow>
          <IonRow>
            <InputAdmin selectedValue={mode}
              onSelectValue={selectModeHandler} />
          </IonRow>

          <IonList>
            {mode === "ongoing" && 
            (packages?.map((p) => (p.type === "ongoing" &&
              <IonCardContent>
                <IonItem button className='item-package' href='/user/package/detail/1'>
                  <IonThumbnail className='package-thumbnail' slot="start">
                    <img alt="" className="package-image" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                  </IonThumbnail>
                  <IonCardHeader>
                    <IonCardTitle className='card-package-title'>{p.del}</IonCardTitle>
                    <IonCardSubtitle className='card-package-subtitle'>{p.loc}</IonCardSubtitle>
                    <IonCardSubtitle className='card-package-title'><IonIcon icon={logoDropbox} style={{"padding-right": "1vh"}}/>{p.id}</IonCardSubtitle>
                  </IonCardHeader>
                </IonItem>
              </IonCardContent>
            )))
          }

          {mode === "finished" &&
            (packages?.map((p) => (p.type === "finished" &&
              <IonCardContent>
                  <IonItem className='item-package'>
                    <IonThumbnail className='package-thumbnail' slot="start">
                      <img alt="" className="package-image" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                    </IonThumbnail>
                    <IonCardHeader>
                      <IonCardTitle className='card-package-title'>{p.del}</IonCardTitle>
                      <IonCardSubtitle className='card-package-subtitle'>{p.loc}</IonCardSubtitle>
                      <IonCardSubtitle className='card-package-subtitle'><IonIcon icon={logoDropbox} style={{"padding-right": "1vh"}}/>{p.id}</IonCardSubtitle>
                    </IonCardHeader>
                  </IonItem>
              </IonCardContent>
              )))
            }
          
          {mode === "unknown" &&
            (packages?.map((p) => (p.type === "unknown" &&
              <IonCardContent>
                  <IonItem className='item-package'>
                    <IonThumbnail className='package-thumbnail' slot="start">
                      <img alt="" className="package-image" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                    </IonThumbnail>
                    <IonCardHeader>
                      <IonCardTitle className='card-package-title'>{p.del}</IonCardTitle>
                      <IonCardSubtitle className='card-package-subtitle'>{p.loc}</IonCardSubtitle>
                      <IonCardSubtitle className='card-package-subtitle'><IonIcon icon={logoDropbox} style={{"padding-right": "1vh"}}/>{p.id}</IonCardSubtitle>
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

export default PackageAdmin;
