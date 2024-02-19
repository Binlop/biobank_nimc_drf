import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmbryoCreate from './EmbryoCreate';
import EmbryoDetail from './EmbryoDetail';
import EmbryoUpdate from './EmbryoUpdate';

function Embryo() {
  return (
      <main className="container">
        <Routes>
          <Route path="/create" element={<EmbryoCreate />} />
          <Route path="/:id" element={<EmbryoDetail />} />
          <Route path="/:id/update" element={<EmbryoUpdate />} />
        </Routes>
      </main>
  );
}

export default Embryo;