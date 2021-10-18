import { LanguagesTypes } from '../../types/languages';
import { ICreatePageFormInterface } from './CreatePageForm.interface';

export const getLanguageField = (k: string, l: LanguagesTypes): keyof ICreatePageFormInterface => `${k}.${l}` as keyof ICreatePageFormInterface;
