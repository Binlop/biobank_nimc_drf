import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FamilyCreate from './EmbryoCreate';
import EmbryoDetail from './EmbryoDetail';
import FamilyUpdate from './EmbryoUpdate';

function Embryo() {
  return (
      <main className="container">
        <Routes>
          <Route path="/create" element={<FamilyCreate />} />
          <Route path="/:id" element={<EmbryoDetail />} />
          <Route path="/:id/update" element={<FamilyUpdate />} />
        </Routes>
      </main>
  );
}

export default Embryo;