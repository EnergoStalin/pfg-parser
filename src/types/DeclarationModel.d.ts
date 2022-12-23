export interface Declaration {
    idDeclaration:            number;
    idTechnicalReglaments:    number[];
    idDeclScheme:             number;
    idObjectDeclType:         number;
    idGroups:                 number[];
    idDeclType:               number;
    idProductSingleLists:     any[];
    awaitForApprove:          boolean;
    editApp:                  boolean;
    unpublishedChanges:       boolean;
    idStatus:                 number;
    assignRegNumber:          boolean;
    number:                   string;
    submissionDate:           Date;
    declRegDate:              Date;
    declEndDate:              Date;
    noSanction:               boolean;
    lastUpdate:               Date;
    idSigner:                 number;
    idSignerEmployee:         null;
    firstName:                string;
    surname:                  string;
    patronymic:               string;
    annexes:                  any[];
    applicant:                Applicant;
    applicantFilials:         any[];
    manufIsApplicant:         boolean;
    manufacturer:             Applicant;
    manufacturerFilials:      ManufacturerFilial[];
    certificationAuthority:   CertificationAuthority;
    accreditationBody:        null;
    product:                  Product;
    experts:                  Expert[];
    statusChanges:            StatusChange[];
    testingLabs:              TestingLab[];
    documents:                Documents;
    isSrd:                    boolean;
    idStatusTestingLabs:      number;
    idReplacementReason:      any[];
    idDeclarationReplaced:    null;
    idDeclarationRegInstead:  null;
    declarationReplacedNum:   null;
    declarationRegInsteadNum: null;
    changes:                  null;
}

export interface Applicant {
    idLegalSubject:        number;
    idEgrul:               null;
    idApplicantType?:      number;
    idLegalSubjectType:    number;
    fullName:              string;
    shortName:             string;
    idPerson:              number;
    surname:               string;
    firstName:             string;
    patronymic:            string;
    headPosition:          string;
    applicantHead:         boolean;
    idResponsiblePerson:   number | null;
    responsibleSurname:    null | string;
    responsibleFirstName:  null | string;
    responsiblePatronymic: null | string;
    responsiblePosition:   null | string;
    responsibleDocName:    null;
    responsibleDocNumber:  null;
    responsibleDocDate:    null;
    responsibleContacts:   any[] | null;
    ogrn:                  string;
    ogrnAssignDate:        Date;
    inn:                   string;
    kpp:                   string;
    idLegalForm:           number;
    idKopf:                null;
    nameLegalForm:         string;
    regDate:               Date;
    regOrganName:          string;
    addlRegInfo:           string;
    isEecRegister:         boolean;
    contacts:              Contact[];
    addresses:             Address[];
    transnational:         any[];
}

export interface Address {
    idAddress:       number;
    idAddrType:      number;
    idCodeOksm:      string;
    oksmShort:       boolean | null;
    idSubject:       null | string;
    idDistrict:      null;
    idCity:          null | string;
    idLocality:      null;
    idStreet:        null | string;
    idHouse:         null | string;
    flat:            null;
    postCode:        null | string;
    fullAddress:     string;
    gln:             null;
    foreignDistrict: null;
    foreignCity:     null;
    foreignLocality: null;
    foreignStreet:   null;
    foreignHouse:    null;
    uniqueAddress:   null | string;
    otherGln:        null;
    glonass:         null;
}

export interface Contact {
    idContact:     number;
    idContactType: number;
    value:         string;
}

export interface CertificationAuthority {
    idCertificationAuthority: number;
    fullName:                 string;
    accredOrgName:            string;
    attestatRegNumber:        string;
    attestatRegDate:          Date;
    attestatEndDate:          null;
    idRal:                    number;
    ogrn:                     string;
    idPerson:                 number;
    firstName:                string;
    surname:                  string;
    patronymic:               string;
    contacts:                 Contact[];
    addresses:                Address[];
}

export interface Documents {
    productTypeApplicationDecision:         null;
    productTypeContract:                    null;
    productTypeResearchConclusion:          ProductTypeResearchConclusion;
    productTypeCertificates:                ProductTypeResearchConclusion[];
    qmsCertificates:                        any[];
    productionControlResults:               any[];
    reportsOnTypeApprovalUnderUNRegulation: any[];
    protocolTestingTechnicalService:        null;
    complianceStandards:                    any[];
    commonDocuments:                        CommonDocuments;
    foreignManufacturerContract:            null;
    componentCertificates:                  any[];
    vehicleChassisTypeApproval:             ProductTypeResearchConclusion;
    applicantOtherDocuments:                any[];
}

export interface CommonDocuments {
}

export interface ProductTypeResearchConclusion {
    idPtCertificate?:       number;
    idTechnicalRegulation?: number;
    annex:                  boolean;
    number:                 null;
    issueDate:              null;
    idAccredPlace:          string;
    isAccredEec:            boolean;
    accreditedPersonName?:  null;
    attestatRegNumber:      null;
    attestatRegDate:        null;
    attestatEndDate:        null;
    idFile:                 null;
    sampleProduct?:         null;
    endDate?:               null;
    certOrganName?:         null;
}

export interface Expert {
    idExpert:   number;
    idEmployee: number;
    idPerson:   number;
    firstName:  string;
    surname:    string;
    patronimyc: string;
}

export interface ManufacturerFilial {
    idFilial:      number;
    fullName:      null;
    shortName:     null;
    idLegalForm:   null;
    idKopf:        null;
    nameLegalForm: null;
    egrulSelected: boolean;
    kpp:           null;
    annex:         boolean;
    contacts:      any[];
    addresses:     Address[];
}

export interface Product {
    idProduct:        number;
    idProductOrigin:  string;
    fullName:         string;
    marking:          null;
    usageScope:       string;
    storageCondition: string;
    usageCondition:   null;
    batchSize:        null;
    batchId:          null;
    identification:   null;
    identifications:  Identification[];
}

export interface Identification {
    idIdentification: number;
    annex:            boolean;
    name:             string;
    type:             null;
    tradeMark:        null;
    model:            null;
    article:          null;
    sort:             null;
    idOkpds:          any[];
    idTnveds:         number[];
    gtin:             string[];
    lifeTime:         null;
    storageTime:      string;
    description:      null;
    amount:           null;
    idOkei:           null;
    factoryNumber:    null;
    productionDate:   null;
    expiryDate:       null;
    documents:        Document[];
    standards:        Standard[];
}

export interface Document {
    idProductionDocument: number;
    name:                 string;
    number:               string;
    date:                 null;
}

export interface Standard {
    idStandard:            number;
    idTechnicalRegulation: null;
    annex:                 boolean;
    idDictStandard:        number;
    designation:           string;
    name:                  string;
    section:               null;
    addlInfo:              null;
    idStatus:              number;
}

export interface StatusChange {
    idChangeStatus:    number;
    idStatus:          number;
    beginDate:         Date;
    endDate:           Date | null;
    comment:           null;
    idBasis:           null;
    publicated:        boolean;
    publishDate:       Date;
    lkType:            null;
    docName:           null;
    docNumber:         null;
    docDate:           null;
    prescription:      null;
    idFileScan:        null;
    idBasisSolutions:  any[];
    levelStateControl: null;
    typeStateControl:  null;
    idOngoingEvent:    null;
}

export interface TestingLab {
    idTestingLab:               number;
    annex:                      boolean;
    idRal:                      number;
    regNumber:                  string;
    fullName:                   string;
    beginDate:                  Date;
    endDate:                    null;
    basis:                      null;
    idAccredPlace:              string;
    isAccredEec:                boolean;
    address:                    null;
    protocols:                  Protocol[];
    importedForResearchTesting: null;
    docConfirmCustom:           any[];
    ogrn:                       null;
    inn:                        null;
    accredEec:                  boolean;
}

export interface Protocol {
    idProtocol:        number;
    idProtocolRpi:     null;
    number:            string;
    date:              Date;
    idFile:            string;
    standards:         any[];
    isProtocolInvalid: boolean;
}
