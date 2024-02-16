import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndividList from './IndividList';
import EmbryoDetail from './Embryo/EmbryoDetail';
import FamilyUpdate from './FamilyUpdate';
import NestedMenu from './IndividList'
import EmbryoCreate from './Embryo/EmbryoCreate';

function Family() {
  return (
      <main className="container">
        <Routes>
          <Route path="/" element={<NestedMenu />} />

          <Route path="/embryo/:id" element={<EmbryoDetail />} />
          <Route path="/embryo/create" element={<EmbryoCreate />} />
          <Route path="/embryo/:id/update" element={<FamilyUpdate />} />

        </Routes>
      </main>
  );
}

export default Family;
