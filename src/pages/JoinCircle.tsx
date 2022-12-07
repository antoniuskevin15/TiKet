import { BarcodeScanner } from "@capacitor-community/barcode-scanner"
import {
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar,
    useIonAlert
} from "@ionic/react"
import { personOutline, scanOutline, stopCircleOutline } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import "./JoinCircle.css"

const JoinCircle: React.FC = () => {
    const [err, setErr] = useState<string>()
    const [hideBg, setHideBg] = useState("")
    const [idCircle, setIdCircle] = useState("");
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data: any) => {
        console.log("DATA QR CODE", JSON.stringify(data));
    }

    const startScan = async () => {
        BarcodeScanner.hideBackground()
        // make background of WebView transparent
        setHideBg("hideBg")

        const result = await BarcodeScanner.startScan()
        // start scanning and wait for a result
        stopScan()

        // if the result has content
        if (result.hasContent) {
            console.log(result.content)
            setIdCircle(result.content!)
            present(result.content!, [{ text: 'OK', role: "cancel" }])
            // log the raw scanned content
        }
    }

    const stopScan = () => {
        BarcodeScanner.showBackground()
        BarcodeScanner.stopScan()
        setHideBg("")
    }

    const [present] = useIonAlert()

    useEffect(() => {
        const checkPermission = async () => {
            try {
                const status = await BarcodeScanner.checkPermission({ force: true })

                if (status.granted) {
                    return true
                }

                return false
            } catch (error: any) {
                setErr(error.message);
                console.log(error);
            }
        }

        checkPermission()

        return () => { }
    }, [])

    // if (err) {
    //     return (
    //         <IonPage>
    //             <IonHeader>
    //                 <IonToolbar>
    //                     <IonTitle>Join Circle</IonTitle>
    //                 </IonToolbar>
    //             </IonHeader>
    //             <IonContent className="ion-padding">
    //                 <IonRow>
    //                     <IonText color="danger">{err}</IonText>
    //                 </IonRow>
    //             </IonContent>
    //         </IonPage>
    //     )
    // }

    return (
        <IonPage>
            <IonHeader hidden={!(!!hideBg)}>
                <IonToolbar>
                    <IonTitle>Join Circle</IonTitle>
                    <IonButtons slot="end">
                        <IonButton color="danger" hidden={!hideBg} onClick={stopScan}>
                            <IonIcon icon={stopCircleOutline} slot="start" />
                            Stop Scan
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className={hideBg} >
                <IonGrid hidden={!!hideBg}>
                    <IonRow className="ion-justify-content-center">
                        <IonCol className="ion-text-center">
                            <IonLabel className="header"><b>Join Circle</b></IonLabel>
                            <IonIcon icon={personOutline} style={{ paddingLeft: '10px' }}></IonIcon>
                            <IonLabel className="subheader"><br />Enter circle code or scan QR code!</IonLabel>
                        </IonCol>
                    </IonRow>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <IonRow className="ion-justify-content-center">
                            <IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Circle ID</IonLabel>
                                    <IonInput type="text" placeholder="ID Circle" value={idCircle ? idCircle : ""} ></IonInput>
                                </IonItem>
                            </IonItem>
                        </IonRow>
                        <IonRow className="ion-justify-content-center">
                            <IonButton
                                className="start-scan-button"
                                onClick={startScan}>
                                <IonIcon icon={scanOutline} slot="start" />
                                Start Scan
                            </IonButton>
                        </IonRow>
                        <IonRow className="ion-justify-content-center">
                            <IonButton
                                type="submit"
                                className="">
                                Join Circle
                            </IonButton>
                        </IonRow>
                    </form>
                </IonGrid>
                <div hidden={!hideBg} className="scan-box" />
            </IonContent>
        </IonPage >
    )
}

export default JoinCircle;