import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndividList from './IndividList';
import EmbryoDetail from './Embryo/EmbryoDetail';
import EmbryoCreate from './Embryo/EmbryoCreate';
import EmbryoUpdate from './Embryo/EmbryoUpdate';
import MotherDetail from './Mother/MotherDetail';
import MotherCreate from './Mother/MotherCreate';
import MotherUpdate from './Mother/MotherUpdate';

import FatherDetail from './Father/FatherDetail';
import FatherCreate from './Father/FatherCreate';

function Individ() {
  return (
      <main className="container">
        <Routes>
          <Route path="/" element={<IndividList />} />

          <Route path="/embryo/:id" element={<EmbryoDetail />} />
          <Route path="/embryo/create" element={<EmbryoCreate />} />
          <Route path="/embryo/:id/update" element={<EmbryoUpdate />} />

          <Route path="/mother/:id" element={<MotherDetail />} />
          <Route path="/mother/create" element={<MotherCreate />} />
          <Route path="/mother/:id/update" element={<MotherUpdate />} />

          <Route path="/father/:id" element={<FatherDetail />} />
          <Route path="/father/create" element={<FatherCreate />} />
          {/* <Route path="/mother/:id/update" element={<MotherUpdate />} /> */}

        </Routes>
      </main>
  );
}

export default Individ;
