export type Link = {
    label: string,
    path: string,
    isProtected?: boolean
}

export type ObjectWithProps<T = any> = Record<string, T>;

export type FormAction = (formData: FormData) => void;

export type ServerError = {
    code: number,
    message: ObjectWithProps,
}

/**
 * Базовый тип для ответов от сервера.
 */
export interface IBaseSuccessResponse<T> {
    success: boolean;
    error?: ServerError;
    data: T;
}

export interface ISimpleResponse {
    success: boolean
}

export interface Login {
    email: string;
    password: string;
}

export interface RegisterData extends Login {
    firstName: string;
    lastName: string;
    secondName?: string;
    phone: string;
}

export interface LoginResponse {
    access_token: string;
}

export interface RawUser {
    first_name: string,
    last_name: string,
    second_name?: string,
    user_id: string,
    phone: string,
    email: string
}

export interface User {
    firstName: string;
    lastName: string;
    secondName?: string;
    userId: string;
    phone: string;
    email: string;
}

/**
 * Интерфейс базового события календаря.
 */
export interface IScheduleEvent {
    id: string;
    title: string;
}

/**
 * Интерфейс состояния формы событий календаря.
 */
export interface IScheduleEventState extends IScheduleEvent {
    sendDate?: string;
    userEventId?: string;
    disabled?: boolean;
}

/**
 * Интерфейс получаемых базовых событий с бэка.
 */
export interface IEvents {
    events: IScheduleEvent[];
}

/**
 * Интерфейс существующего события конкретного пользователя.
 */
export interface IUserScheduleEvent {
    id: string,
    sendDate: string,
    send_date?: string,
    event: IScheduleEvent
    disabled?: boolean;
}

/**
 * Интерфейс получаемых сущесвтующих пользовательских событий с бэка.
 */
export interface IUserEvents {
    eventTasks: IUserScheduleEvent[];
}

export interface IDocument {
    document_id: string,
    title: string
}

export interface IDocumentsSection {
    title: string,
    s3_url_file?: string | null,
    documents: IDocument[]
}

export interface IUserDocument {
    s3_url: string,
    document_id: string,
    id: string
}

export interface IStateUserDocument extends IDocument {
    userDocs?: IUserDocument[],
    attachedDocs?: File[],
    error?: string;
}

export interface IDocumentsFormState extends Omit<IDocumentsSection, 'documents'> {
    documents: IStateUserDocument[]
}

export interface IDocumentsSchema {
    [key: string]: IDocumentsSection
}

export interface IFormSchema {
    schema_id: string;
    form_title: string;
    form_description: string;
}

export interface IRadioChoice {
    id: string;
    label: string;
}

export interface IDossierFormField {
    id: string;
    title: string;
    type: string;
    length?: number;
    mask?: string;
    required: boolean;
    choices: IRadioChoice[];
    groups: any[];
    value?: string;
}

export interface IDossierFormBlock {
    block_title: string;
    fields: IDossierFormField[];
}

export interface IDossierFormSection extends IFormSchema {
    number_form: number;
    blocks: IDossierFormBlock[];
}

export interface IDosserForm {
    schema_id: string;
    form_id?: string;
    user_id?: string;
    values: {
        field_id: string;
        value: string;
    }[];
}