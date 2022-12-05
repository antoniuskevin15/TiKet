import { IonButton, IonContent, IonGrid, IonHeader, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './SelectCircle.css';

const SelectCircle: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <IonGrid className='center ion-text-start ion-margin-horizontal'>
                    <IonRow className='ion-text-start'>
                        <IonLabel color='primary' className='header ion-text-md-wrap'><b>Do you already have a TikeT's Circle?</b></IonLabel>
                    </IonRow>
                    <IonRow className='ion-text-start'>
                        <IonLabel color='medium' className='subheader ion-text-md-wrap'>Circle is a virtual environment used to manage your packages.</IonLabel>
                    </IonRow>
                    <IonRow className='ion-text-start ion-justify-content-center'>
                        <IonButton expand='block' fill="solid" className=''>
                            <IonLabel>Yes, join an existing Circle</IonLabel>
                        </IonButton>
                    </IonRow>
                    <IonRow className='ion-text-start ion-justify-content-center'>
                        <IonButton expand='block' fill="solid" className=''>
                            <IonLabel>No, create a new one</IonLabel>
                        </IonButton>
                    </IonRow>

                </IonGrid>
            </IonContent>
        </IonPage >
    );
};

export default SelectCircle;