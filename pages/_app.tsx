import 'styles/global.scss'
import App, {AppProps, AppContext} from 'next/app'
import {ApolloProvider} from '@apollo/client';
import fp from 'lodash/fp';
import {AnimatePresence} from 'framer-motion';
import {useRouter} from 'next/router';

import {GeneralCtx} from 'Components/GeneralCtx';
import {useApollo} from 'Lib/apollo';
import {useCookies} from 'Lib/hooks/useCookies';
import {baseEnv} from 'Lib/utils/consts';
import {ModalManager} from 'Components/ModalManager';


interface IAppProps extends AppProps {
    cookie: string
    host: string
}


// You may use layout animations.
// Example https://github.com/reller-sh/ioas/blob/5830f191b53323f0b3ac9fecfd63d89ea780466f/pages/_app.js#L8

function RootApp({Component, pageProps, cookie, host}: IAppProps) {
	const cookies = useCookies(cookie, host)
	const {route} = useRouter()
	const client = useApollo(pageProps, cookies.get(baseEnv.another.token));

	return (
		<ApolloProvider client={client}>
			<GeneralCtx
				externalData={{
					ui: {
						accessToken: cookies.get(baseEnv.another.token) || null
					}
				}}
			>
				<ModalManager>
					<AnimatePresence exitBeforeEnter>
						<Component {...pageProps} key={route} />
					</AnimatePresence>
				</ModalManager>
			</GeneralCtx>
		</ApolloProvider>

	)
}

RootApp.getInitialProps = async (appContext: AppContext) => {
	const appProps = await App.getInitialProps(appContext);
	return {
		...appProps,
		cookie: fp.get('ctx.req.headers.cookie', appContext),
		host: fp.get('ctx.req.headers.host', appContext).split(':')[0]
	}
}


export default RootApp
