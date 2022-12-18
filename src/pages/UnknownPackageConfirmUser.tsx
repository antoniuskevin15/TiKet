import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { personOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './UnknownPackageConfirmUser.css';

const UnknownPackageConfirmUser: React.FC = () => {
    const history = useHistory();
    const goToCreate = () => {
        history.push('circle/create');
    }
    const goToJoin = () => {
        history.push('circle/join');
    }
    return (
        <IonPage>
            <IonContent fullscreen className="ion-padding">
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonLabel className="header"><b>TikeT</b></IonLabel>
                            <IonIcon icon={personOutline} style={{paddingLeft: '10px'}}></IonIcon>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonGrid className='center ion-text-start ion-margin-horizontal gridSelect'>
                    <IonRow className='ion-text-start'>
                        <IonLabel color='primary' className='header ion-text-md-wrap'><b>Insert the Last 4 Number</b></IonLabel>
                    </IonRow>
                    <IonRow className='ion-text-start'>
                        <IonLabel color='medium' className='subheader ion-text-md-wrap'>on your receipt</IonLabel>
                    </IonRow>
                    <IonRow className='ion-text-start ion-justify-content-center'>
                        <IonButton expand='block' fill="solid" className='btnSelect' onClick={goToJoin}>
                            <IonLabel>Yes, join an existing Circle</IonLabel>
                        </IonButton>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage >
    );
};

export default UnknownPackageConfirmUser;