export interface SoftwareModel {
    id?: number;
    version?: string;
    softwareImageUrl?: string;
    softwareImgFileName?: string;
    softwareImgContentType?: string;
    softwareImgFileSize?: number;
    softwareUrl?: string;
    softwareImgModifiedAt?: string;
    firmwareFileName?: string;
    firmwareUrl?: string;
    firmwareContentType?: string;
    firmwareFileSize?: number;
    firmwareModifiedAt?: string;
    description?: string;
    isDeleted?: boolean;
    softwareModifiedAt?: string;
}

export interface FileUploadedModel {
    softwareImgDisplayName?: string;
    softwareDisplayName?: string;
    firmwareDisplayName?: string;
}