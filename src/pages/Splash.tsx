import { IonCol, IonContent, IonGrid, IonImg, IonLabel, IonPage, IonRow, IonSpinner, IonText } from "@ionic/react";
import "./Splash.css";
const Splash: React.FC = () => {
    return (
        <IonPage >
            <IonContent fullscreen color="primary">
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <div className="contentRow">
                                <IonImg src="./assets/icon/iconTiketLogo.png"></IonImg>
                                <IonText className="ion-padding-top">
                                    <IonSpinner className="ion-padding-end ion-margin-end" color="light"></IonSpinner>
                                    <IonLabel>Loading data...</IonLabel>
                                </IonText>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}
export default Splash;