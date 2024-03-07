import { Route, Routes } from 'react-router-dom';
import RootLayout from '@/_root/RootLayout';
import { MoveTextOnSVG } from '@/_root/pages';

const App = () => {
	return (
		<Routes>
			<Route element={<RootLayout />}>
				<Route index element={<MoveTextOnSVG />} />
			</Route>
		</Routes>
	);
};
export default App;
