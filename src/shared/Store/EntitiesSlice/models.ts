// Общие поля, которые встречаются у всех типов
interface BaseEntity {
    id: string;
    entity_id: string;
    created_at: string;
    updated_at: string;
}

// Физическое лицо
export interface Individual extends BaseEntity {
    first_name: string;
    last_name: string;
    middle_name: string;
    birth_date: string;
    issued_by: string;
    issued_date: string;
    place_of_birth: string;
    registration_address: string;
    passport_number: string;
    passport_serial: string;
    code_department: string;
}

// Индивидуальный предприниматель
export interface SoleProprietor extends BaseEntity {
    last_name: string;
    first_name: string;
    middle_name: string;
    inn: string;
    registration_num: string;
    registration_date: string;
    legal_address: string;
    account_number: string;
    bank_name: string;
    bik: string;
    corr_account: string;
}

// Юридическое лицо (компания)
export interface Company extends BaseEntity {
    name: string;
    registration_num: string;
    inn: string;
    kpp: string;
    legal_address: string;
    ceo_name: string;
    account_number: string;
    bank_name: string;
    bik: string;
    corr_account: string;
}

// Основная структура "data"
export interface Entities {
    individual: Individual[];
    sole_proprietor: SoleProprietor[];
    company: Company[];
}

export type EntityItem = Individual & SoleProprietor & Company;

export interface EntitiesState {
    entities: Entities;
    chosenEntity: EntityItem | null;
    setEntities: (newEntities: Entities) => void;
    clearEntities: () => void;
    addEntity: (entity: EntityItem, key: keyof Entities) => void;
    chooseEntity: (item: EntityItem) => void;
    hasHydrated: boolean
    setHasHydrated: (state: boolean) => void
}