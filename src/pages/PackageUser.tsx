import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonGrid, IonRow, IonLabel, IonItem, IonInput, IonButton, IonCol, IonSegment, IonSegmentButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonThumbnail } from '@ionic/react';
import { logoDropbox, personOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import InputControl from '../components/InputControl';
import { getPackageByUserId, useStorage } from '../utils/service';
import './PackageUser.css';

interface Package{
  created_at: string,
  expedition: string,
  id: number,
  isTaken: number,
  photoPath: string,
  receiptNumber: string,
  roomNumber: string,
  sender: string,
  updated_id: string,
  user_id: number,
}

const PackageUser: React.FC = () => {
  const [mode, setMode] = useState<"new" | "hist" | "unknown">("new");
  const [packages, setPackages] = useState<Package[]>([]);
  const { auth } = useStorage();
  
  const selectModeHandler = (selectedValue: "new" | "hist" | "unknown") => {
    setMode(selectedValue);
  };

  useEffect(()=>{
    if(auth.data){
      takePackage();
    }
  }, [auth.data]);

  const takePackage = async() => {
    const id = auth.data!.user.id;
    console.log(id);
    try {
      const res = await getPackageByUserId(auth.data!.token.value, id);
      setPackages(res.packages);
      console.log(res.packages);
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <IonGrid>
          <IonRow className="ion-margin-bottom">
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
            <IonLabel><b>Total Packages</b>: {packages.length}</IonLabel>
            {mode === "new" && 
              (packages?.map((p) => (p.isTaken==0 &&
                <IonCardContent>
                  <IonItem button className='item-package' href={`/user/package/detail/${p.id}/`}>
                    <IonThumbnail className='package-thumbnail' slot="start">
                      <img alt="" className="package-image" src={`${process.env.REACT_APP_WEB_URL}/storage/${p.photoPath}`} />
                    </IonThumbnail>
                    <IonCardHeader>
                      <IonCardTitle className='card-package-title'>{p.expedition}</IonCardTitle>
                      <IonCardSubtitle className='card-package-subtitle'>{p.roomNumber}</IonCardSubtitle>
                      <IonCardSubtitle className='card-package-title'><IonIcon icon={logoDropbox} style={{"padding-right": "1vh"}}/>{p.receiptNumber}</IonCardSubtitle>
                    </IonCardHeader>
                  </IonItem>
                </IonCardContent>
              )))
            }

            {mode === "hist" &&
            (packages?.map((p) => (p.isTaken==1 &&
              <IonCardContent>
                  <IonItem className='item-package'>
                    <IonThumbnail className='package-thumbnail' slot="start">
                      <img alt="" className="package-image" src={`${process.env.REACT_APP_WEB_URL}/storage/${p.photoPath}`} />
                    </IonThumbnail>
                    <IonCardHeader>
                      <IonCardTitle className='card-package-title'>{p.expedition}</IonCardTitle>
                      <IonCardSubtitle className='card-package-subtitle'>{p.roomNumber}</IonCardSubtitle>
                      <IonCardSubtitle className='card-package-subtitle'><IonIcon icon={logoDropbox} style={{"padding-right": "1vh"}}/>{p.receiptNumber}</IonCardSubtitle>
                    </IonCardHeader>
                  </IonItem>
              </IonCardContent>
              )))
            }

          {mode === "unknown" &&
            (packages?.map((p) => (p.isTaken==1 &&
              <IonCardContent>
                  <IonItem className='item-package'>
                    <IonThumbnail className='package-thumbnail' slot="start">
                      <img alt="" className="package-image" src={`${process.env.REACT_APP_WEB_URL}/storage/${p.photoPath}`} />
                    </IonThumbnail>
                    <IonCardHeader>
                      <IonCardTitle className='card-package-title'>{p.expedition}</IonCardTitle>
                      <IonCardSubtitle className='card-package-subtitle'>{p.roomNumber}</IonCardSubtitle>
                      <IonCardSubtitle className='card-package-subtitle'><IonIcon icon={logoDropbox} style={{"padding-right": "1vh"}}/>{p.receiptNumber}</IonCardSubtitle>
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
