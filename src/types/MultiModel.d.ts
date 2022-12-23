export interface MultiModel {
    validationFormNormDoc: AddressType[];
    validationScheme2:     ValidationScheme2[];
    validationObjectType:  AddressType[];
    conformityDocType:     ConformityDocType[];
    status:                AddressType[];
    oksm:                  Oksm[];
    declarantType:         AddressType[];
    applicantType:         AddressType[];
    legalForm:             ConformityDocType[];
    contactType:           AddressType[];
    addressType:           AddressType[];
    fiasAddrobj:           FiasAddrobj[];
    fiasHouse:             FiasHouse[];
    tnved:                 AddressType[];
    dicNormDoc:            DicNormDoc[];
    normDocStatus:         AddressType[];
    testingStatus:         AddressType[];
    techregProductListEEU: TechregProductListeeu[];
}

export interface AddressType {
    name:     string;
    id:       number;
    masterId: string;
    code?:    string;
    docNum?:  string;
}

export interface ConformityDocType {
    id:   number;
    name: string;
}

export interface DicNormDoc {
    docDesignation: string;
    id:             number;
    masterId:       string;
}

export interface FiasAddrobj {
    shortname: string;
    id:        string;
    aolevel:   number;
    masterId:  string;
    offname:   string;
}

export interface FiasHouse {
    id:         string;
    strStatus:  number;
    possession: number;
    name:       string;
}

export interface Oksm {
    name:      string;
    shortName: string;
    id:        string;
    masterId:  number;
    eeuMember: boolean;
}

export interface TechregProductListeeu {
    name:      string;
    id:        number;
    techRegId: number;
}

export interface ValidationScheme2 {
    isApplicantProvider:     boolean;
    isPresenceOfProxy:       boolean;
    name:                    string;
    isApplicantEeuMember:    boolean;
    masterId:                string;
    isApplicantForeign:      boolean;
    isOneOffProductTesting:  boolean;
    isAccreditationLab:      boolean;
    isBatchProductTesting:   boolean;
    isProductSampleTesting:  boolean;
    isBatchProduction:       boolean;
    isSeriesProduction:      boolean;
    id:                      number;
    isApplicantManufacturer: boolean;
    isOneOffProduction:      boolean;
}
