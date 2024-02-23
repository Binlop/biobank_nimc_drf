import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndividList from './IndividList';
import EmbryoDetail from './Embryo/EmbryoDetail';
import EmbryoCreate from './Embryo/EmbryoCreate';
import EmbryoUpdate from './Embryo/EmbryoUpdate';

function Individ() {
  return (
      <main className="container">
        <Routes>
          <Route path="/" element={<IndividList />} />

          <Route path="/embryo/:id" element={<EmbryoDetail />} />
          <Route path="/embryo/create" element={<EmbryoCreate />} />
          <Route path="/embryo/:id/update" element={<EmbryoUpdate />} />

        </Routes>
      </main>
  );
}

export default Individ;
