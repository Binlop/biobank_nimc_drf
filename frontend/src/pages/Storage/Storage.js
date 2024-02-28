import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FreezerList from './FreezerList';
import FreezerDetail from './Freezer/FreezerDetail';
import FreezerCreate from './Freezer/FreezerCreate';
import FreezerUpdate from './Freezer/FreezerUpdate';

export default function Storage() {
    return (
      <main className="container">
        <Routes>
          <Route path="/" element={<FreezerList />} />
          
          <Route path="/freezer/:id/" element={<FreezerDetail />} />
          <Route path="/freezer/create/" element={<FreezerCreate />} />
          <Route path="/freezer/:id/update/" element={<FreezerUpdate />} />


        </Routes>
      </main>
  );
}