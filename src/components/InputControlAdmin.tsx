import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import React from "react";

const InputAdmin: React.FC<{
  selectedValue: "ongoing" | "finished" | "unknown";
  onSelectValue: (value: "ongoing" | "finished" | "unknown") => void;
}> = (props) => {
  const inputChangeHandler = (event: CustomEvent) => {
    props.onSelectValue(event.detail.value);
  };

  return (
    <IonSegment value={props.selectedValue} onIonChange={inputChangeHandler} className="package-segment">
      <IonSegmentButton value="ongoing" className="package-segment-button">
        <IonLabel>On Going</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="finished" className="package-segment-button">
        <IonLabel>Finished</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="unknown" className="package-segment-button">
        <IonLabel>Unknown</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

export default InputAdmin;
