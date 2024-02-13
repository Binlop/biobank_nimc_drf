import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LabCreate from './LabCreate';
import LabList from './LabList';
import LabDetail from './LabDetail';
import LabUpdate from './LabUpdate';

function Laboratory() {
  return (
      <main className="container">
        <Routes>
          <Route path="/create" element={<LabCreate />} />
          <Route path="/" element={<LabList />} />
          <Route path="/:id" element={<LabDetail />} />
          <Route path="/:id/update" element={<LabUpdate />} />
        </Routes>
      </main>
  );
}

export default Laboratory;
