import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SampleList from './SampleList';

import DNACreate from './DNA/DNACreate';
import DNADetail from './DNA/DNADetail';
import DNAUpdate from './DNA/DNAUpdate';

import BloodCreate from './Blood/BloodCreate';

import ChorionCreate from './Chorion/ChorionCreate';

import EndometriumCreate from './Endometrium/EndometriumCreate';

import FetalSacNitrogenCreate from './FetalSacNitrogen/FetalSacNitrogenCreate';

import FetalSacFreezerCreate from './FetalSacFreezer/FetalSacFreezerCreate';


export default function Sample() {
    return (
      <main className="container">
        <Routes>
          <Route path="/" element={<SampleList />} />

          <Route path="/dna/create/" element={<DNACreate />} />
          <Route path="/dna/:id/" element={<DNADetail />} />
          <Route path="/dna/:id/update/" element={<DNAUpdate />} />

          <Route path="/chorion/:id/" element={<DNADetail />} />
          <Route path="/chorion/create/" element={<ChorionCreate />} />

          <Route path="/blood/:id/" element={<DNADetail />} />
          <Route path="/blood/create/" element={<BloodCreate />} />

          <Route path="/endometrium/:id/" element={<DNADetail />} />
          <Route path="/endometrium/create/" element={<EndometriumCreate />} />


          <Route path="/fetal_sac_nitrogen/:id/" element={<DNADetail />} />
          <Route path="/fetal_sac_nitrogen/create/" element={<FetalSacNitrogenCreate />} />


          <Route path="/fetal_sac_freezer/:id/" element={<DNADetail />} />
          <Route path="/fetal_sac_freezer/create/" element={<FetalSacFreezerCreate />} />

        </Routes>
      </main>
  );
}