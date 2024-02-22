import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListContainerObjects from '../../components/Container/ListContainerObjects';
import SampleList from './SampleList';
// import EmbryoDetail from './Embryo/EmbryoDetail';
// import EmbryoCreate from './Embryo/EmbryoCreate';
// import EmbryoUpdate from './Embryo/EmbryoUpdate';
// import CreateMyModel from './Embryo/CreateMOdel';

export default function Sample() {
    return (
      <main className="container">
        <Routes>
          <Route path="/" element={<SampleList />} />

          {/* <Route path="/embryo/:id" element={<EmbryoDetail />} />
          <Route path="/embryo/create" element={<EmbryoCreate />} />
          <Route path="/embryo/:id/update" element={<EmbryoUpdate />} /> */}

        </Routes>
      </main>
  );
}