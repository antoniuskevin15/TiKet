import { IonBackButton, IonIcon, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonItem, IonLabel, IonList, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import { getCircle, useStorage } from '../utils/service';
import { cubeOutline, personCircleOutline } from "ionicons/icons";
import './HomeAdmin.css';

const HomeAdmin: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Admin</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="homeadmin">
                <IonGrid>
                    <IonRow className='ion-padding'>
                        <IonLabel class="headerfont">
                            <h3>Welcome, Admin</h3>
                        </IonLabel>
                    </IonRow>
                    <IonRow class="header-card">
                        <IonCard>
                            <IonCardHeader className='ion-padding'>
                                <IonCardSubtitle>Circle Name</IonCardSubtitle>
                                <IonCardTitle class='cardTitle'>
                                    <IonLabel><h1>Apartemen EM Town </h1></IonLabel>
                                </IonCardTitle>
                            </IonCardHeader>
                        </IonCard>
                    </IonRow>
                    <IonRow className='ion-padding'>
                        <IonLabel class="status">
                            <h2>Status</h2>
                        </IonLabel>
                    </IonRow>
                    <IonRow className='ion-justify-content-center ion-align-items-center' class="header-card">
                        <IonCard>
                            <IonCardContent>
                                <IonRow>
                                    <IonCol size="auto" class='icon-size' className='ion-justify-content-center ion-no-padding'>
                                        <IonIcon icon={personCircleOutline}></IonIcon>
                                    </IonCol>
                                    <IonCol>
                                        <IonCardSubtitle>Total Resident</IonCardSubtitle>
                                        <IonCardTitle>10</IonCardTitle>
                                    </IonCol>
                                </IonRow>
                            </IonCardContent>
                        </IonCard>
                    </IonRow>
                    <IonRow className='ion-justify-content-center ion-align-items-center' class="content-card">
                        <IonCard>
                            <IonCardContent>
                                <IonRow>
                                    <IonCol size="auto" class='icon-size' className='ion-justify-content-center ion-no-padding'>
                                        <IonIcon icon={cubeOutline}></IonIcon>
                                    </IonCol>
                                    <IonCol>
                                        <IonCardSubtitle>Total Package</IonCardSubtitle>
                                        <IonCardTitle>10</IonCardTitle>
                                    </IonCol>
                                </IonRow>
                            </IonCardContent>
                        </IonCard>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage >
    );
}

export default HomeAdmin;