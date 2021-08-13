import { DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction } from 'react';

export interface LanguageSwitcherProps extends Pick<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any>{
	languages: string[];
	onClick: (lang: string)=>void;
}

export interface LanguageListProps extends Pick<DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>, any>{
	languages: string[];
	handlerClick: (lang: string)=>void;
	setIsOpen: Dispatch<SetStateAction<boolean>>
}
