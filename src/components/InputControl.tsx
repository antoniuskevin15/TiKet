import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import React from "react";

const InputControl: React.FC<{
  selectedValue: "new" | "hist";
  onSelectValue: (value: "new" | "hist") => void;
}> = (props) => {
  const inputChangeHandler = (event: CustomEvent) => {
    props.onSelectValue(event.detail.value);
  };

  return (
    <IonSegment value={props.selectedValue} onIonChange={inputChangeHandler}>
      <IonSegmentButton value="new">
        <IonLabel>New</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="history">
        <IonLabel>History</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

export default InputControl;
