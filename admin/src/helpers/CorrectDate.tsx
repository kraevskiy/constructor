import { format } from 'date-fns';

export const CorrectDate = (s: Date): JSX.Element => {
	const f = format(new Date(s), 'yyyy/MM/dd  hh:mm').split(' ');
	return <>
		{f[2]} <br/> {f[0]}
	</>;
};
