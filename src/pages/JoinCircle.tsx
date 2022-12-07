import { IonBackButton, IonButton, IonCheckbox, IonContent, IonHeader, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonTitle, IonToolbar, useIonToast } from "@ionic/react";
import { TextResult } from "capacitor-plugin-dynamsoft-barcode-reader";
import { useState } from "react";


const JoinCircle: React.FC = () => {
    const [continuousScan, setContinuousScan] = useState(false);
    const [QRcodeOnly, setQRcodeOnly] = useState(true);
    const [present, dismiss] = useIonToast();
    const [barcodeResults, setBarcodeResults] = useState([] as TextResult[]);
    const copyBarcode = (text: string) => {
        // if (copy(text)) {
        //     present("copied", 500);
        // }
    }


    const handleOption = (e: any) => {
        let value = e.detail.value;
        let checked = e.detail.checked;
        if (value == "Continuous Scan") {
            setContinuousScan(checked)
        } else if (value == "Scan QR Code Only") {
            setQRcodeOnly(checked);
        }
    }

    const startScan = () => {
        // props.history.push("scanner", { continuousScan: continuousScan, qrcodeOnly: QRcodeOnly, active: true })
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Circle</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonButton expand="full" onClick={startScan}>Start Scanning</IonButton>
                <IonList>
                    <IonItem>
                        <IonLabel>Continuous Scan</IonLabel>
                        <IonCheckbox slot="end" value="Continuous Scan" checked={continuousScan} onIonChange={(e) => handleOption(e)} />
                    </IonItem>
                    <IonItem>
                        <IonLabel>Scan QR Code Only</IonLabel>
                        <IonCheckbox slot="end" value="Scan QR Code Only" checked={QRcodeOnly} onIonChange={(e) => handleOption(e)} />
                    </IonItem>
                </IonList>
                {(barcodeResults.length > 0) &&
                    <IonListHeader>
                        <IonLabel>Results:</IonLabel>
                    </IonListHeader>
                }
                {barcodeResults.map((tr, idx) => (
                    <IonItem key={idx}>
                        <IonLabel>{tr.barcodeFormat + ": " + tr.barcodeText}</IonLabel>
                        <IonLabel slot="end" onClick={() => { copyBarcode(tr.barcodeText) }}>copy</IonLabel>
                    </IonItem>
                ))}
            </IonContent>
        </IonPage>
    );

}

export default JoinCircle;