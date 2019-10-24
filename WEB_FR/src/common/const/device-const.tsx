export const DEVICE_STATUS_TEXT = {
    idle: 'Now Idle',
    printing: 'Now Printing',
    slicing: 'Slicing',
    heating: 'Heating',
    cooling: 'Cooling',
    paused: 'Paused',
    downloading: 'Downloading',
    disconnected: 'Disconnected',
    stopped: 'Now Stopped',
    finished: 'Job Finished',
    unknown: 'Unknown'
};
export function getDeviceStatusMsg(deviceStatus: any) {
    if (deviceStatus in DEVICE_STATUS_TEXT) {
        return DEVICE_STATUS_TEXT[deviceStatus];
    }
}
export const DEVICE_STATUS = {
    IDLE: 'IDLE',
    PRINTING: 'PRINTING',
    SLICING: 'SLICING',
    HEATING: 'HEATING',
    COOLING: 'COOLING',
    PAUSED: 'PAUSED',
    DOWNLOADING: 'DOWNLOADING',
    DISCONNECTED: 'DISCONNECTED',
    UNKNOWN: 'UNKNOWN',
    SENDING: 'SENDING'
};

export const GOOGLE_DOC_VIEWER_URL = 'https://docs.google.com/viewer?url=';
export const GOOGLE_DOC_VIEWER_MODE = '&embedded=true';