import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import type { ComponentProps } from 'react';

export function useSeoProps(
	props: Partial<ComponentProps<typeof NextSeo>> = {},
): Partial<ComponentProps<typeof NextSeo>> {
	const router = useRouter();

	const title = 'aayush ─ developer';
	const description = "Hey 👋 I'm aayush, DevOps Learner & Linux enthusiast";

	return {
		title,
		description,
		canonical: `https://aayushrathor.me/${router.asPath}`,
		openGraph: {
			title,
			description,
			site_name: 'aayushrathor',
			url: `https://aayushrathor.me/${router.asPath}`,
			type: 'website',
		},
		twitter: {
			cardType: 'summary_large_image',
			handle: '@raayush871',
			site: '@raayush871',
		},
		...props,
	};
}
