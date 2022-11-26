import NProgress from 'nprogress';
import splitbee from '@splitbee/web';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { useEffectOnce } from 'react-use';
import { useRouter } from 'next/router';

import 'inter-ui/inter.css';
import 'nprogress/nprogress.css';
import 'windi.css';

import { colors } from '~/lib';
import { Theme } from '~/types';

import type { NextWebVitalsMetric } from 'next/app';

NProgress.configure({
	easing: 'ease',
	minimum: 0.3,
	showSpinner: false,
	speed: 800,
});

export function reportWebVitals(metric: NextWebVitalsMetric) {
	const url = process.env.NEXT_PUBLIC_AXIOM_INGEST_ENDPOINT;
	if (!url) return;

	const body = JSON.stringify({
		route: window.__NEXT_DATA__.page,
		...metric,
	});

	if (navigator.sendBeacon) {
		navigator.sendBeacon(url, body);
	} else {
		fetch(url, {
			body,
			keepalive: true,
			method: 'POST',
		});
	}
}

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	useEffectOnce(() => {
		router.events.on('routeChangeStart', () => NProgress.start());
		router.events.on('routeChangeComplete', () => NProgress.done());
		router.events.on('routeChangeError', () => NProgress.done());

		if (process.env.NODE_ENV === 'production')
			splitbee.init({
				disableCookie: true,
			});
	});

	return (
		<ThemeProvider attribute="class" defaultTheme={Theme.SYSTEM} themes={Object.values(Theme)}>
			<Component {...pageProps} />
			<style>{`
				#nprogress .bar {
					height: 0.25rem;
					background-color: ${colors.primary[500]};
				}
			`}</style>
		</ThemeProvider>
	);
}
