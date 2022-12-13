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
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { joinCircle, useStorage } from "../utils/service"
import "./JoinCircle.css"

const JoinCircle: React.FC = () => {
    const [err, setErr] = useState<string>()
    const [hideBg, setHideBg] = useState("")
    const [idCircle, setIdCircle] = useState("");
    const circleRef = useRef<HTMLIonInputElement>(null);
    const { auth } = useStorage();

    const onSubmit = async () => {
        const circleName: string = circleRef?.current?.value as string;
        console.log(circleName);
        try{
          const res = await joinCircle(auth.data!.token.value, circleName);
          auth.set(res);
          console.log(auth);
          window.location.href = "/user/home";
          // history.push("/select");
        } catch (error: any) {
          console.log(error);
        }
        
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
                        <IonRow className="ion-justify-content-center">
                            <IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Circle Name</IonLabel>
                                    <IonInput type="text" placeholder="ID Circle" value={idCircle ? idCircle : ""} ref={circleRef}></IonInput>
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
                            color="primary"
                            class="loginBtn"
                            onClick={onSubmit}
                            className=""
                            >
                            Join Circle
                            </IonButton>
                        </IonRow>
                </IonGrid>
                <div hidden={!hideBg} className="scan-box" />
            </IonContent>
        </IonPage >
    )
}

export default JoinCircle;