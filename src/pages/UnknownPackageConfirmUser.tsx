import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
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

    const handleNextInput = (event:any) => {
        if (event.key === "1" || event.key === "2" || event.key === "3" || event.key === "4" || event.key === "5" || event.key === "6" || event.key === "7" || event.key === "8" || event.key === "9" || event.key === "0") {
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            console.log(index)
            form[index + 1].focus();
            event.preventDefault();
        }
        else if(event.key === "Backspace"){
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            console.log(index)
            form[index - 1].focus();
            event.preventDefault();
        }
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
                        <IonLabel color='primary' className='header ion-text-md-wrap'><b>Please Insert the Last 4 Number</b></IonLabel>
                    </IonRow>
                    <IonRow className='ion-text-start'>
                        <IonLabel color='medium' className='subheader ion-text-md-wrap'>on your package receipt</IonLabel>
                    </IonRow>
                    <form>
                    <IonRow>
                        <IonCol>
                            <IonInput type="number" min={0} max={9} autofocus className="resiInput" onKeyUp={(e) => handleNextInput(e)}/>
                        </IonCol>
                        <IonCol>
                            <IonInput type="number" min={0} max={9} className="resiInput" onKeyUp={(e) => handleNextInput(e)}/>
                        </IonCol>
                        <IonCol>
                            <IonInput type="number" min={0} max={9} className="resiInput" onKeyUp={(e) => handleNextInput(e)}/>
                        </IonCol>
                        <IonCol>
                            <IonInput type="number" min={0} max={9} className="resiInput" onKeyUp={(e) => handleNextInput(e)}/>
                        </IonCol>
                    </IonRow>
                    </form>
                    <IonRow className='ion-text-start ion-justify-content-center'>
                        <IonButton expand='block' fill="solid" className='btnSelect' onClick={goToJoin}>
                            <IonLabel>confirm</IonLabel>
                        </IonButton>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage >
    );
};

export default UnknownPackageConfirmUser;