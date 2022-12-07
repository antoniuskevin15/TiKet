import { IonBackButton, IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react";
import { useState } from "react";


const JoinCircle: React.FC = () => {
    const [continuousScan, setContinuousScan] = useState(false);
    const [QRcodeOnly, setQRcodeOnly] = useState(true);

    const handleOption = (e: any) => {
        let value = e.detail.value;
        let checked = e.detail.checked;
        if (value == "Continuous Scan") {
            setContinuousScan(checked)
        } else if (value == "Scan QR Code Only") {
            setQRcodeOnly(checked);
        }
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Circle</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
            </IonContent>
        </IonPage>
    );

}

export default JoinCircle;