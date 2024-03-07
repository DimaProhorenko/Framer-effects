import { Route, Routes } from 'react-router-dom';
import RootLayout from '@/_root/RootLayout';
import { ClipPathLinks, MoveTextOnSVG } from '@/_root/pages';
import { CLIP_PATH_LINKS } from './constants/routes';

const App = () => {
	return (
		<Routes>
			<Route element={<RootLayout />}>
				<Route index element={<MoveTextOnSVG />} />
				<Route path={CLIP_PATH_LINKS} element={<ClipPathLinks />} />
			</Route>
		</Routes>
	);
};
export default App;
