import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonNote, IonPage, IonRow, IonTitle, IonToolbar, useIonToast } from "@ionic/react";
import QRCode from "react-qr-code";

interface QRCodeProps {
    code: any;
    dismiss: () => any;
}

export const CircleQRCode: React.FC<QRCodeProps> = ({ code, dismiss }) => {

    const handleDismiss = () => {
        dismiss();
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Circle QR Code</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={handleDismiss}>Close</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid className="ion-padding-top ion-margin-top">
                    <IonRow className="ion-justify-content-center ion-text-center animate__animated animate__lightSpeedInLeft animate__faster">
                        <IonCol size="12">
                            <QRCode value={code.data} />
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="12">
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Circle ID</IonCardTitle>
                                    <IonNote>Or You Can Insert This ID to Join This Circle</IonNote>
                                </IonCardHeader>
                                <IonCardContent>
                                    <p>{code.data}</p>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

