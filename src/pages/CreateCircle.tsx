import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonGrid, IonRow, IonLabel, IonItem, IonInput, IonButton, IonCol } from '@ionic/react';
import { personOutline } from 'ionicons/icons';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';
import { authRegister, useStorage } from '../utils/service';
import './CreateCircle.css';

const CreateCircle: React.FC = () => {
    const { register, handleSubmit } = useForm();
    const history = useHistory();
    const { auth } = useStorage();

    const onSubmit = async (data: any) => {
        console.log(JSON.stringify(data));
        if (data.password == data.confirmPassword) {
            try {
                const res = await authRegister(data.fullName, data.phoneNumber, data.email, data.password);
                auth.set(res);
                history.push("/user/home");
            } catch (error: any) {
                console.log(error);
            }
        } else {
            alert("Your password and confirmed password doesn't match");
        }
    }

    return (
        <IonPage>
            <IonContent fullscreen class="ion-padding">
                <IonGrid className='tableGrid'>
                    <IonRow className='ion-padding-vertical'>
                        <IonCol className='ion-text-center'>
                            <IonLabel className="header"><b>Create Circle</b></IonLabel>
                            <IonLabel className="subheader"><br />Hello, create your circle here!</IonLabel>
                        </IonCol>
                    </IonRow>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <IonRow>
                            <IonCol>
                                <IonItem >
                                    <IonLabel className='ion-padding-start' position="floating">Circle Name</IonLabel>
                                    <IonInput clearInput={true} className='ion-margin-horizontal inputItem' type="text" {...register("circlename", {
                                        required: "Full Name is Required"
                                    })}></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem >
                                    <IonLabel className='ion-padding-start' position="floating">Address</IonLabel>
                                    <IonInput clearInput={true} className='ion-margin-horizontal inputItem' type="text"  {...register("address", {
                                        required: "Phone Number is Required"
                                    })}></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem >
                                    <IonLabel className='ion-padding-start' position="floating">Description</IonLabel>
                                    <IonInput clearInput={true} className='ion-margin-horizontal inputItem' type="text"  {...register("desc", {
                                        required: "Phone Number is Required"
                                    })}></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonButton className="margin-vertical btnCreate" color="primary" expand="block" type="submit">Create</IonButton>
                            </IonCol>
                        </IonRow>
                    </form>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default CreateCircle;
