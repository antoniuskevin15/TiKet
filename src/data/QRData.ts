import React from "react";

export interface QRData {
    id: string,
    data: string,
};

export interface CTX {
    qrCode: QRData[];
    addQR: (newQR: QRData) => void,
    updateQR: (updateQR: QRData) => void,
}

const QRCode = React.createContext<CTX>({
    qrCode: [],
    addQR: () => {},
    updateQR: () => {}
});
