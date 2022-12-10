import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import React from "react";

const InputControl: React.FC<{
  selectedValue: "new" | "hist" | "unknown";
  onSelectValue: (value: "new" | "hist" | "unknown") => void;
}> = (props) => {
  const inputChangeHandler = (event: CustomEvent) => {
    props.onSelectValue(event.detail.value);
  };

  return (
    <IonSegment value={props.selectedValue} onIonChange={inputChangeHandler} className="package-segment">
      <IonSegmentButton value="new" className="package-segment-button">
        <IonLabel>New</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="hist" className="package-segment-button">
        <IonLabel>History</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="unknown" className="package-segment-button">
        <IonLabel>Unknown</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

export default InputControl;
