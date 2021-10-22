import { DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction } from 'react';

export interface LanguageSwitcherProps extends Pick<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>{
}

export interface LanguageListProps extends Pick<DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>, never>{
	languages: string[] | undefined;
	handlerClick: (lang: string)=>void;
	setIsOpen: Dispatch<SetStateAction<boolean>>
}
