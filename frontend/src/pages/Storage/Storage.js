import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FreezerList from './FreezerList';
import FreezerDetail from './Freezer/FreezerDetail';
import FreezerCreate from './Freezer/FreezerCreate';
import FreezerUpdate from './Freezer/FreezerUpdate';

import DrawerDetail from './Drawer/DrawerDetail';
import DrawerCreate from './Drawer/DrawerCreate';
import DrawerUpdate from './Drawer/DrawerUpdate';

import ShelfDetail from './Shelf/ShelfDetail';
import ShelfCreate from './Shelf/ShelfCreate';
import ShelfUpdate from './Shelf/ShelfUpdate';

import BoxDetail from './Box/BoxDetail';
import BoxCreate from './Box/BoxCreate';

import SampleMapCreate from './SampleMap/SampleMapCreate';

export default function Storage() {
    return (
      <main className="container">
        <Routes>
          <Route path="/" element={<FreezerList />} />
          
          <Route path="/freezer/:id/" element={<FreezerDetail />} />
          <Route path="/freezer/create/" element={<FreezerCreate />} />
          <Route path="/freezer/:id/update/" element={<FreezerUpdate />} />

          <Route path="/drawer/:id/" element={<DrawerDetail />} />
          <Route path="/drawer/create/" element={<DrawerCreate />} />
          <Route path="/drawer/:id/update/" element={<DrawerUpdate />} />

          <Route path="/shelf/:id/" element={<ShelfDetail />} />
          <Route path="/shelf/create/" element={<ShelfCreate />} />
          <Route path="/shelf/:id/update/" element={<ShelfUpdate />} />

          <Route path="/box/:id/" element={<BoxDetail />} />
          <Route path="/box/create/" element={<BoxCreate />} />
          <Route path="/box/:id/update/" element={<ShelfUpdate />} />

          <Route path="/sample_map/create/" element={<SampleMapCreate />} />

        </Routes>
      </main>
  );
}