import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonGrid, IonRow, IonLabel, IonItem, IonInput, IonButton, IonCol, IonSegment, IonSegmentButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonThumbnail } from '@ionic/react';
import { personOutline } from 'ionicons/icons';
import { useState } from 'react';
import InputControl from '../components/InputControl';
import './PackageUser.css';

const Package: React.FC = () => {
  const [mode, setMode] = useState<"new" | "hist">("new");
  
  const selectModeHandler = (selectedValue: "new" | "hist") => {
    setMode(selectedValue);
  };

  const getPackages = () => {
    //Get API
    //const packages

  }

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
            
              <IonCardContent>
                <IonList>
                  <IonItem>
                    <IonThumbnail slot="start">
                      <img alt="" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                    </IonThumbnail>
                    {/* <IonLabel>Item</IonLabel> */}
                    <IonCardTitle>Test</IonCardTitle>
                    <IonCardSubtitle>Test</IonCardSubtitle>
                  </IonItem>
                </IonList>
              </IonCardContent>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Package;
