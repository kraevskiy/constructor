export function getCurrentLocale(locale: string | undefined): string {
	if(locale === 'ru'){
		return 'ru-RU';
	}
	return 'en-US';
}
