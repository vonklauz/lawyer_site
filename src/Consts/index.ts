import { Link } from "@/Models";


export const BASE_URL = 'http://82.202.130.103:8005/';

export const MENU_LINKS: Link[] = [
    {
        label: 'Главная',
        path: '/',
        isProtected: true
    },
    {
        label: 'Суды',
        path: '/dossiers-list',
        isProtected: false
    },
    {
        label: 'Штрафы',
        path: '/documents',
        isProtected: true
    },
    {
        label: 'Услуги',
        path: '/calendar',
        isProtected: true
    },
    // {
    //     label: 'Новости',
    //     path: '/news',
    //     isProtected: false
    // },
    // {
    //     label: 'Задать вопрос',
    //     path: '/ask',
    //     isProtected: true
    // },
]

export const REDIRECT_TIMING = 3000;

export const ALLOWED_FILE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/tif',
    'image/tiff',
    'application/msword',
    'application/pdf',
    'application/psx',
    'application/vnd.openxmformats-officedocument.wordprocessingml.document',
    'application/zip',
    'application/x-zip',
    'application/octet-stream',
    'application/x-zip-compressed',
    'application/x-7z-compressed',
    'application/x-rar-compressed',
];

/**
 * Допустимые расширения файлов в упрощённом виде, которые показываем клиенту.
 */
export const ALLOWED_FILE_TYPES_TEXT = 'pdf, tiff, jpeg, png, docx, zip, rar, 7z.'