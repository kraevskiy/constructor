import { MetaHeadProps } from './MetaHead.props';
import Head from 'next/head';

export const MetaHead = ({title, description}: MetaHeadProps): JSX.Element => {
	return (
		<Head>
			<title>Arter - {title}</title>
			<meta name="description" content={description}/>

			<meta name="application-name" content="Arter"/>
			<meta name="apple-mobile-web-app-capable" content="yes"/>
			<meta name="apple-mobile-web-app-status-bar-style" content="default"/>
			<meta name="apple-mobile-web-app-title" content="Arter"/>
			<meta name="description" content="Arter best constructor"/>
			<meta name="format-detection" content="telephone=no"/>
			<meta name="mobile-web-app-capable" content="yes"/>
			<meta name="msapplication-config" content="/browserconfig.xml"/>
			<meta name="msapplication-TileColor" content="#da532c"/>
			<meta name="msapplication-tap-highlight" content="no"/>
			<meta name="msapplication-TileImage" content="/static/icons/ms-icon-144x144.png"/>
			<meta name="theme-color" content="#ffffff"/>

			<link rel="apple-touch-icon" sizes="57x57" href="/static/icons/apple-icon-57x57.png"/>
			<link rel="apple-touch-icon" sizes="60x60" href="/static/icons/apple-icon-60x60.png"/>
			<link rel="apple-touch-icon" sizes="72x72" href="/static/icons/apple-icon-72x72.png"/>
			<link rel="apple-touch-icon" sizes="76x76" href="/static/icons/apple-icon-76x76.png"/>
			<link rel="apple-touch-icon" sizes="114x114" href="/static/icons/apple-icon-114x114.png"/>
			<link rel="apple-touch-icon" sizes="120x120" href="/static/icons/apple-icon-120x120.png"/>
			<link rel="apple-touch-icon" sizes="144x144" href="/static/icons/apple-icon-144x144.png"/>
			<link rel="apple-touch-icon" sizes="152x152" href="/static/icons/apple-icon-152x152.png"/>
			<link rel="apple-touch-icon" sizes="180x180" href="/static/icons/apple-icon-180x180.png"/>

			<link rel="icon" type="image/png" sizes="192x192" href="/static/icons/android-icon-192x192.png"/>
			<link rel="icon" type="image/png" sizes="32x32" href="/static/icons/favicon-32x32.png"/>
			<link rel="icon" type="image/png" sizes="96x96" href="/static/icons/favicon-96x96.png"/>
			<link rel="icon" type="image/png" sizes="16x16" href="/static/icons/favicon-16x16.png"/>
			<link rel="shortcut icon" href="/static/icons/favicon.ico"/>
			<link rel="manifest" href="/manifest.json"/>

			<meta name="twitter:card" content="summary"/>
			<meta name="twitter:url" content={process.env.NEXT_PUBLIC_DOMAIN}/>
			<meta name="twitter:title" content={title}/>
			<meta name="twitter:description" content={description}/>
			<meta name="twitter:image" content="/static/icons/android-icon-192x192.png"/>
			<meta name="twitter:creator" content="@IlyaKraevskiy"/>
			<meta property="og:type" content="website"/>
			<meta property="og:title" content={title}/>
			<meta property="og:description" content={description}/>
			<meta property="og:site_name" content={title}/>
			<meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN}/>
			<meta property="og:image" content="/static/icons/apple-icon-180x180.png"/>
		</Head>
	);
};
