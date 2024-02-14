import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FamilyCreate from './FamilyCreate';
import FamilyList from './FamilyList';
import FamilyDetail from './FamilyDetail';
import FamilyUpdate from './FamilyUpdate';

function Family() {
  return (
      <main className="container">
        <Routes>
          <Route path="/create" element={<FamilyCreate />} />
          <Route path="/" element={<FamilyList />} />
          <Route path="/:id" element={<FamilyDetail />} />
          <Route path="/:id/update" element={<FamilyUpdate />} />
        </Routes>
      </main>
  );
}

export default Family;
