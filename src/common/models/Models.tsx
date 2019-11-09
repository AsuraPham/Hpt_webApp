export interface Printer {
    id?: number;
    machineWidth?: number;
    machineDepth?: number;
    machineHeight?: number;
    secretCode?: string;
    machineShape?: number;
    materialDiameter?: number;
    machineNozzleSize?: number;
    brand?: string;
    model?: string;
    type?: string;
    manufacturer?: string;
    materials?: string;
    startGcode?: string;
    endGcode?: string;
    gcodeFlavor?: string;
    approvalStatus?: number;
}